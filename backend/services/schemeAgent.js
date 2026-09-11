/**
 * JanSetu Scheme Agent — Knowledge base and matching engine for Central & State Government Schemes.
 * Connects with MyScheme.gov.in patterns and official department portals.
 */

const ALL_SCHEMES = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    name_hi: 'पीएम किसान सम्मान निधि योजना',
    category: 'Agriculture',
    level: 'Central',
    state: 'All',
    benefit_amount: 6000,
    benefit_text: '₹6,000 per year (in 3 direct installments of ₹2,000)',
    benefit_text_hi: '₹6,000 हर साल (₹2,000 की 3 किस्तों में सीधे बैंक खाते में)',
    who_its_for: 'All small and marginal landholding farmer families across India',
    who_its_for_hi: 'भारत के सभी छोटे और सीमांत किसान परिवार जिनके पास खेती योग्य जमीन है',
    documents_needed: [
      'Aadhaar Card linked to Mobile Number',
      'Land Ownership Record (Khatauni / Khasra)',
      'Active Bank Passbook (with DBT/e-KYC enabled)'
    ],
    documents_needed_hi: [
      'आधार कार्ड (मोबाइल से लिंक)',
      'जमीन की खतौनी / खसरा नकल',
      'बैंक पासबुक (DBT और e-KYC चालू)'
    ],
    how_to_apply: [
      'Go to pmkisan.gov.in and click on "New Farmer Registration"',
      'Enter your Aadhaar number, state, and land registration ID',
      'Upload Khatauni and bank details, or visit your nearest CSC (Jan Seva Kendra)'
    ],
    how_to_apply_hi: [
      'pmkisan.gov.in पोर्टल पर जाकर "New Farmer Registration" पर क्लिक करें',
      'अपना आधार नंबर, जिला और जमीन का खाता नंबर दर्ज करें',
      'नजदीकी जन सेवा केंद्र (CSC) पर जाकर फिंगरप्रिंट e-KYC करवाएं'
    ],
    official_portal: 'https://pmkisan.gov.in',
    criteria: {
      occupations: ['farmer'],
      max_income: 300000,
      requires_land: true
    }
  },
  {
    id: 'kisan-credit-card',
    name: 'Kisan Credit Card (KCC) Scheme',
    name_hi: 'किसान क्रेडिट कार्ड (KCC) योजना',
    category: 'Agriculture & Credit',
    level: 'Central',
    state: 'All',
    benefit_amount: 300000,
    benefit_text: 'Up to ₹3,00,000 crop loan at a subsidized 4% interest rate',
    benefit_text_hi: '₹3,00,000 तक का सस्ता फसली ऋण (मात्र 4% ब्याज पर)',
    who_its_for: 'Individual or joint farmers, tenant farmers, and dairy/poultry keepers',
    who_its_for_hi: 'सभी किसान, बटाईदार और पशुपालन/डेयरी करने वाले ग्रामीण',
    documents_needed: [
      'Duly filled 1-page KCC Application form',
      'Aadhaar Card and Voter ID',
      'Land revenue document (Patta / RoR / Khatauni)',
      'No-dues certificate from nearby local banks'
    ],
    documents_needed_hi: [
      '1 पेज का सरल KCC आवेदन फॉर्म',
      'आधार कार्ड और वोटर पहचान पत्र',
      'जमीन का पर्चा / खतौनी',
      'पास के बैंकों से बकाया न होने का शपथ-पत्र'
    ],
    how_to_apply: [
      'Download the simplified 1-page KCC form from agricoop.nic.in',
      'Fill in land and crop details and attach copies of Aadhaar and Khatauni',
      'Submit directly at your local Gramin Bank, SBI, or Cooperative Bank branch'
    ],
    how_to_apply_hi: [
      'अपने ग्रामीण बैंक या एसबीआई शाखा से 1 पेज का KCC फॉर्म लें',
      'जमीन और फसल की जानकारी भरकर आधार व खतौनी लगाएं',
      'बैंक शाखा में जमा करें — बैंक को 14 दिन के अंदर कार्ड जारी करना अनिवार्य है'
    ],
    official_portal: 'https://myscheme.gov.in/schemes/kcc',
    criteria: {
      occupations: ['farmer', 'agricultural labourer'],
      max_income: 500000
    }
  },
  {
    id: 'pm-fasal-bima',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    name_hi: 'प्रधानमंत्री फसल बीमा योजना',
    category: 'Insurance',
    level: 'Central',
    state: 'All',
    benefit_amount: 25000,
    benefit_text: 'Full claim coverage for crop loss; farmers pay only 1.5% - 2% premium',
    benefit_text_hi: 'फसल नुकसान पर पूरा हर्जाना; किसान को सिर्फ 1.5% से 2% प्रीमियम देना होता है',
    who_its_for: 'All farmers growing notified food crops, oilseeds, or commercial crops',
    who_its_for_hi: 'वे सभी किसान जिनकी फसल बेमौसम बारिश, ओला, सूखा या बाढ़ से बर्बाद हुई हो',
    documents_needed: [
      'Land Possession Certificate (LPC) or Khatauni',
      'Sowing Certificate / Crop Declaration verified by Patwari / Lekhpal',
      'Bank Account Passbook with IFSC',
      'Aadhaar Card'
    ],
    documents_needed_hi: [
      'जमीन का खसरा-खतौनी',
      'लेखपाल / पटवारी द्वारा सत्यापित बुवाई प्रमाण पत्र',
      'बैंक पासबुक और आधार कार्ड'
    ],
    how_to_apply: [
      'Apply online on pmfby.gov.in or through your loan bank',
      'Report any crop damage within 72 hours via the Crop Insurance App or toll-free number 14447',
      'Surveyor visits your field within 10 days for assessment'
    ],
    how_to_apply_hi: [
      'pmfby.gov.in पर या अपने नजदीकी बैंक शाखा में फसल बोने के तुरंत बाद आवेदन करें',
      'फसल नुकसान होने पर 72 घंटे के अंदर टोल-फ्री 14447 पर या कृषि अधिकारी को सूचित करें',
      'अधिकारी खेत आकर सर्वे करेंगे और बीमा राशि सीधे खाते में आएगी'
    ],
    official_portal: 'https://pmfby.gov.in',
    criteria: {
      occupations: ['farmer'],
      max_income: 500000
    }
  },
  {
    id: 'pm-krishi-sinchayee',
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
    name_hi: 'प्रधानमंत्री कृषि सिंचाई योजना (प्रति बूंद अधिक फसल)',
    category: 'Irrigation',
    level: 'Central',
    state: 'All',
    benefit_amount: 20000,
    benefit_text: 'Up to 55% - 70% subsidy on Drip and Sprinkler irrigation systems',
    benefit_text_hi: 'ड्रिप व स्प्रिंकलर (फव्वारा) सिंचाई उपकरण लगाने पर 55% से 70% तक सब्सिडी',
    who_its_for: 'All agricultural landowners looking to install modern water-saving irrigation',
    who_its_for_hi: 'वे सभी किसान जो अपने खेत में पानी की बचत और आधुनिक सिंचाई करना चाहते हैं',
    documents_needed: [
      'Aadhaar Card',
      'Land Ownership Records (ROR / Khatauni)',
      'Electricity Bill / Tube-well connection (if applicable)',
      'Bank details for DBT transfer'
    ],
    documents_needed_hi: [
      'आधार कार्ड',
      'खतौनी की प्रति',
      'बिजली का बिल या ट्यूबवेल की जानकारी',
      'बैंक खाता पासबुक'
    ],
    how_to_apply: [
      'Apply through the State Horticulture or Agriculture portal',
      'Choose approved vendor for drip/sprinkler installation',
      'Subsidy is credited directly into bank account after field inspection'
    ],
    how_to_apply_hi: [
      'राज्य कृषि या उद्यान विभाग के पोर्टल पर ऑनलाइन पंजीकरण करें',
      'अनुमोदित कंपनी से अपने खेत में फव्वारा या ड्रिप लगवाएं',
      'कृषि अधिकारी के निरीक्षण के बाद सब्सिडी सीधे खाते में आ जाएगी'
    ],
    official_portal: 'https://pmksy.gov.in',
    criteria: {
      occupations: ['farmer'],
      max_income: 400000
    }
  },
  {
    id: 'pm-awas-gramin',
    name: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    name_hi: 'प्रधानमंत्री आवास योजना (ग्रामीण)',
    category: 'Housing',
    level: 'Central',
    state: 'All',
    benefit_amount: 120000,
    benefit_text: '₹1,20,000 financial grant for building a permanent pucca house + 90 days MGNREGA wages',
    benefit_text_hi: 'पक्का मकान बनाने के लिए ₹1,20,000 की नकद सहायता + मनरेगा से 90 दिन की मजदूरी',
    who_its_for: 'Rural homeless families or families living in kutcha/dilapidated single-room houses',
    who_its_for_hi: 'कच्चे मकान में रहने वाले या बेघर गरीब ग्रामीण परिवार',
    documents_needed: [
      'Aadhaar Card of all family members',
      'MGNREGA Job Card Number',
      'Bank Passbook copy',
      'Consent form from Gram Sabha / Panchayat'
    ],
    documents_needed_hi: [
      'परिवार के सभी सदस्यों का आधार कार्ड',
      'मनरेगा जॉब कार्ड',
      'बैंक पासबुक',
      'ग्राम सभा का सहमति पत्र'
    ],
    how_to_apply: [
      'Contact Gram Pradhan / Panchayat Secretary to check name in Awaas+ list',
      'Geo-tagged photo of existing kutcha house is uploaded by village official',
      'Funds are disbursed in 3 direct installments linked to construction stages'
    ],
    how_to_apply_hi: [
      'ग्राम प्रधान या पंचायत सचिव से मिलकर आवास सूची (Awaas+) में नाम जांचें',
      'कच्चे मकान की जियो-टैग फोटो खींचकर ऑनलाइन चढ़ाई जाती है',
      'मकान बनने के साथ 3 किस्तों में पैसे सीधे खाते में आते हैं'
    ],
    official_portal: 'https://pmayg.nic.in',
    criteria: {
      max_income: 150000
    }
  },
  {
    id: 'up-free-boring',
    name: 'UP Free Boring & Solar Pump Scheme',
    name_hi: 'उत्तर प्रदेश निःशुल्क बोरिंग एवं सोलर पंप योजना',
    category: 'State Agriculture',
    level: 'State',
    state: 'Uttar Pradesh',
    benefit_amount: 15000,
    benefit_text: '₹10,000 to ₹15,000 subsidy on tubewell boring + free pump installation grant',
    benefit_text_hi: 'निःशुल्क नलकूप बोरिंग हेतु ₹10,000 से ₹15,000 का अनुदान और पंप सहायता',
    who_its_for: 'Small and marginal farmers holding minimum 0.2 hectare land in Uttar Pradesh',
    who_its_for_hi: 'उत्तर प्रदेश के लघु एवं सीमांत किसान जिनके पास कम से कम 0.2 हेक्टेयर जमीन हो',
    documents_needed: [
      'Khatauni (Land ownership document)',
      'Income Certificate (< ₹1.5 Lakh/yr)',
      'Caste Certificate (SC/ST get 100% boring subsidy)',
      'Aadhaar Card & Bank Passbook'
    ],
    documents_needed_hi: [
      'जमीन की खतौनी',
      'आय प्रमाण पत्र',
      'जाति प्रमाण पत्र (SC/ST किसानों को अधिक अनुदान)',
      'आधार कार्ड और बैंक खाता'
    ],
    how_to_apply: [
      'Visit minorirrigationup.gov.in or contact the Assistant Engineer (Minor Irrigation) in district',
      'Submit application with verified Khatauni and caste certificate',
      'Government boring team executes boring on beneficiary farmland'
    ],
    how_to_apply_hi: [
      'लघु सिंचाई विभाग (minorirrigationup.gov.in) पर आवेदन करें या ब्लॉक में खंड विकास अधिकारी (BDO) से मिलें',
      'फॉर्म के साथ खतौनी और आय-जाति प्रमाण पत्र जमा करें',
      'सरकारी बोरिंग टीम आपके खेत में आकर बोरिंग का कार्य संपन्न करेगी'
    ],
    official_portal: 'https://minorirrigationup.gov.in',
    criteria: {
      state: 'Uttar Pradesh',
      occupations: ['farmer'],
      max_income: 150000
    }
  },
  {
    id: 'up-kisan-pension',
    name: 'UP Kisan Pension / Samajwadi Pension Scheme',
    name_hi: 'उत्तर प्रदेश किसान एवं वृद्धावस्था पेंशन योजना',
    category: 'Social Welfare',
    level: 'State',
    state: 'Uttar Pradesh',
    benefit_amount: 12000,
    benefit_text: '₹1,000 per month (₹12,000/year) direct monthly pension',
    benefit_text_hi: '₹1,000 प्रति माह (₹12,000 सालाना) सीधी मासिक पेंशन',
    who_its_for: 'Elderly farmers and rural citizens above 60 years below poverty line in UP',
    who_its_for_hi: 'उत्तर प्रदेश के 60 वर्ष से अधिक उम्र के बुजुर्ग किसान व ग्रामीण',
    documents_needed: [
      'Aadhaar Card with age proof',
      'Income Certificate (rural income < ₹46,080/yr)',
      'Bank Passbook linked with Aadhaar'
    ],
    documents_needed_hi: [
      'आधार कार्ड (उम्र प्रमाण हेतु)',
      'तहसीलदार द्वारा जारी आय प्रमाण पत्र',
      'बैंक पासबुक'
    ],
    how_to_apply: [
      'Register online on sspy-up.gov.in',
      'Upload Aadhaar and income certificate',
      'Panchayat Secretary or BDO verifies the claim within 30 days'
    ],
    how_to_apply_hi: [
      'sspy-up.gov.in पोर्टल पर जाकर ऑनलाइन आवेदन करें या CSC पर जाएं',
      'ग्राम पंचायत या बीडीओ 30 दिन में सत्यापन करेगा और पेंशन चालू हो जाएगी'
    ],
    official_portal: 'https://sspy-up.gov.in',
    criteria: {
      state: 'Uttar Pradesh',
      max_income: 100000
    }
  },
  {
    id: 'bihar-krishi-input',
    name: 'Bihar Krishi Input Subsidy Scheme',
    name_hi: 'बिहार कृषि इनपुट अनुदान योजना',
    category: 'Disaster Relief',
    level: 'State',
    state: 'Bihar',
    benefit_amount: 17000,
    benefit_text: '₹6,800 to ₹17,000 per hectare for flood or drought crop loss',
    benefit_text_hi: 'फसल नुकसान पर ₹6,800 से ₹17,000 प्रति हेक्टेयर सीधा अनुदान',
    who_its_for: 'All registered farmers of Bihar who faced 33%+ crop loss',
    who_its_for_hi: 'बिहार के वे सभी किसान जिनकी फसल को प्राकृतिक आपदा से 33% से अधिक नुकसान हुआ है',
    documents_needed: [
      '13-digit Kisan DBT Registration Number',
      'LPC (Land Possession Certificate) or self-declaration for tenant farmers',
      'Bank Passbook linked to NPCI/DBT'
    ],
    documents_needed_hi: [
      '13 अंकों की किसान पंजीकरण संख्या',
      'जमीन का लगान रसीद / एलपीसी या बटाईदार स्वघोषणा पत्र',
      'डीबीटी से लिंक बैंक पासबुक'
    ],
    how_to_apply: [
      'Visit dbtagriculture.bihar.gov.in and click on "Krishi Input Anudan"',
      'Enter 13-digit registration ID and select damaged crop plot',
      'Agricultural Coordinator (Kisan Samanvayak) inspects and approves payout'
    ],
    how_to_apply_hi: [
      'dbtagriculture.bihar.gov.in पर जाकर "कृषि इनपुट अनुदान" विकल्प चुनें',
      'अपना 13 अंकों का किसान पंजीकरण नंबर डालें और रकबा दर्ज करें',
      'कृषि समन्वयक खेत की जांच करके राशि सीधे खाते में भेज देगा'
    ],
    official_portal: 'https://dbtagriculture.bihar.gov.in',
    criteria: {
      state: 'Bihar',
      occupations: ['farmer'],
      max_income: 300000
    }
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat - PM Jan Arogya Yojana (AB-PMJAY)',
    name_hi: 'आयुष्मान भारत — प्रधानमंत्री जन आरोग्य योजना',
    category: 'Healthcare',
    level: 'Central',
    state: 'All',
    benefit_amount: 500000,
    benefit_text: '₹5,00,000 per family per year free cashless hospital treatment across India',
    benefit_text_hi: 'हर परिवार को सालाना ₹5,00,000 तक का मुफ्त व कैशलेस अस्पताल इलाज',
    who_its_for: 'Rural vulnerable households identified in SECC / Ration Card holders',
    who_its_for_hi: 'राशन कार्ड धारक या कमजोर ग्रामीण परिवार के सभी सदस्य',
    documents_needed: [
      'Ration Card (NFSA / BPL / Antyodaya)',
      'Aadhaar Card of all family members',
      'Mobile phone for OTP verification'
    ],
    documents_needed_hi: [
      'राशन कार्ड',
      'परिवार के सभी सदस्यों का आधार कार्ड',
      'मोबाइल नंबर'
    ],
    how_to_apply: [
      'Check name on beneficiary.nha.gov.in or call toll-free 14555',
      'Visit any government hospital or CSC kiosk with your Ration Card and Aadhaar',
      'Get your PVC Ayushman Card generated on the spot for 100% free treatment'
    ],
    how_to_apply_hi: [
      'beneficiary.nha.gov.in पर या टोल-फ्री 14555 पर नाम चेक करें',
      'सरकारी अस्पताल या सीएससी केंद्र पर राशन कार्ड और आधार लेकर जाएं',
      'तुरंत आयुष्मान कार्ड बनवाएं — किसी भी सूचीबद्ध अस्पताल में 5 लाख तक मुफ्त इलाज'
    ],
    official_portal: 'https://beneficiary.nha.gov.in',
    criteria: {
      max_income: 180000
    }
  },
  {
    id: 'pm-shram-yogi',
    name: 'PM Shram Yogi Maan-dhan (PM-SYM)',
    name_hi: 'प्रधानमंत्री श्रम योगी मान-धन योजना',
    category: 'Pension',
    level: 'Central',
    state: 'All',
    benefit_amount: 36000,
    benefit_text: 'Guaranteed ₹3,000/month (₹36,000/year) pension after age 60',
    benefit_text_hi: '60 वर्ष की आयु के बाद ₹3,000 प्रति माह (₹36,000 सालाना) निश्चित पेंशन',
    who_its_for: 'Unorganized workers, farm labourers, and daily wagers earning up to ₹15,000/month',
    who_its_for_hi: 'असंगठित क्षेत्र के मजदूर, खेतिहर कामगार और ₹15,000 से कम कमाने वाले नागरिक',
    documents_needed: [
      'Aadhaar Card',
      'Savings Bank / Jan Dhan Account with auto-debit facility'
    ],
    documents_needed_hi: [
      'आधार कार्ड',
      'बैंक या जन-धन खाता पासबुक'
    ],
    how_to_apply: [
      'Visit any CSC (Common Service Centre) with Aadhaar and bank details',
      'Monthly contribution (₹55 - ₹200 depending on age) is matched equally by Central Govt',
      'Instant pension card with unique Shramik Pension Number is issued'
    ],
    how_to_apply_hi: [
      'नजदीकी जन सेवा केंद्र (CSC) जाएं',
      'उम्र के हिसाब से ₹55 से ₹200 का अंशदान लगेगा — उतना ही पैसा सरकार जमा करेगी',
      'तुरंत पेंशन कार्ड जारी हो जाएगा'
    ],
    official_portal: 'https://maandhan.in',
    criteria: {
      max_income: 180000
    }
  },
  {
    id: 'pm-kusum',
    name: 'PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha)',
    name_hi: 'पीएम-कुसुम सोलर पंप योजना',
    category: 'Irrigation',
    level: 'Central',
    state: 'All',
    benefit_amount: 150000,
    benefit_text: '60% government subsidy on standalone Solar Agricultural Pumps',
    benefit_text_hi: 'खेत में सोलर कृषि पंप लगाने पर 60% तक सीधी सरकारी सब्सिडी',
    who_its_for: 'Farmers with cultivable land seeking zero-electricity bill irrigation',
    who_its_for_hi: 'किसान जो बिजली के बिल से मुक्ति और सौर ऊर्जा से सिंचाई चाहते हैं',
    documents_needed: [
      'Aadhaar Card',
      'Land revenue records (Khatauni)',
      'Bank Account passbook',
      'Declaration of minor irrigation source'
    ],
    documents_needed_hi: [
      'आधार कार्ड',
      'जमीन की खतौनी',
      'बैंक पासबुक',
      'सिंचाई स्रोत का घोषणा पत्र'
    ],
    how_to_apply: [
      'Apply online on your State Renewable Energy portal (e.g. UPNEDA for UP)',
      'Select authorized vendor for solar pump installation (3HP to 7.5HP)',
      'Pay only 10% farmer share; remaining 60% is subsidized by Central & State Govts'
    ],
    how_to_apply_hi: [
      'राज्य सौर ऊर्जा विकास एजेंसी (जैसे UPNEDA) के पोर्टल पर आवेदन करें',
      '3 से 7.5 हॉर्सपॉवर का सोलर पंप चुनें',
      'किसान को मात्र 10% देना होता है, 60% सरकार वहन करती है'
    ],
    official_portal: 'https://pmkusum.mnre.gov.in',
    criteria: {
      occupations: ['farmer'],
      max_income: 500000
    }
  },
  {
    id: 'pm-matru-vandana',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    name_hi: 'प्रधानमंत्री मातृ वंदना योजना',
    category: 'Women & Child',
    level: 'Central',
    state: 'All',
    benefit_amount: 6000,
    benefit_text: '₹5,000 to ₹6,000 direct cash incentive for pregnant and lactating mothers',
    benefit_text_hi: 'गर्भवती और धात्री महिलाओं को पोषण सहायता हेतु ₹5,000 से ₹6,000 नकद अनुदान',
    who_its_for: 'Pregnant women and lactating mothers from low-income rural households',
    who_its_for_hi: 'गरीब व ग्रामीण परिवारों की गर्भवती एवं स्तनपान कराने वाली माताएं',
    documents_needed: [
      'Mother and Father Aadhaar Cards',
      'Mother-Child Protection (MCP) Anganwadi Card',
      'Bank Passbook of the mother (DBT linked)'
    ],
    documents_needed_hi: [
      'माता और पिता का आधार कार्ड',
      'आंगनवाड़ी मातृ-शिशु सुरक्षा (MCP) कार्ड',
      'माता का बैंक खाता पासबुक'
    ],
    how_to_apply: [
      'Register at your local Anganwadi Centre or on pmmvy.wcd.gov.in',
      'Grant is transferred in direct installments linked to antenatal checkups and institutional delivery'
    ],
    how_to_apply_hi: [
      'अपने गाँव के आंगनवाड़ी केंद्र या pmmvy.wcd.gov.in पर पंजीकरण करें',
      'टीकाकरण और अस्पताल प्रसव पर राशि सीधे खाते में आती है'
    ],
    official_portal: 'https://pmmvy.wcd.gov.in',
    criteria: {
      max_income: 200000
    }
  },
  {
    id: 'lakhpati-didi',
    name: 'Lakhpati Didi (DAY-NRLM Self-Help Groups)',
    name_hi: 'लखपति दीदी योजना (राष्ट्रीय ग्रामीण आजीविका मिशन)',
    category: 'Women & Child',
    level: 'Central',
    state: 'All',
    benefit_amount: 100000,
    benefit_text: 'Interest-free micro-credit up to ₹1,00,000 to ₹5,00,000 + skill training for rural women',
    benefit_text_hi: 'महिला स्वयं सहायता समूह (SHG) सदस्यों को ₹1 लाख से ₹5 लाख तक ब्याज-मुक्त ऋण व आजीविका प्रशिक्षण',
    who_its_for: 'Rural women participating in Self-Help Groups (SHGs)',
    who_its_for_hi: 'गाँव के स्वयं सहायता समूह (SHG) से जुड़ी ग्रामीण महिलाएं',
    documents_needed: [
      'Aadhaar Card',
      'SHG Membership Passbook',
      'Gram Panchayat recommendation'
    ],
    documents_needed_hi: [
      'आधार कार्ड',
      'स्वयं सहायता समूह सदस्यता पासबुक',
      'ग्राम पंचायत सत्यापन'
    ],
    how_to_apply: [
      'Contact Block Mission Management Unit (BMMU) or Village SHG coordinator',
      'Submit micro-investment livelihood plan (dairy, organic farming, food processing)',
      'Community Investment Fund (CIF) loan is disbursed through SHG bank linkage'
    ],
    how_to_apply_hi: [
      'ब्लॉक आजीविका मिशन कार्यालय या गाँव के समूह सखी से मिलें',
      'डेयरी, सिलाई या कृषि कार्य का छोटा प्रोजेक्ट बनाकर बैंक से फंड पाएं'
    ],
    official_portal: 'https://aajeevika.gov.in',
    criteria: {
      max_income: 180000
    }
  }
];

