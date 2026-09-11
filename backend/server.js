const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { extractProfileAndIntent } = require('./services/profileExtractor');
const { findQualifyingSchemes, filterSchemes, ALL_SCHEMES } = require('./services/schemeAgent');
const { draftAndFileRTI, trackRTIStatus, generateFirstAppeal, matchAuthority } = require('./services/rtiAgent');
const { composeResult } = require('./services/resultComposer');
const { getGroqClient } = require('./services/groqClient');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  const hasGroq = !!getGroqClient();
  res.json({
    status: 'online',
    agent: 'JanSetu',
    groqConfigured: hasGroq,
    timestamp: new Date().toISOString(),
    supportedLanguages: ['hi', 'en', 'bn', 'mr', 'te', 'ta', 'gu']
  });
});

// Full Scheme Catalog with Category, State, and Search filtering
app.get('/api/schemes', (req, res) => {
  const { state, category, search } = req.query;
  const filtered = filterSchemes({ state, category, search });
  res.json({ count: filtered.length, schemes: filtered });
});

// RTI Live Tracking Endpoint (Supports both query param and wildcard path for slashes like UP/PWD/2026/123)
app.get(['/api/rti/track', '/api/rti/track/:refNo(*)'], (req, res) => {
  const refNo = req.query.refNo || req.query.ref || req.params.refNo || req.params[0];
  if (!refNo) {
    return res.status(400).json({ error: 'Please provide a valid RTI reference number' });
  }
  const trackingData = trackRTIStatus(refNo);
  if (!trackingData) {
    return res.status(404).json({ error: 'RTI Reference Number not found' });
  }
  res.json(trackingData);
});

// Statutory Section 19(1) First Appeal Generator
app.post('/api/rti/first-appeal', (req, res) => {
  try {
    const { refNo, citizenName, district, state, problemDescription } = req.body;
    const appeal = generateFirstAppeal({ refNo, citizenName, district, state, problemDescription });
    res.json(appeal);
  } catch (err) {
    console.error('First appeal error:', err);
    res.status(500).json({ error: 'Failed to generate first appeal' });
  }
});

// Verified National Helplines Directory
app.get('/api/helplines', (req, res) => {
  res.json([
    {
      id: 'kisan-call-centre',
      title_hi: 'किसान कॉल सेन्टर (कृषि विशेषज्ञ सहायता)',
      title_en: 'Kisan Call Centre (Farmer Expert Helpline)',
      number: '1800-180-1551',
      timing_hi: 'सुबह 6:00 बजे से रात 10:00 बजे तक (सभी 22 भाषाओं में)',
      timing_en: '6:00 AM to 10:00 PM (All 22 Regional Languages)',
      category: 'Agriculture',
      type: 'Toll-Free'
    },
    {
      id: 'pm-kisan-helpline',
      title_hi: 'पीएम-किसान हेल्पलाइन (किस्त व खाता समस्या)',
      title_en: 'PM-KISAN Central Helpline (Installments & DBT)',
      number: '155261',
      alt_number: '011-24300606',
      timing_hi: 'कार्यदिवस सुबह 9:00 बजे से शाम 6:00 बजे तक',
      timing_en: 'Working days 9:00 AM to 6:00 PM',
      category: 'DBT Cash Grant',
      type: 'Toll-Free'
    },
    {
      id: 'crop-insurance',
      title_hi: 'फसल बीमा सहायता केंद्र (PMFBY)',
      title_en: 'Crop Insurance Claim Helpline (PMFBY)',
      number: '14447',
      timing_hi: '24 घंटे उपलब्ध (नुकसान के 72 घंटे में कॉल करें)',
      timing_en: '24x7 Available (Call within 72 hrs of crop damage)',
      category: 'Insurance',
      type: 'Toll-Free'
    },
    {
      id: 'ayushman-bharat',
      title_hi: 'आयुष्मान भारत राष्ट्रीय हेल्पलाइन (PM-JAY)',
      title_en: 'Ayushman Bharat National Call Centre',
      number: '14555',
      timing_hi: '24 घंटे उपलब्ध (कैशलेस इलाज व कार्ड सत्यापन)',
      timing_en: '24x7 Available (Free Treatment & Golden Card)',
      category: 'Healthcare',
      type: 'Toll-Free'
    },
    {
      id: 'pmayg-helpline',
      title_hi: 'ग्रामीण आवास सहायता हेल्पलाइन (PMAY-G)',
      title_en: 'Rural Housing Scheme Helpline (PMAY-G)',
      number: '1800-11-6446',
      timing_hi: 'सुबह 9:00 से शाम 6:00 बजे तक',
      timing_en: '9:00 AM to 6:00 PM',
      category: 'Housing',
      type: 'Toll-Free'
    },
    {
      id: 'rti-online',
      title_hi: 'आरटीआई ऑनलाइन पोर्टल सहायता (DoPT)',
      title_en: 'RTI Online Portal Support (DoPT Govt of India)',
      number: '011-24640615',
      timing_hi: 'सोमवार से शुक्रवार (सुबह 9:30 से शाम 5:30)',
      timing_en: 'Monday to Friday (9:30 AM to 5:30 PM)',
      category: 'RTI & Law',
      type: 'Direct'
    }
  ]);
});

