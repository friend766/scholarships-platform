export const initialUniversities = [
  {
    id: 'uni-1',
    name: 'University of Oxford',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    country: 'United Kingdom',
    city: 'Oxford',
    website: 'https://www.ox.ac.uk',
    establishedYear: 1096,
    type: 'Public Research',
    description: 'The University of Oxford is a collegiate research university in Oxford, England. It is the oldest university in the English-speaking world and world’s second-oldest university in continuous operation.',
    history: 'Teaching existed in some form at Oxford in 1096 and developed rapidly from 1167 when Henry II banned English students from attending the University of Paris.',
    campusInfo: 'Historic urban campus spread across central Oxford with 39 independent constituent colleges.',
    intStudentInfo: 'Over 45% of students are international, representing over 160 countries.',
    rating: 4.9,
    tuitionRange: '£28,000 - £44,000 / yr',
    status: 'Approved',
    adminId: 'admin-oxford',
    adminName: 'Prof. Eleanor Vance',
    adminEmail: 'eleanor.vance@ox.ac.uk'
  },
  {
    id: 'uni-2',
    name: 'Massachusetts Institute of Technology (MIT)',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    country: 'United States',
    city: 'Cambridge, MA',
    website: 'https://www.mit.edu',
    establishedYear: 1861,
    type: 'Private Research',
    description: 'MIT is a world leader in science, engineering, computing, and technology education, dedicated to advancing knowledge and educating students in areas that best serve the nation and the world.',
    history: 'Adopted a European polytechnic university model and emphasized laboratory instruction in applied science and engineering.',
    campusInfo: '168-acre campus extending over a mile along the northern bank of the Charles River basin.',
    intStudentInfo: 'Need-blind admissions policy for all international undergraduate and graduate applicants.',
    rating: 4.9,
    tuitionRange: '$57,590 / yr',
    status: 'Approved',
    adminId: 'admin-mit',
    adminName: 'Dr. Robert Sterling',
    adminEmail: 'rsterling@mit.edu'
  },
  {
    id: 'uni-3',
    name: 'Technical University of Munich (TUM)',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    country: 'Germany',
    city: 'Munich',
    website: 'https://www.tum.de',
    establishedYear: 1868,
    type: 'Public Technical',
    description: 'TUM combines top-tier research with unique learning environments, fostering entrepreneurship and technological innovation in the heart of Europe.',
    history: 'Founded by King Ludwig II of Bavaria to provide the state of Bavaria with a structural center for technology.',
    campusInfo: 'Main campus in Munich city center, Garching research campus, and Straubing bioeconomy facility.',
    intStudentInfo: 'Tuition-free or low administrative fee options available with numerous English-taught Master programs.',
    rating: 4.7,
    tuitionRange: '€0 - €4,000 / yr',
    status: 'Approved',
    adminId: 'admin-tum',
    adminName: 'Hans Gruber',
    adminEmail: 'h.gruber@tum.de'
  },
  {
    id: 'uni-4',
    name: 'National University of Singapore (NUS)',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    country: 'Singapore',
    city: 'Singapore',
    website: 'https://www.nus.edu.sg',
    establishedYear: 1905,
    type: 'Autonomous Research',
    description: 'NUS is Singapore’s flagship university, offering a global approach to education and research with a focus on Asian perspectives and expertise.',
    history: 'Began as the Straits Settlements and Federated Malay States Government Medical School in 1905.',
    campusInfo: 'Kent Ridge main campus spanning 150 hectares with state-of-the-art residential colleges and research hubs.',
    intStudentInfo: 'MOE Tuition Grant available for international students binding 3-year local service obligation.',
    rating: 4.8,
    tuitionRange: 'SGD 17,550 - 39,250 / yr',
    status: 'Approved',
    adminId: 'admin-nus',
    adminName: 'Siti Rahmah',
    adminEmail: 's.rahmah@nus.edu.sg'
  },
  {
    id: 'uni-5',
    name: 'ETH Zurich',
    logo: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
    country: 'Switzerland',
    city: 'Zurich',
    website: 'https://ethz.ch',
    establishedYear: 1855,
    type: 'Federal Institute',
    description: 'ETH Zurich is a public research university focusing on science, technology, engineering, and mathematics, consistently ranked among the world’s best.',
    history: 'Founded by the Swiss Federal Government in 1854 with the stated mission to educate engineers and scientists.',
    campusInfo: 'Zentrum campus in downtown Zurich and Hönggerberg campus modern science city.',
    intStudentInfo: 'Highly international student body; Master degree courses taught predominantly in English.',
    rating: 4.8,
    tuitionRange: 'CHF 1,500 / yr',
    status: 'Approved',
    adminId: 'admin-eth',
    adminName: 'Klaus Fischer',
    adminEmail: 'k.fischer@ethz.ch'
  }
];