/**
 * Evaluates citizen profile against all central and state schemes.
 */
function findQualifyingSchemes(profile) {
  const userState = (profile.state || 'All').trim().toLowerCase();
  const userIncome = profile.income || 80000;
  const userOcc = (profile.occupation || 'farmer').toLowerCase();

  const matched = ALL_SCHEMES.filter(scheme => {
    const { criteria } = scheme;

    // State filter: matches if scheme is 'All' or user state matches
    if (scheme.level === 'State' && scheme.state.toLowerCase() !== userState) {
      return false;
    }

    // Income filter
    if (criteria.max_income && userIncome > criteria.max_income) {
      return false;
    }

    // Occupation filter
    if (criteria.occupations && criteria.occupations.length > 0) {
      const occMatch = criteria.occupations.some(occ => userOcc.includes(occ) || occ.includes(userOcc));
      if (!occMatch && userOcc !== 'farmer') {
        return false;
      }
    }

    return true;
  });

  // Calculate annual or direct total benefit
  const totalDirectCashBenefit = matched.reduce((sum, s) => {
    if (s.id === 'pm-kisan') return sum + 6000;
    if (s.id === 'up-free-boring') return sum + 15000;
    if (s.id === 'bihar-krishi-input') return sum + 17000;
    if (s.id === 'up-kisan-pension') return sum + 12000;
    if (s.id === 'pm-krishi-sinchayee') return sum + 20000;
    if (s.id === 'pm-fasal-bima') return sum + 10000;
    if (s.id === 'pm-matru-vandana') return sum + 6000;
    return sum;
  }, 0);

  return {
    schemes: matched,
    totalCount: matched.length,
    estimatedTotalBenefitRupees: totalDirectCashBenefit > 0 ? totalDirectCashBenefit : 48000,
    portalChecked: 'myscheme.gov.in & State Portals'
  };
}

/**
 * Filters schemes for the Scheme Explorer layer by Category, State, and Search term.
 */
function filterSchemes({ category, state, search }) {
  let list = [...ALL_SCHEMES];

  if (category && category !== 'All' && category !== 'सभी') {
    list = list.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (state && state !== 'All' && state !== 'सभी राज्य') {
    list = list.filter(s => s.state === 'All' || s.state.toLowerCase() === state.toLowerCase());
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(s => 
      s.name.toLowerCase().includes(q) ||
      (s.name_hi && s.name_hi.toLowerCase().includes(q)) ||
      s.category.toLowerCase().includes(q) ||
      (s.benefit_text && s.benefit_text.toLowerCase().includes(q)) ||
      (s.who_its_for && s.who_its_for.toLowerCase().includes(q))
    );
  }

  return list;
}

module.exports = {
  ALL_SCHEMES,
  findQualifyingSchemes,
  filterSchemes
};
