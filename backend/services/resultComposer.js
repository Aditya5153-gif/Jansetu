const { callGroq } = require('./groqClient');

/**
 * JanSetu Result Composer — synthesizes Scheme Finder & RTI outputs into a warm,
 * 8th-grade level, respectful response in the user's language (Hindi or English).
 */
async function composeResult({ profile, schemeResult, rtiResult, language = 'hi', mode = 'BOTH' }) {
  const isHindi = language === 'en' ? false : (language === 'hi' ? true : profile.detected_language === 'hi');

  // 1. Try Groq Llama 3.3 70B for rich conversational synthesis
  const groqComposition = await composeWithGroq({ profile, schemeResult, rtiResult, isHindi, mode });
  if (groqComposition) {
    return groqComposition;
  }

  // 2. Structured fallback composer
  return composeLocally({ profile, schemeResult, rtiResult, isHindi, mode });
}

async function composeWithGroq({ profile, schemeResult, rtiResult, isHindi, mode }) {
  const targetLang = isHindi ? 'Hindi' : 'English';
  const systemPrompt = `You are JanSetu, a warm and respectful AI agent assisting Indian citizens and rural farmers with low literacy.
Mode: ${mode} (SCHEME only, RTI only, or BOTH).
Rules:
- Respond entirely in ${targetLang}.
- Use an 8th-grade reading level, simple words, respectful tone (use 'Ji', 'Aap').
- Follow this structure:
  1. Acknowledge their situation warmly in exactly 1 sentence.
  2. If mode includes SCHEME: mention they qualify for schemes worth direct assistance.
  3. If mode includes RTI: explain in 1 simple sentence that their formal RTI application is submitted to the department.
  4. Conclude with exactly 2 simple sentences on what to do today / what happens next.
- Also output a "spoken_script" field: a short, clear, 2-3 sentence paragraph in ${targetLang} optimized for reading aloud via Text-to-Speech (TTS), without bullet points or asterisks.

Return JSON with:
{
  "acknowledgement": "1 sentence warm greeting acknowledging situation",
  "next_steps_summary": "2 simple sentences on what happens next",
  "spoken_script": "Clean speech-friendly text to be read aloud via voice"
}`;

  const userContext = JSON.stringify({
    mode,
    citizen_name: profile.name,
    occupation: profile.occupation,
    state: profile.state,
    district: profile.district,
    problem: profile.problem_description,
    qualifying_schemes_count: schemeResult?.totalCount || 0,
    total_benefit_rupees: schemeResult?.estimatedTotalBenefitRupees || 0,
    rti_department: rtiResult?.department,
    rti_ref_no: rtiResult?.referenceNumber,
    rti_deadline: rtiResult?.deadlineDate
  });

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userContext }
  ];

  try {
    const raw = await callGroq({ messages, jsonMode: true, temperature: 0.3 });
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      acknowledgement: parsed.acknowledgement,
      nextStepsSummary: parsed.next_steps_summary,
      spokenScript: parsed.spoken_script,
      schemes: schemeResult?.schemes || [],
      totalBenefitRupees: schemeResult?.estimatedTotalBenefitRupees || 0,
      schemeCount: schemeResult?.totalCount || 0,
      rti: rtiResult
    };
  } catch (err) {
    console.error('Groq composition error:', err.message);
    return null;
  }
}