export const initialPrograms = [
  {
    id: 'prog-1',
    universityId: 'uni-1',
    name: 'MSc in Advanced Computer Science',
    degree: "Master's",
    field: 'Computer Science & AI',
    duration: '1 Year',
    tuition: '£36,000 / yr',
    requirements: 'First-class honors degree in CS or Mathematics. Minimum GPA 3.7. IELTS 7.5.'
  },
  {
    id: 'prog-2',
    universityId: 'uni-1',
    name: 'BA in Philosophy, Politics and Economics (PPE)',
    degree: "Bachelor's",
    field: 'Arts & Humanities',
    duration: '3 Years',
    tuition: '£32,500 / yr',
    requirements: 'AAA at A-level or 39+ IB points. Admissions test TSA required.'
  },
  {
    id: 'prog-3',
    universityId: 'uni-2',
    name: 'Master of Engineering in Electrical Engineering & Computer Science (6-A)',
    degree: "Master's",
    field: 'Engineering & Tech',
    duration: '2 Years',
    tuition: '$57,590 / yr',
    requirements: 'Strong background in computer science or electrical engineering. GRE optional. TOEFL 100+.'
  },
  {
    id: 'prog-4',
    universityId: 'uni-2',
    name: 'Ph.D. in Artificial Intelligence & Machine Learning',
    degree: 'Ph.D.',
    field: 'Computer Science & AI',
    duration: '5 Years',
    tuition: 'Fully Funded ($50k Stipend)',
    requirements: 'Bachelor or Master in CS/Math/Physics. Proven research experience and publications.'
  },
  {
    id: 'prog-5',
    universityId: 'uni-3',
    name: 'MSc in Data Engineering and Analytics',
    degree: "Master's",
    field: 'Data Science',
    duration: '2 Years',
    tuition: '€0 (Admin fee €150/sem)',
    requirements: 'BSc in Computer Science or Mathematics. English proficiency B2/C1.'
  },
  {
    id: 'prog-6',
    universityId: 'uni-4',
    name: 'MSc in Business Analytics',
    degree: "Master's",
    field: 'Business & Finance',
    duration: '1 Year',
    tuition: 'SGD 52,000',
    requirements: 'Good honors degree in quantitative field. GMAT/GRE score required. Min 2 yrs work exp preferred.'
  }
];

