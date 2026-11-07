# GRANTLY – Unified Scholarship Discovery & Management Platform
> **Tagline:** *Your Future Deserves Funding.*  
> Built for **THE OUTPOST Hackathon** & FAIE Evaluation.

---

## 🌟 Overview
**GRANTLY** is a unified, algorithmic scholarship discovery and application management platform built specifically for Indian students across Tier 1, Tier 2, and rural institutions. It eliminates confusing 40-page government gazettes, unverified agents, and missed portal deadlines by pairing **18+ verified Indian scholarship programs** with a deterministic, rule-based AI eligibility matching engine.

---

## 🚀 Key Features

### 1. Landing Page
- **Hero Section:** High-converting SaaS interface with Deep Indigo (`#4338CA`), Violet (`#6366F1`), and Emerald (`#10B981`) brand identity.
- **Trust Badges:** NSP verified, 100% Free Forever, Rule-Based Match Guarantee.
- **Statistics Bar:** ₹500Cr+ scholarship pool, 1,20,000+ active beneficiaries, 98.4% match accuracy.
- **How It Works:** 3-step interactive onboarding flow.
- **Featured Opportunities:** Live preview of top Indian scholarships with instant match circles.
- **Testimonials & FAQ:** Real scholar stories from IITs, AIIMS, and state colleges with interactive accordion questions.

### 2. Fast-Track Authentication
- **1-Click Demo Login:** Jump directly into the live experience as *Aarav Sharma* (B.Tech CSE scholar).
- **Custom Register & Login:** With real-time form validation.
- **Persistent Sessions:** Stored in browser `localStorage`.

### 3. Student Dashboard
- **Welcome Dossier:** Customized for student's stream, category, and state domicile.
- **KPI Metrics:** High Match Count (≥80%), Saved Bookmarks, Active Pipeline, and Profile Completeness.
- **Top Recommendations:** Priority schemes filtered for the student.
- **Application Analytics:** Native SVG pipeline visualization tracking across all 6 stages.
- **Deadlines Guardian:** Color-coded urgent alerts for schemes closing soon.

### 4. Scholarship Discovery (18 Verified Records)
- **18+ Authentic Indian Schemes:** Reliance Foundation UG, PM YASASVI (OBC/EBC), HDFC Badhte Kadam, Tata Trusts Medical, Adobe Women-in-Technology, ONGC SC/ST, Central Sector Scheme (NSP), LIC Golden Jubilee, Siemens Engineering, Kotak Kanya, PMSSS J&K/Ladakh, Santoor Women, SBI Asha, AICTE Pragati, AICTE Saksham (PwD), and more.
- **Multi-Faceted Filters:** By Category, Target Caste/Reservation (General, OBC, SC, ST, EWS), Degree Stream, Gender Quota, and Family Income Limit.
- **Smart Sorting:** By AI Match %, Closing Deadline, Award Amount, or Alphabetical.
- **Dual View Mode:** Toggle between Responsive Grid and Detailed List views.
- **Live Bookmarking & Compare:** Instant feedback with animated toast notifications.

### 5. Detailed Scholarship Modal
- Full overview, institutional credentials, and verified grant values.
- **AI Match Audit:** Shows exact reasons why the student qualifies or potential blockers.
- **Mandatory Documents Checklist:** Aadhaar, Tehsildar income certificates, bonafide letters.
- **Direct Apply Action:** Adds directly to the student's Application Tracker and opens official portal.

### 6. Rule-Based AI Eligibility Engine
- Evaluates 6 core dimensions:
  1. Academic Cutoff vs Student's Marks
  2. Annual Household Income vs Eligibility Ceiling
  3. Social Category / Reservation Fit
  4. Gender Restrictions
  5. Degree / Course Level Alignment
  6. State Domicile Check
- **Interactive Criteria Simulator:** Adjust marks or income sliders in real-time to simulate what unlocks higher match percentages, with a 1-click option to save to permanent profile.

### 7. Kanban Application Tracker
- **6 Pipeline Stages:**
  - `Interested`
  - `Preparing Documents`
  - `Applied`
  - `Under Review`
  - `Approved`
  - `Rejected`
- Direct stage progression, customizable notes, and financial pipeline totals.

### 8. Side-by-Side Comparison Matrix
- Compare up to **3 scholarships** simultaneously across award values, income thresholds, cutoff marks, documents, and deadlines.

### 9. Grantly AI Assistant
- Integrated chatbot advisor drawer available platform-wide.
- Suggested quick prompt chips:
  - *"Scholarships for B.Tech under ₹3L income?"*
  - *"Exclusive scholarships for female engineering students?"*
  - *"What documents are needed for National Scholarship Portal (NSP)?"*
  - *"How to write a winning Statement of Purpose (SOP)?"*
  - *"Compare Reliance Foundation vs HDFC Badhte Kadam"*
- Rule-based NLP matching against the local scholarship catalog with clickable scheme cards.

### 10. Profile & Settings
- Comprehensive academic and socio-economic management:
  - Personal Information & Avatar
  - Academic percentiles (10th, 12th, Degree)
  - Income certificate details & Reservation Category
  - Differently-Abled status toggle
  - Document Vault with auto-verified status indicators.

---

## 🛠 Tech Stack
- **Framework:** React.js 18 + Vite 5
- **Styling:** Custom CSS3 with Design System Tokens & CSS Variables (No Tailwind, No Framer Motion)
- **Icons:** Lucide React
- **Persistence:** LocalStorage for state across refreshes
- **Theming:** Full Light & Dark Mode support

---

## 🏃‍♂️ How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