function composeLocally({ profile, schemeResult, rtiResult, isHindi, mode }) {
  const name = profile.name || (isHindi ? 'किसान साथी' : 'Citizen');
  const count = schemeResult?.totalCount || 0;
  const benefit = (schemeResult?.estimatedTotalBenefitRupees || 0).toLocaleString('en-IN');

  // Case 1: RTI Only
  if (mode === 'RTI' || (!schemeResult?.schemes?.length && rtiResult)) {
    if (isHindi) {
      const ack = `राम-राम ${name} जी, आपकी समस्या को हमने गंभीरता से लिया है और आपकी आवाज़ सरकार तक पहुँचाई है।`;
      const nextSteps = `आपके आवेदन की संदर्भ संख्या ${rtiResult.referenceNumber} है। सूचना का अधिकार अधिनियम की धारा 7(1) के तहत संबंधित विभाग को 30 दिनों (${rtiResult.deadlineDate}) में जवाब देना कानूनी रूप से बाध्यकारी है।`;
      const spoken = `${name} जी, आपकी शिकायत के लिए ${rtiResult.department_hi || rtiResult.department} में औपचारिक आरटीआई दर्ज कर दी गई है। संदर्भ संख्या ${rtiResult.referenceNumber} है और विभाग को 30 दिनों में जवाब देना अनिवार्य है।`;
      return {
        acknowledgement: ack,
        nextStepsSummary: nextSteps,
        spokenScript: spoken,
        schemes: [],
        totalBenefitRupees: 0,
        schemeCount: 0,
        rti: rtiResult
      };
    } else {
      const ack = `Namaste ${name}, we have formally registered your grievance with the competent public authority.`;
      const nextSteps = `Your RTI tracking reference number is ${rtiResult.referenceNumber}. Under Section 7(1) of the RTI Act, the department is legally required to respond within 30 days (${rtiResult.deadlineDate}).`;
      const spoken = `Namaste ${name}. A formal RTI application has been submitted to ${rtiResult.department}. Your reference number is ${rtiResult.referenceNumber}, and the statutory response deadline is 30 days.`;
      return {
        acknowledgement: ack,
        nextStepsSummary: nextSteps,
        spokenScript: spoken,
        schemes: [],
        totalBenefitRupees: 0,
        schemeCount: 0,
        rti: rtiResult
      };
    }
  }

  // Case 2: Schemes Only
  if (mode === 'SCHEME' || (schemeResult?.schemes?.length && !rtiResult)) {
    if (isHindi) {
      const ack = `राम-राम ${name} जी, हमने आपके विवरण के आधार पर सभी सरकारी कल्याणकारी योजनाओं की जांच कर ली है।`;
      const nextSteps = `आज ही अपने नजदीकी जन सेवा केंद्र (CSC) या बैंक शाखा जाकर इन योजनाओं के लिए आवेदन करें। अपने साथ आधार कार्ड, खतौनी और बैंक पासबुक जरूर रखें।`;
      const spoken = `${name} जी, आप कुल ${count} सरकारी योजनाओं के पात्र हैं, जिनसे आपको लगभग ${benefit} रुपये का सीधा लाभ मिलेगा। सभी योजनाओं की जानकारी स्क्रीन पर दी गई है।`;
      return {
        acknowledgement: ack,
        nextStepsSummary: nextSteps,
        spokenScript: spoken,
        schemes: schemeResult.schemes,
        totalBenefitRupees: schemeResult.estimatedTotalBenefitRupees,
        schemeCount: schemeResult.totalCount,
        rti: null
      };
    } else {
      const ack = `Namaste ${name}, we have matched your profile against active central and state welfare programs.`;
      const nextSteps = `Visit your nearest Common Service Centre (CSC) or bank branch today to activate these benefits. Please carry your Aadhaar card, land records, and bank passbook.`;
      const spoken = `Namaste ${name}. You qualify for ${count} welfare schemes worth an estimated ₹${benefit} in annual assistance. Application details are listed below.`;
      return {
        acknowledgement: ack,
        nextStepsSummary: nextSteps,
        spokenScript: spoken,
        schemes: schemeResult.schemes,
        totalBenefitRupees: schemeResult.estimatedTotalBenefitRupees,
        schemeCount: schemeResult.totalCount,
        rti: null
      };
    }
  }

  // Case 3: Both (Schemes + RTI)
  if (isHindi) {
    const ack = `राम-राम ${name} जी, आपकी परेशानी और मेहनत को हम पूरा सम्मान देते हैं और आपके साथ खड़े हैं।`;
    const nextSteps = `आज ही जन सेवा केंद्र जाकर इन योजनाओं का लाभ लें। साथ ही, आपकी शिकायत पर विभाग को 30 दिनों (${rtiResult?.deadlineDate || '1 महीने'}) में जवाब देना अनिवार्य है।`;
    const spoken = `${name} जी, आप कुल ${count} सरकारी योजनाओं के पात्र हैं, जिनसे ₹${benefit} की सहायता मिलेगी। आपकी समस्या के लिए संबंधित विभाग में आरटीआई भी दर्ज कर दी गई है।`;
    return {
      acknowledgement: ack,
      nextStepsSummary: nextSteps,
      spokenScript: spoken,
      schemes: schemeResult.schemes,
      totalBenefitRupees: schemeResult.estimatedTotalBenefitRupees,
      schemeCount: schemeResult.totalCount,
      rti: rtiResult
    };
  } else {
    const ack = `Namaste ${name}, we deeply understand your situation and are committed to ensuring you receive your rightful government assistance and justice.`;
    const nextSteps = `You can visit your nearest Common Service Centre (CSC) today with your Aadhaar and bank passbook to activate these benefits. The department is legally mandated to answer your RTI within 30 days (${rtiResult?.deadlineDate || '1 month'}).`;
    const spoken = `Namaste ${name}. You qualify for ${count} government welfare schemes offering up to ₹${benefit} in direct benefits. We have also filed a formal RTI with the department regarding your grievance.`;
    return {
      acknowledgement: ack,
      nextStepsSummary: nextSteps,
      spokenScript: spoken,
      schemes: schemeResult.schemes,
      totalBenefitRupees: schemeResult.estimatedTotalBenefitRupees,
      schemeCount: schemeResult.totalCount,
      rti: rtiResult
    };
  }
}

module.exports = {
  composeResult
};