export const initialScholarships = [
  {
    id: 'sch-1',
    name: 'Clarendon Fund Scholarships',
    provider: 'University of Oxford',
    universityId: 'uni-1',
    universityName: 'University of Oxford',
    amount: 'Full Tuition + £18,622 Annual Living Stipend',
    fundingType: 'Fully Funded',
    eligibility: 'Open to all international graduate applicants across all subjects',
    deadline: '2026-10-25',
    degreeLevels: ["Master's", "Ph.D."],
    field: 'All Fields',
    country: 'United Kingdom',
    requirements: 'Automatically considered when applying by January program deadline. High academic achievement.',
    status: 'Approved'
  },
  {
    id: 'sch-2',
    name: 'MIT Presidential Fellowship',
    provider: 'Massachusetts Institute of Technology',
    universityId: 'uni-2',
    universityName: 'Massachusetts Institute of Technology (MIT)',
    amount: '$57,590 Tuition + $3,800/month Stipend + Health Insurance',
    fundingType: 'Fully Funded',
    eligibility: 'Outstanding incoming doctoral students from all departments',
    deadline: '2026-11-15',
    degreeLevels: ['Ph.D.'],
    field: 'Engineering & Tech',
    country: 'United States',
    requirements: 'Nominated by MIT department upon admission application review.',
    status: 'Approved'
  },
  {
    id: 'sch-3',
    name: 'DAAD Helmut-Schmidt Programme',
    provider: 'TUM & German Academic Exchange',
    universityId: 'uni-3',
    universityName: 'Technical University of Munich (TUM)',
    amount: '€934 Monthly Stipend + Travel Allowance + Health Cover',
    fundingType: 'Fully Funded',
    eligibility: 'Graduates from developing countries in governance/public policy/tech fields',
    deadline: '2026-09-30',
    degreeLevels: ["Master's"],
    field: 'Data Science',
    country: 'Germany',
    requirements: 'First university degree with above-average grades; language certificate.',
    status: 'Approved'
  },
  {
    id: 'sch-4',
    name: 'NUS Graduate School Scholarship (NGSS)',
    provider: 'National University of Singapore',
    universityId: 'uni-4',
    universityName: 'National University of Singapore (NUS)',
    amount: 'Full Tuition + SGD 3,200 Monthly Stipend + Airfare',
    fundingType: 'Fully Funded',
    eligibility: 'High caliber international students pursuing PhD in science/engineering',
    deadline: '2026-12-01',
    degreeLevels: ['Ph.D.'],
    field: 'Computer Science & AI',
    country: 'Singapore',
    requirements: 'Bachelor or Master degree with 1st Class Honors or equivalent.',
    status: 'Approved'
  },
  {
    id: 'sch-5',
    name: 'ETH Zurich Excellence Scholarship & Opportunity Programme (ESOP)',
    provider: 'ETH Zurich Foundation',
    universityId: 'uni-5',
    universityName: 'ETH Zurich',
    amount: 'CHF 12,000 per semester towards study & living expenses',
    fundingType: 'Partial Funding',
    eligibility: 'Top 10% students entering ETH Master degree programs',
    deadline: '2026-10-10',
    degreeLevels: ["Master's"],
    field: 'Engineering & Tech',
    country: 'Switzerland',
    requirements: 'Grade average of A or equivalent in BSc studies. Pre-proposal for Master thesis.',
    status: 'Approved'
  }
];

export const initialRegistrationRequests = [
  {
    id: 'req-1',
    universityName: 'Imperial College London',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    country: 'United Kingdom',
    city: 'London',
    website: 'https://www.imperial.ac.uk',
    establishedYear: 1907,
    type: 'Public Research',
    contactPerson: 'Dr. Alistair Finch',
    contactEmail: 'a.finch@imperial.ac.uk',
    submissionDate: '2026-09-02',
    status: 'Pending',
    wizardData: {
      description: 'Imperial College London is a world top ten university with a international reputation for excellence in teaching and research.',
      history: 'Formed in 1907 by Royal Charter, unifying the Royal College of Science, Royal School of Mines and City and Guilds College.',
      campusInfo: 'Main campus in South Kensington, with specialized medical and tech innovation campuses in White City.',
      intStudentInfo: 'Over 60% of students come from outside the UK representing 140+ countries.',
      programs: [
        { name: 'MSc Artificial Intelligence', degree: "Master's", field: 'Computer Science & AI', duration: '1 Year', tuition: '£38,500 / yr', requirements: '1st class degree in Math, CS or Physics.' }
      ],
      scholarships: [
        { name: 'President’s PhD Scholarships', amount: 'Full tuition + £22,900 stipend', fundingType: 'Fully Funded', eligibility: 'Outstanding PhD candidates', deadline: '2026-11-01' }
      ]
    }
  },
  {
    id: 'req-2',
    universityName: 'University of Tokyo',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
    country: 'Japan',
    city: 'Tokyo',
    website: 'https://www.u-tokyo.ac.jp',
    establishedYear: 1877,
    type: 'National University',
    contactPerson: 'Kenji Sato',
    contactEmail: 'sato@adm.u-tokyo.ac.jp',
    submissionDate: '2026-09-04',
    status: 'Pending',
    wizardData: {
      description: 'The University of Tokyo is Japan’s leading university, known for pioneering research across science, medicine, and social sciences.',
      history: 'Established in 1877 as the first national university in Japan.',
      campusInfo: 'Hongo campus featuring historic red brick buildings and the famous Akamon gate.',
      intStudentInfo: 'PEAK and GSP programs tailored for international English-speaking applicants.',
      programs: [
        { name: 'Global Science Course (GSC)', degree: "Bachelor's", field: 'Engineering & Tech', duration: '2 Years (Transfer)', tuition: '¥535,800 / yr', requirements: 'Completed 2 years of undergraduate study outside Japan.' }
      ],
      scholarships: [
        { name: 'MEXT University Recommendation', amount: '¥144,000 / month + Full Tuition', fundingType: 'Fully Funded', eligibility: 'Top international graduate applicants', deadline: '2026-10-15' }
      ]
    }
  }
];

