export const DEFAULT_DEMO_STUDENT = {
  id: "student-aarav-01",
  name: "Aarav Sharma",
  email: "aarav.sharma@student.in",
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
  gender: "Male",
  category: "General", // Options: General, OBC, SC, ST, EWS
  educationLevel: "B.Tech",
  course: "B.Tech (Computer Science)",
  institution: "Veermata Jijabai Technological Institute (VJTI)",
  yearOfStudy: "1st Year",
  percentage: 82.5, // Current / Class 12 percentage
  class10Percentage: 88.4,
  class12Percentage: 82.5,
  familyIncome: 240000, // 2.4 Lakhs
  domicileState: "Maharashtra",
  isDifferentlyAbled: false,
  isSingleParent: false,
  bio: "Aspiring software engineer passionate about AI, distributed systems, and open-source software.",
  phone: "+91 98201 44521",
  documentsUploaded: [
    { name: "Class 10 Marksheet", status: "Verified", date: "2026-10-12" },
    { name: "Class 12 Marksheet", status: "Verified", date: "2026-10-12" },
    { name: "Tehsildar Income Certificate", status: "Verified", date: "2026-10-15" },
    { name: "Aadhaar Card", status: "Verified", date: "2026-10-10" },
    { name: "College Bonafide Certificate", status: "Pending", date: "2026-11-01" }
  ]
};

export const INITIAL_APPLICATIONS = [
  {
    id: "app-rel-01",
    scholarshipId: "reliance-ug-2025",
    title: "Reliance Foundation Undergraduate Scholarship",
    provider: "Reliance Foundation",
    amount: "₹2,00,000",
    status: "Under Review", // Interested, Preparing Documents, Applied, Under Review, Approved, Rejected
    appliedDate: "2026-10-28",
    deadline: "2026-12-15",
    notes: "Submitted aptitude test score (92 percentile). Interview call expected late November.",
    matchScore: 95,
    documentsReady: 5,
    documentsTotal: 6
  },
  {
    id: "app-hdfc-02",
    scholarshipId: "hdfc-badhte-kadam-2025",
    title: "HDFC Bank Badhte Kadam Scholarship",
    provider: "HDFC Bank Parivartan",
    amount: "₹1,00,000",
    status: "Applied",
    appliedDate: "2026-11-02",
    deadline: "2026-12-31",
    notes: "Application ref: HDFC-BK-992384. Direct bank verification in progress.",
    matchScore: 90,
    documentsReady: 5,
    documentsTotal: 5
  },
  {
    id: "app-csss-03",
    scholarshipId: "central-sector-nsp-2025",
    title: "Central Sector Scheme for College & University Students",
    provider: "Department of Higher Education (MoE)",
    amount: "₹20,000 / yr",
    status: "Preparing Documents",
    appliedDate: null,
    deadline: "2026-11-25",
    notes: "Need college principal signature on NSP Bonafide form before submitting.",
    matchScore: 85,
    documentsReady: 4,
    documentsTotal: 5
  },
  {
    id: "app-siemens-04",
    scholarshipId: "siemens-scholarship-2025",
    title: "Siemens Scholarship Program",
    provider: "Siemens India Ltd",
    amount: "100% Tuition + Laptop",
    status: "Interested",
    appliedDate: null,
    deadline: "2026-12-05",
    notes: "Eligible for 1st year govt engineering. Income certificate needs renewal.",
    matchScore: 88,
    documentsReady: 3,
    documentsTotal: 4
  }
];

export const INITIAL_SAVED_IDS = [
  "reliance-ug-2025",
  "hdfc-badhte-kadam-2025",
  "central-sector-nsp-2025",
  "siemens-scholarship-2025",
  "sbi-asha-scholarship-2025"
];