// Standalone RTI Drafter
app.post('/api/rti/draft', async (req, res) => {
  try {
    const { problem, name, state, district, occupation, income } = req.body;
    if (!problem) {
      return res.status(400).json({ error: 'Grievance/problem description is required.' });
    }
    const profile = {
      name: name || 'Citizen Applicant',
      state: state || 'Uttar Pradesh',
      district: district || 'Varanasi',
      occupation: occupation || 'Farmer',
      income: income || 80000,
      problem_description: problem
    };
    const rtiResult = await draftAndFileRTI(profile);
    res.json(rtiResult);
  } catch (error) {
    console.error('RTI generation error:', error);
    res.status(500).json({ error: 'Failed to generate RTI draft' });
  }
});

// Primary Chat Endpoint (JanSetu Agent Pipeline)
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();
  try {
    const { message, language = 'auto', mode = 'BOTH', customProfile } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Please provide a message describing your situation.' });
    }

    // Step 1: Extract Profile & Intent with optional customProfile
    const profile = await extractProfileAndIntent(message, language, customProfile);
    const targetLanguage = (language === 'en' || language === 'hi') ? language : (profile.detected_language || 'hi');

    // Apply explicit mode override
    if (mode === 'SCHEME') {
      profile.intent = 'SCHEME';
    } else if (mode === 'RTI') {
      profile.intent = 'RTI';
    } else if (mode === 'BOTH') {
      profile.intent = 'BOTH';
    }

    // Step 2: Scheme Agent (Matches against MyScheme.gov.in database)
    let schemeResult = { schemes: [], totalCount: 0, estimatedTotalBenefitRupees: 0 };
    if (profile.intent === 'SCHEME' || profile.intent === 'BOTH') {
      schemeResult = findQualifyingSchemes(profile);
    }

    // Step 3: RTI Agent (Identifies Public Authority, drafts Section 6(1) RTI, and submits)
    let rtiResult = null;
    if (profile.intent === 'RTI' || profile.intent === 'BOTH') {
      rtiResult = await draftAndFileRTI(profile);
    }

    // Step 4: Result Composer (Synthesizes 8th-grade level response in user language)
    const composed = await composeResult({
      profile,
      schemeResult,
      rtiResult,
      language: targetLanguage,
      mode
    });

    const executionDurationMs = Date.now() - startTime;

    // Execution Trace for Frontend Stepper
    const executionTrace = [
      { step: 1, label: 'Voice / Text Input Processed', detail: `Language: ${targetLanguage.toUpperCase()} | Mode: ${mode}` },
      { step: 2, label: 'Profile Extracted', detail: `${profile.occupation} | ${profile.state} | ₹${profile.income.toLocaleString('en-IN')}/yr` },
      { 
        step: 3, 
        label: 'Scheme Discovery', 
        detail: profile.intent !== 'RTI' 
          ? `Found ${schemeResult.totalCount} schemes on MyScheme (~₹${schemeResult.estimatedTotalBenefitRupees.toLocaleString('en-IN')})` 
          : 'Skipped (RTI-only mode selected)' 
      },
      { 
        step: 4, 
        label: 'RTI Automated Filing', 
        detail: rtiResult 
          ? `Submitted on rtionline.gov.in (${rtiResult.referenceNumber})` 
          : 'Skipped (Scheme-only mode selected)' 
      },
      { step: 5, label: 'Response Composed', detail: 'Spoken audio script synthesized' }
    ];

    res.json({
      success: true,
      profile,
      language: targetLanguage,
      mode,
      response: composed,
      trace: executionTrace,
      durationMs: executionDurationMs
    });

  } catch (error) {
    console.error('JanSetu Agent Error:', error);
    res.status(500).json({
      error: 'An error occurred while processing your request.',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🏛️ JanSetu Agent Backend running on port ${PORT}`);
  console.log(`📡 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`🔑 Groq LLM: ${getGroqClient() ? 'ENABLED (Llama 3.3 70B)' : 'FALLBACK HEURISTIC ENGINE (Active)'}`);
  console.log(`=================================================`);
});
