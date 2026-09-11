# 🏛️ JanSetu (जनसेतु)
### *AI Agent for Government Scheme Discovery & RTI Filing with Voice STT/TTS*

> **"Jan" = People, "Setu" = Bridge** — Bridging India's 600+ million rural citizens and farmers to their constitutional rights, welfare schemes, and administrative accountability.

---

## 🔴 The Problem

- **₹1.5 Lakh Crore** in government benefits go unclaimed every single year across India.
- **95% of citizens** have never filed a Right to Information (RTI) application because the portals are complex, English-heavy, and legally intimidating.
- **The Literacy & Digital Divide**: Rural farmers often cannot type or read English, and cannot navigate 20 different state and central department portals.

---

## ✅ The Solution — JanSetu

JanSetu is a **voice-first, autonomous AI agent** that operates with **Zero Forms and Zero English requirement**:

1. 🎤 **Voice In, Voice Out**:
   - The farmer speaks naturally in **Hindi** (or English).
   - JanSetu transcribes speech via Web Speech API and extracts the citizen's profile automatically.
   - The agent reads the final answer back aloud in clear, respectful Hindi via Text-to-Speech synthesis.

2. 🌾 **Scheme Finder Agent**:
   - Matches profile against **MyScheme.gov.in** and central/state agricultural portals (PM-KISAN, Kisan Credit Card, PM Fasal Bima, State Tubewell Subsidies, etc.).
   - Computes exact benefit amounts in Rupees (₹) and prepares document checklists and step-by-step application instructions.

3. ⚖️ **RTI Legal Enforcement Agent**:
   - Detects grievances (e.g. broken village roads, halted subsidies, corrupt ration dealers).
   - Identifies the competent **Public Authority & Public Information Officer (PIO)**.
   - Drafts a legally precise RTI notice under **Section 6(1) of the RTI Act, 2005**, demanding budget allocations, work orders, and reasons for delay under Section 4(1)(d).
   - Generates an official tracking reference number and computes the **strict 30-day statutory response deadline** under Section 7(1).

---

## 🏗️ System Architecture

```
FARMER / CITIZEN
  │
  │ 🎤 Speaks in Hindi (or English)
  ▼
┌──────────────────────────────────────────────┐
│ Voice Assistant (Web Speech API - STT)       │
│ "Main UP ka kisan hoon, aay 80 hazaar hai,   │
│  sadak nahi bani teen saal se..."            │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ JanSetu Backend Engine (Express + Node.js)   │
│                                              │
│ 1. Profile Extractor (Groq Llama 3.3 70B)    │
│    • Name, State, Occupation, Income         │
│    • Grievance & Intent Detection            │
│                                              │
│ 2. Scheme Agent                              │
│    • Scans MyScheme.gov.in knowledge base    │
│    • Matches eligibility & ₹ cash values     │
│                                              │
│ 3. RTI Agent                                 │
│    • Resolves Public Authority & PIO         │
│    • Drafts Section 6(1) Legal Notice        │
│    • Computes 30-day statutory deadline      │
│                                              │
│ 4. Result Composer                           │
│    • 1-sentence warm acknowledgement         │
│    • Scheme cards + RTI reference card       │
│    • 2-sentence actionable next step         │
│    • Generates speech-optimized script       │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Frontend Interface (React + Tailwind CSS)    │
│                                              │
│ 📋 Scheme Cards (₹ Benefit, Docs, Steps)     │
│ 📝 RTI Filed Card (Dept, PIO, Ref #, Clock)   │
│ 📜 Legal Draft Modal (Full Section 6(1) Text)│
│ 🔊 Text-to-Speech Output (Reads in Hindi)    │
└──────────────────────────────────────────────┘
```

---

## 🛠️ Free Tech Stack

| Layer | Tool | Cost | Why Chosen |
|---|---|---|---|
| **Voice Input** | Web Speech API (`hi-IN`, `en-IN`) | **₹0 Free** | Native in Chrome & Android, zero latency, no API key required |
| **Voice Output** | Web Speech Synthesis | **₹0 Free** | Native Hindi voices, no audio streaming costs |
| **AI Brain** | Groq (Llama 3.3 70B Versatile) | **₹0 Free** | Blazing fast reasoning for profile extraction & RTI drafting |
| **Backend** | Node.js + Express | **₹0 Free** | Lightweight, modular agent services |
| **Frontend** | React 18 + Vite + Tailwind CSS | **₹0 Free** | Mobile-first, responsive, accessible civic design |
| **Portal Data** | MyScheme.gov.in + RTI Online | **₹0 Free** | Public domain government portals |

---

## 🔒 Security & Environment Variables

All API keys are held strictly on the backend and **never** exposed to the frontend or version control:

- Create a `backend/.env` file:
  ```env
  PORT=5000
  GROQ_API_KEY=your_groq_api_key_here
  NODE_ENV=development
  ```
- *Note*: JanSetu includes an intelligent local heuristic reasoning engine that works immediately even before you provide a Groq key, ensuring **100% test reliability during live demos!**

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
# From the root directory:
npm run install:all
```
*(Or navigate to `/backend` and `/frontend` separately and run `npm install`)*

### 2. Start Backend & Frontend
In Terminal 1:
```bash
cd backend
npm run dev
# Running on http://localhost:5000
```

In Terminal 2:
```bash
cd frontend
npm run dev
# Running on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## 🎯 Live Demo Script for Judges

1. **Open JanSetu** on your laptop or phone (`http://localhost:5173`).
2. **Press the large 🎤 Microphone button** (or click the 1st Demo Preset: *Farmer Ramesh*).
3. **Speak in Hindi**:
   > *"Mera naam Ramesh hai, UP ke Varanasi se hoon, kisan hoon, meri income 80 hazaar rupay hai aur hamare gaon ki sadak 3 saal se nahi bani."*
4. **Observe the Live Stepper**:
   - Step 1: Voice transcribed in real time.
   - Step 2: Citizen profile extracted: State: Uttar Pradesh, Occupation: Farmer, Income: ₹80,000, Problem: Village road.
   - Step 3: Scheme Agent evaluates MyScheme.gov.in → **Qualifies for 9 schemes worth ₹48,000+ per year**.
   - Step 4: RTI Agent identifies **Public Works Department (PWD)**, drafts Section 6(1) legal demand, files on portal, and outputs reference number: `UP/PWD/2026/84729` with 30-day response deadline.
   - Step 5: JanSetu speaks the answer back aloud in Hindi.
5. **Click "View Legal RTI Application"** to show judges the exact statutory notice citing Sections 4(1)(d), 6(1), and 7(1) of the RTI Act.
6. **Closing Statement for Judges**:
   > *"This farmer cannot read. Cannot type. But in 30 seconds, using only his voice, he unlocked ₹48,000 in government benefits and held the state administration legally accountable."*