export const initialApplications = [
  {
    id: 'app-101',
    studentId: 'std-user-1',
    studentName: 'Alex Rivera',
    studentEmail: 'alex.rivera@student.edu',
    universityId: 'uni-1',
    universityName: 'University of Oxford',
    programName: 'MSc in Advanced Computer Science',
    scholarshipName: 'Clarendon Fund Scholarships',
    appliedDate: '2026-08-20',
    status: 'Under Review',
    gpa: '3.92',
    documents: [
      { name: 'Academic_Transcript_Oxford.pdf', size: '2.4 MB' },
      { name: 'Statement_of_Purpose.pdf', size: '890 KB' },
      { name: 'Recommendation_Letters.pdf', size: '1.1 MB' }
    ],
    notes: 'Submitted for Autumn 2026 Intake. Currently under academic committee evaluation.'
  },
  {
    id: 'app-102',
    studentId: 'std-user-1',
    studentName: 'Alex Rivera',
    studentEmail: 'alex.rivera@student.edu',
    universityId: 'uni-3',
    universityName: 'Technical University of Munich (TUM)',
    programName: 'MSc in Data Engineering and Analytics',
    scholarshipName: 'DAAD Helmut-Schmidt Programme',
    appliedDate: '2026-08-28',
    status: 'Accepted',
    gpa: '3.92',
    documents: [
      { name: 'Bachelor_Diploma_Certified.pdf', size: '3.1 MB' },
      { name: 'Language_Proficiency_IELTS.pdf', size: '420 KB' }
    ],
    notes: 'Official admission offer issued on Sept 1st! Conditional scholarship award letter attached.'
  }
];

export const initialTaxonomies = {
  countries: ['United States', 'United Kingdom', 'Germany', 'Singapore', 'Australia', 'Switzerland', 'Canada', 'Japan'],
  degreeLevels: ["Bachelor's", "Master's", 'Ph.D.', 'Diploma', 'Postdoctorate'],
  fieldsOfStudy: ['Computer Science & AI', 'Engineering & Tech', 'Business & Finance', 'Data Science', 'Medicine & Healthcare', 'Environmental Science', 'Arts & Humanities'],
  fundingTypes: ['Fully Funded', 'Partial Funding', 'Stipend Only', 'Tuition Waiver']
};

export const initialAuditLogs = [
  { id: 'log-1', timestamp: '2026-09-04 14:22:10', user: 'Super Admin (System)', action: 'UNIVERSITY_REGISTER', details: 'Added Oxford University and MIT to active database' },
  { id: 'log-2', timestamp: '2026-09-04 16:05:40', user: 'University Admin (Oxford)', action: 'PROGRAM_CREATE', details: 'Added MSc in Advanced Computer Science program' },
  { id: 'log-3', timestamp: '2026-09-05 02:11:05', user: 'Super Admin (System)', action: 'SCHOLARSHIP_APPROVE', details: 'Approved Clarendon Fund Scholarships for platform listing' },
  { id: 'log-4', timestamp: '2026-09-05 05:40:12', user: 'Student (Alex Rivera)', action: 'APPLICATION_SUBMIT', details: 'Submitted application for MSc Data Engineering at TUM' }
];

export const initialNotifications = [
  { id: 'notif-1', recipientRole: 'student', title: 'Application Status Updated', message: 'Your application to TUM has been ACCEPTED!', time: '2 hours ago', read: false },
  { id: 'notif-2', recipientRole: 'uniAdmin', title: 'New Application Received', message: 'Alex Rivera submitted an application for MSc Computer Science.', time: '1 day ago', read: false },
  { id: 'notif-3', recipientRole: 'superAdmin', title: 'Pending Approval Request', message: 'Imperial College London submitted a registration request.', time: '3 hours ago', read: false }
];
