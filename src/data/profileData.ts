export interface ExperienceRole {
  title: string;
  startDate: string;
  endDate: string;
  location?: string;
  bullets: string[];
  skills?: string[];
}

export interface Experience {
  company: string;
  companyUrl?: string;
  industry?: string;
  title: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  bullets: string[];
  skills?: string[];
  roles?: ExperienceRole[];
}

export interface Project {
  title: string;
  subtitle: string;
  period: string;
  association?: string;
  description: string;
  highlights: string[];
  tags: string[];
  link?: string;
  linkLabel?: string;
  featured?: boolean;
  badge?: string;
}

export interface Education {
  school: string;
  degree: string;
  field?: string;
  duration: string;
  location?: string;
  highlights?: string[];
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
  url?: string;
}

export interface Publication {
  title: string;
  conference?: string;
  date?: string;
  url?: string;
  citations?: string;
  summary?: string;
}

export interface Award {
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
}

export interface ProfileHighlight {
  value: string;
  label: string;
  detail: string;
}

export interface ProfileData {
  name: string;
  title: string;
  currentCompany: string;
  currentCompanyUrl: string;
  location: string;
  tagline: string;
  headline: string;
  email: string;
  linkedIn: string;
  github: string;
  summary: string;
  bioParagraphs: string[];
  highlights: ProfileHighlight[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  skills: {
    technical: string[];
    categories: SkillCategory[];
    languages: {
      name: string;
      proficiency: string;
    }[];
  };
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
}

export const profileData: ProfileData = {
  name: "Rhishabh Hattarki",
  title: "Software Engineer",
  currentCompany: "Path Robotics",
  currentCompanyUrl: "https://www.linkedin.com/company/path-robotics",
  location: "Columbus, Ohio",
  tagline: "Software Engineer at Path Robotics · Backend Systems, Distributed Integrations & AI Tooling",
  headline:
    "Building reliable backend systems, high-throughput data pipelines, and intelligent software for real-world autonomous and enterprise platforms.",
  email: "rhish9h@gmail.com",
  linkedIn: "https://www.linkedin.com/in/rhishabh-hattarki/",
  github: "https://github.com/rhish9h",
  summary: `Software Engineer with 4+ years of experience building backend systems, APIs, integrations, data pipelines, and full-stack applications using Python, C#, JavaScript, TypeScript, SQL, and related technologies. I hold an M.S. in Software Engineering from Arizona State University and currently work as a Software Engineer at Path Robotics in Columbus, Ohio.

My experience spans backend services, distributed systems, integrations, data processing, developer tooling, cybersecurity, and full-stack development. Previously at EmpowerID, I worked on Identity and Access Management (IAM) and Identity Governance systems—developing REST, SCIM, ODBC, and database integrations, FastAPI microservices, C#/.NET connectors, T-SQL synchronization pipelines, and multi-agent AI engineering workflows. Earlier in my career at Persistent Systems, I developed Spring Boot REST APIs, revamped React frontends, and mentored engineering interns.

I enjoy understanding systems end to end, breaking down ambiguous technical problems, debugging difficult issues, and building solutions that are reliable, maintainable, and practical.`,
  bioParagraphs: [
    "I’m a Software Engineer with 4+ years of experience designing and scaling backend services, APIs, enterprise integrations, data pipelines, and full-stack applications across Python, C#/.NET, TypeScript, Java/Spring Boot, and SQL. I hold an M.S. in Software Engineering from Arizona State University and currently work as a Software Engineer at Path Robotics in Columbus, Ohio.",
    "Prior to joining Path Robotics, I spent over two years at EmpowerID building mission-critical Identity and Access Management (IAM) and Identity Governance infrastructure. My work ranged from architecting a 3-stage T-SQL synchronization and 5-level deduplication pipeline processing 50K+ worker records against 1M+ accounts (cutting execution time by 69.2%) to designing a 10-subagent AI documentation workflow that reduced generation cost by 87%, alongside FastAPI microservices and C#/.NET connectors.",
    "I’m drawn to problems where software meets physical and high-reliability systems—from autonomous robotic manufacturing at Path Robotics to CycleSafe, an IoT and computer-vision cyclist safety system built with the University of Arizona and the Rob Dollar Foundation. Whether optimizing database internals or shipping end-to-end product features, I focus on clarity, resilience, and measurable engineering impact."
  ],
  highlights: [
    {
      value: "4+ yrs",
      label: "Production Engineering",
      detail: "Backend services, distributed integrations, pipelines & full-stack apps"
    },
    {
      value: "69.2%",
      label: "Pipeline Latency Cut",
      detail: "Reduced 50K-record sync against 1M+ rows from 13 min to 4 min in T-SQL"
    },
    {
      value: "87%",
      label: "AI Workflow Savings",
      detail: "Orchestrated 10 specialized subagents to cut doc generation from $40 to ~$5"
    },
    {
      value: "M.S. SE",
      label: "Arizona State University",
      detail: "Featured Capstone team at the ASU Polytechnic Innovation Showcase"
    }
  ],
  experiences: [
    {
      company: "Path Robotics",
      companyUrl: "https://www.linkedin.com/company/path-robotics",
      industry: "Autonomous Robotic Welding & Manufacturing",
      title: "Software Engineer",
      location: "Columbus, Ohio, United States",
      startDate: "Sep 2026",
      endDate: "Present",
      current: true,
      bullets: [
        "Engineering software systems, backend services, and developer tooling supporting autonomous robotic welding platforms and intelligent manufacturing workflows.",
        "Collaborating across systems, data, and application teams to deliver reliable, production-grade software for industrial robotics operations."
      ],
      skills: ["Python", "Backend Systems", "Robotics Software", "Distributed Systems", "APIs", "TypeScript"],
      roles: [
        {
          title: "Software Engineer",
          startDate: "Sep 2026",
          endDate: "Present",
          location: "Columbus, Ohio, United States",
          bullets: [
            "Engineering software systems, backend services, and developer tooling supporting autonomous robotic welding platforms and intelligent manufacturing workflows.",
            "Collaborating across systems, data, and application teams to deliver reliable, production-grade software for industrial robotics operations."
          ],
          skills: ["Python", "Backend Systems", "Robotics Software", "Distributed Systems", "APIs", "TypeScript"]
        }
      ]
    },
    {
      company: "EmpowerID",
      companyUrl: "https://www.linkedin.com/company/empowerid",
      industry: "Enterprise Identity & Access Management (IAM / IGA)",
      title: "Software Engineer",
      location: "Dublin, Ohio, United States",
      startDate: "Jul 2024",
      endDate: "Aug 2026",
      bullets: [
        "Architected a multi-agent AI documentation pipeline in Cursor for an SAP Fieldglass enterprise connector, replacing a single 1M-context monolith with 10 domain-specialized Composer 2.5 subagents orchestrated in parallel SME → merge → doc-writer phases; cut full regeneration cost by 87% ($40 → ~$5) while preserving code-verified accuracy across 3 deliverables.",
        "Designed and implemented a 3-stage T-SQL data integration pipeline (JSON parsing → deduplication → Account sync) with atomic transaction semantics and microsecond-precision batch IDs to safely ingest SAP Fieldglass worker records into a 1M+ row enterprise identity table.",
        "Reduced pipeline execution time by 69.2% (13 min → 4 min for 50K records) via HASHBYTES-based change detection across 68 columns, a single-scan caching pattern on a 1M+ row table, and targeted temp table indexing.",
        "Engineered a 5-level cross-worker deduplication algorithm with custom priority ranking across Access Type, Assignment Status, and Worker Completeness, plus LogonName conflict detection within batches and against 1M+ existing accounts.",
        "Implemented SAP Fieldglass worker inventory using DataCollector (attribute mapping and inventory strategy) across multi-tenant environments (Dev, UAT, UAT2, Prod), and refactored shared utilities into a centralized Python common_utils package with automated CI testing."
      ],
      skills: ["Python", "FastAPI", "C# / .NET", "T-SQL", "SCIM & REST", "ODBC", "Multi-Agent AI", "CI/CD", "IAM / IGA"],
      roles: [
        {
          title: "Software Engineer",
          startDate: "Jan 2025",
          endDate: "Aug 2026",
          location: "Ohio, United States",
          bullets: [
            "Architected a multi-agent AI documentation pipeline in Cursor for an SAP Fieldglass enterprise connector, replacing a single Opus 1M-context monolith with 10 domain-specialized subagents (SQL pipeline, inbox, DataCollector, R10 config, tests) orchestrated in parallel SME → merge → doc-writer phases; cut full regeneration cost by 87% ($40 → ~$5) while preserving code-verified accuracy across 3 deliverables.",
            "Designed and implemented a 3-stage T-SQL data integration pipeline (JSON parsing → deduplication → Account sync) with atomic transaction semantics and microsecond-precision batch IDs to safely process SAP Fieldglass worker records into a 1M+ row identity table.",
            "Reduced pipeline execution time by 69.2% (13 min → 4 min for 50K records) by implementing HASHBYTES-based change detection across 68 columns, a single-scan caching pattern on a 1M+ row table, and targeted temp table indexing to eliminate redundant I/O.",
            "Engineered a 5-level cross-worker deduplication algorithm with custom priority ranking across Access Type, Assignment Status, and Worker Completeness to consolidate multiple work assignments per worker into a single winner record, alongside LogonName conflict detection against 1M+ existing accounts.",
            "Implemented SAP Fieldglass worker inventory via internal DataCollector tooling across Dev, UAT, UAT2, and Prod environments, and refactored shared microservice logic into a centralized Python common_utils library with automated CI testing."
          ],
          skills: ["Python", "FastAPI", "T-SQL", "C# / .NET", "SCIM", "Multi-Agent AI", "Data Pipelines", "CI/CD"]
        },
        {
          title: "EmpowerID IAM Engineer",
          startDate: "Jul 2024",
          endDate: "Dec 2024",
          location: "Dublin, Ohio, United States",
          bullets: [
            "Optimized the Group Inventory and Export modules of the Universal Flat File Connector for a banking client integration, enabling reliable synchronization with C#-based IAM systems.",
            "Enhanced the ODBC connector in a Python FastAPI microservice, implementing security hardening that strengthened defenses against SQL injection attacks and improved overall robustness.",
            "Achieved certifications as a Certified EmpowerID Identity Orchestration Developer and Certified EmpowerID Operator."
          ],
          skills: ["C#", "Python", "FastAPI", "ODBC", "SQL Security", "IAM"]
        }
      ]
    },
    {
      company: "Arizona State University",
      companyUrl: "https://www.linkedin.com/school/arizona-state-university",
      industry: "Higher Education · Ira A. Fulton Schools of Engineering",
      title: "Graduate Services Assistant — Instructional Assistant & Grader",
      location: "Tempe, Arizona, United States",
      startDate: "Apr 2023",
      endDate: "May 2024",
      bullets: [
        "Supported SER 232 (Computer Systems Fundamentals) across Summer and Fall sessions by mentoring students, leading office hours, and resolving grading inquiries with faculty supervisors.",
        "Collaborated with instructional teams to evaluate assignments, quizzes, and exams for 66+ students per cohort, maintaining rubric consistency and debugging automated grading workflows."
      ],
      skills: ["Computer Systems", "Instructional Support", "Code Review", "Academic Mentorship"],
      roles: [
        {
          title: "Graduate Services Assistant — Instructional Assistant & Grader",
          startDate: "Aug 2023",
          endDate: "May 2024",
          location: "Tempe, Arizona, United States",
          bullets: [
            "Coordinated grading workflows, resolved student inquiries, and provided instructional support for SER 232 (Computer Systems Fundamentals) in collaboration with faculty supervisors.",
            "Evaluated coursework, quizzes, and exams with rubric-driven feedback while upholding academic integrity standards."
          ],
          skills: ["Computer Systems", "Mentorship", "Assessment"]
        },
        {
          title: "Graduate Services Assistant — Summer Grader (GR1)",
          startDate: "May 2023",
          endDate: "Jul 2023",
          location: "Tempe, Arizona, United States",
          bullets: [
            "Reviewed assignments and quizzes for 66 students in SER 232 Session C and implemented a structured regrading workflow to resolve auto-grader edge cases."
          ],
          skills: ["Auto-Grader Debugging", "SER 232"]
        },
        {
          title: "Parking Assistant Student Worker III",
          startDate: "Apr 2023",
          endDate: "Aug 2023",
          location: "Tempe, Arizona, United States",
          bullets: [
            "Maintained uninterrupted campus gate operations, diagnosed hardware malfunctions, and assisted university visitors."
          ]
        }
      ]
    },
    {
      company: "Persistent Systems",
      companyUrl: "https://www.linkedin.com/company/persistent-systems",
      industry: "Digital Engineering & Enterprise Banking Systems",
      title: "Software Engineer",
      location: "Pune, Maharashtra, India (Client: Standard Chartered Bank)",
      startDate: "Jan 2021",
      endDate: "Jul 2022",
      bullets: [
        "Spearheaded the development of a scalable configuration management microservice for an Escrow Payment System (Standard Chartered Bank), designing 13 REST APIs using Spring Boot, Hibernate, and PostgreSQL.",
        "Revamped the configuration service front-end using React.js and react-d3-tree, introducing interactive tree visualizations and significantly improving operator usability.",
        "Mentored and led a team of 5 interns through the architecture and delivery of a vault management React.js front-end, overseeing project setup, design reviews, and issue resolution.",
        "Conducted 7 technical interviews (internal and external) for Java, Spring Boot, and React.js engineering candidates."
      ],
      skills: ["Java", "Spring Boot", "PostgreSQL", "Hibernate", "React.js", "REST APIs", "Team Leadership"],
      roles: [
        {
          title: "Software Engineer",
          startDate: "Jan 2021",
          endDate: "Jul 2022",
          location: "Pune & Bengaluru, India",
          bullets: [
            "Spearheaded the development of a scalable configuration management microservice for an Escrow Payment System (Standard Chartered Bank), designing 13 REST APIs using Spring Boot, Hibernate, and PostgreSQL.",
            "Revamped the configuration service front-end using React.js and react-d3-tree, introducing interactive tree visualizations and significantly improving operator usability.",
            "Mentored and led a team of 5 interns through the architecture and delivery of a vault management React.js front-end, overseeing project setup, design reviews, and issue resolution.",
            "Conducted 7 technical interviews (internal and external) for Java, Spring Boot, and React.js engineering candidates."
          ],
          skills: ["Java", "Spring Boot", "PostgreSQL", "Hibernate", "React.js", "REST APIs", "Technical Leadership"]
        }
      ]
    },
    {
      company: "Mithi Software Technologies",
      companyUrl: "https://www.linkedin.com/company/mithi",
      industry: "Cloud Collaboration & Enterprise Security",
      title: "Trainee Software Engineer",
      location: "Pune, Maharashtra, India",
      startDate: "Jan 2020",
      endDate: "Jan 2021",
      bullets: [
        "Designed and implemented an RSA-encrypted login workflow and expanded the salted-hash authentication system protecting SkyConnect.",
        "Identified and remediated 5 production security vulnerabilities across web authentication services.",
        "Implemented salted hashing authentication for the Roundcube login system using PHP and worked across Jenkins, Docker, Linux, and Bash CI/CD pipelines."
      ],
      skills: ["RSA Encryption", "Authentication Security", "PHP", "Docker", "Jenkins", "Linux", "Bash"],
      roles: [
        {
          title: "Trainee Software Engineer",
          startDate: "Jun 2020",
          endDate: "Jan 2021",
          location: "Pune, Maharashtra, India",
          bullets: [
            "Enhanced the salted-hash login architecture initiated during my internship and designed an end-to-end secure login system using RSA encryption.",
            "Identified and remediated 5 production security bugs to harden application security."
          ],
          skills: ["RSA Encryption", "Application Security", "Authentication"]
        },
        {
          title: "Intern — Trainee Software Engineer",
          startDate: "Jan 2020",
          endDate: "Jun 2020",
          location: "Pune, Maharashtra, India",
          bullets: [
            "Implemented salted hashing authentication for the Roundcube login system in PHP to add a second layer of protection to SkyConnect.",
            "Contributed production code within agile SDLC workflows using Jenkins, Docker, Linux, Bash, and cloud tooling."
          ],
          skills: ["PHP", "Salted Hashing", "Docker", "Jenkins", "Linux"]
        }
      ]
    },
    {
      company: "Apace Apparels and Equipment Pvt. Ltd.",
      companyUrl: "https://www.linkedin.com/company/keepapace",
      industry: "E-Commerce & Operations Software",
      title: "Intern — Full-Stack Developer",
      location: "Pune, Maharashtra, India",
      startDate: "Jun 2019",
      endDate: "Jul 2019",
      bullets: [
        "Modernized inventory operations by migrating from manual Google Sheets workflows to a full-stack web application built with Vue.js, PHP, and MySQL.",
        "Improved data privacy and scalability by decoupling inventory storage from the presentation layer."
      ],
      skills: ["Vue.js", "PHP", "MySQL", "Full-Stack Development"],
      roles: [
        {
          title: "Intern — Full-Stack Developer",
          startDate: "Jun 2019",
          endDate: "Jul 2019",
          location: "Pune, Maharashtra, India",
          bullets: [
            "Modernized inventory operations by migrating from manual Google Sheets workflows to a full-stack web application built with Vue.js, PHP, and MySQL.",
            "Improved data privacy and scalability by decoupling inventory storage from the presentation layer."
          ],
          skills: ["Vue.js", "PHP", "MySQL"]
        }
      ]
    }
  ],
  projects: [
    {
      title: "CycleSafe — Smart Cyclist Safety & ALPR System",
      subtitle: "Cross-Platform Mobile App & IoT Proximity System",
      period: "Jan 2024 – Apr 2024",
      association: "Arizona State University · University of Arizona · Rob Dollar Foundation",
      badge: "Featured Innovation Showcase Project",
      featured: true,
      description:
        "Built a cross-platform iOS and Android companion app connected via Wi-Fi to a handlebar-mounted proximity radar and camera unit to detect vehicles passing within Arizona's 3-foot safety zone and automatically recognize license plates.",
      highlights: [
        "Engineered real-time Wi-Fi telemetry and image transfer between the embedded handlebar hardware and mobile client.",
        "Integrated Automatic License Plate Recognition (ALPR) with optimal frame selection to identify close-passing vehicles.",
        "Selected as the sole featured Software Engineering capstone project among 35+ teams (250+ students) at the ASU Polytechnic Innovation Showcase."
      ],
      tags: ["Mobile Development", "Computer Vision / ALPR", "IoT Wi-Fi Telemetry", "iOS & Android"],
      link: "https://www.linkedin.com/posts/rhishabh-hattarki_our-capstone-project-cycle-safe-was-presented-activity-7190122897691029506-09_w",
      linkLabel: "Showcase Case Study"
    },
    {
      title: "Enterprise SAP Fieldglass Sync & Multi-Agent AI Pipeline",
      subtitle: "High-Throughput T-SQL Engine & 10-Agent Orchestration",
      period: "2025 – 2026",
      association: "EmpowerID",
      badge: "69.2% Faster · 87% Cost Reduction",
      featured: true,
      description:
        "Designed an atomic 3-stage T-SQL identity ingestion pipeline and a 10-subagent AI documentation architecture for enterprise workforce synchronization at million-account scale.",
      highlights: [
        "Cut 50K-record synchronization time from 13 minutes to 4 minutes (-69.2%) using 68-column HASHBYTES delta detection and single-scan caching over 1M+ rows.",
        "Built a 5-level cross-worker deduplication algorithm resolving complex multi-assignment priority rules and batch LogonName collisions.",
        "Replaced a single-context LLM workflow with 10 specialized subagents (SME → merge → writer), slashing regeneration cost by 87% ($40 → ~$5)."
      ],
      tags: ["T-SQL", "Python", "Data Pipelines", "Multi-Agent AI", "Enterprise IAM", "Performance Optimization"]
    },
    {
      title: "Real-Time Intrusion Detection System for IoT Networks",
      subtitle: "Machine Learning Network Security Platform",
      period: "Mar 2019 – Jun 2020",
      association: "Savitribai Phule Pune University · Published in IEEE I2CT",
      badge: "IEEE Published · 1st Prize Winner",
      featured: true,
      description:
        "Led a 4-person engineering team to build a full-stack intrusion detection platform using a Random Forest classifier trained on live IoT network traffic from physical sensor nodes.",
      highlights: [
        "Configured a live IoT testbed (Arduino UNO, NodeMCU, Ultrasonic sensor, Apache server) and captured custom real-time packet telemetry across 5 cyber-attack vectors.",
        "Built a React dashboard and Django backend streaming 10,000+ network records over WebSockets with instant anomaly alerts.",
        "Published in IEEE Xplore (14+ citations) and won 1st Prize among 36+ teams at Techno Spark 2020."
      ],
      tags: ["Python", "Django", "React", "Random Forest ML", "WebSockets", "IoT Security"],
      link: "https://github.com/s3r-be/be-project",
      linkLabel: "GitHub Repository"
    },
    {
      title: "Escrow Configuration Microservice & Tree Visualizer",
      subtitle: "Distributed Banking Configuration Platform",
      period: "2021 – 2022",
      association: "Persistent Systems (Standard Chartered Bank)",
      description:
        "Architected a configuration management microservice and interactive hierarchical visualization UI for an enterprise escrow payment platform.",
      highlights: [
        "Designed and shipped 13 scalable REST APIs using Spring Boot, Hibernate ORM, and PostgreSQL.",
        "Redesigned the operator frontend with React.js and react-d3-tree to visualize nested payment configurations."
      ],
      tags: ["Spring Boot", "Java", "PostgreSQL", "Hibernate", "React.js", "D3.js"]
    }
  ],
  education: [
    {
      school: "Arizona State University",
      degree: "Master of Science in Software Engineering",
      duration: "Aug 2022 – Apr 2024",
      location: "Tempe, Arizona, United States",
      highlights: [
        "Ira A. Fulton Schools of Engineering · Graduate Services Assistant for SER 232 (Computer Systems Fundamentals)",
        "Capstone Featured Project Winner at the Spring 2024 Polytechnic Innovation Showcase (CycleSafe)"
      ]
    },
    {
      school: "Savitribai Phule Pune University",
      degree: "Bachelor of Engineering in Computer Engineering",
      duration: "2016 – 2020",
      location: "Pune, Maharashtra, India",
      highlights: [
        "Published 2 IEEE research papers on Machine Learning Intrusion Detection Systems for IoT Networks",
        "Won Best Poster at IEEE ESCI 2020 and First Prize at state-level competition Techno Spark 2020"
      ]
    }
  ],
  skills: {
    technical: [
      "Python",
      "C# / .NET",
      "TypeScript",
      "JavaScript",
      "SQL / T-SQL",
      "Java",
      "FastAPI",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "REST & SCIM APIs",
      "Microservices",
      "Data Pipelines",
      "Identity & Access Management (IAM)",
      "AWS",
      "Azure",
      "Docker",
      "Multi-Agent AI Workflows"
    ],
    categories: [
      {
        name: "Languages & Core",
        description: "Primary programming and query languages used in production",
        skills: ["Python", "C#", "TypeScript", "JavaScript", "SQL (T-SQL, PostgreSQL, MySQL)", "Java", "PHP", "Bash"]
      },
      {
        name: "Backend & Distributed Systems",
        description: "Service architecture, APIs, and high-reliability connectors",
        skills: [
          "FastAPI",
          ".NET / C#",
          "Spring Boot",
          "Django",
          "RESTful APIs",
          "SCIM & ODBC Integrations",
          "Microservices",
          "WebSockets",
          "Hibernate ORM"
        ]
      },
      {
        name: "Data Engineering, Security & IAM",
        description: "Large-scale data ingestion, SQL optimization, and identity governance",
        skills: [
          "Data Ingestion & Sync Pipelines",
          "SQL Query & Index Optimization",
          "Deduplication Algorithms",
          "Identity & Access Management (IAM / IGA)",
          "RSA & Authentication Security",
          "Random Forest / ML Classification"
        ]
      },
      {
        name: "Frontend, Cloud & Developer Tooling",
        description: "Modern web interfaces, cloud infrastructure, and AI-assisted automation",
        skills: [
          "React.js",
          "Vue.js",
          "Tailwind CSS",
          "AWS (Cloud Practitioner)",
          "Microsoft Azure (AZ-900)",
          "Docker",
          "Jenkins & CI/CD",
          "Linux",
          "Git",
          "Multi-Agent AI Orchestration"
        ]
      }
    ],
    languages: [
      { name: "English", proficiency: "Full Professional" },
      { name: "Marathi", proficiency: "Native / Bilingual" },
      { name: "Hindi", proficiency: "Working Proficiency" },
      { name: "Kannada", proficiency: "Elementary" }
    ]
  },
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Issued Apr 2024 · Expires Apr 2027",
      credentialId: "a416d9b059364a468d56f0e5b40d0872",
      url: "https://www.credly.com/badges/b5c417f3-89d6-4221-886b-a2326e7f241f/linked_in_profile"
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "Issued Jun 2024",
      credentialId: "A93EDC54FB6111F0",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/RhishabhSuhasHattarki-3296/A93EDC54FB6111F0"
    },
    {
      name: "Certified EmpowerID Identity Orchestration Developer",
      issuer: "EmpowerID",
      date: "Issued Aug 2024",
      credentialId: "DEV2024-006"
    },
    {
      name: "Certified EmpowerID Operator",
      issuer: "EmpowerID",
      date: "Issued Sep 2024",
      credentialId: "OPR2024-009"
    }
  ],
  awards: [
    {
      title: "Featured Project — Polytechnic Innovation Showcase Spring 2024",
      issuer: "Arizona State University (The Polytechnic School)",
      date: "Apr 2024",
      description:
        "Selected as the sole featured project from the Software Engineering department among 35+ capstone teams and 250+ students for CycleSafe."
    },
    {
      title: "First Prize — Techno Spark 2020",
      issuer: "Pimpri Chinchwad College of Engineering & Research (PCCoE&R)",
      date: "May 2020",
      description:
        "Won 1st Place among 36+ competing teams in the state-level project competition for 'Anomaly-Based Intrusion Detection System for IoT Networks using Random Forest'."
    },
    {
      title: "Best Poster Award — IEEE Conference ESCI 2020",
      issuer: "IEEE International Conference on Emerging Smart Computing and Informatics",
      date: "Mar 2020",
      description:
        "Awarded Best Poster presentation for research on anomaly-based intrusion detection architectures in IoT environments."
    }
  ],
  publications: [
    {
      title: "Real Time Intrusion Detection System For IoT Networks",
      conference: "2021 6th International Conference for Convergence in Technology (I2CT) · IEEE",
      date: "Apr 2021",
      citations: "14+ Citations",
      url: "https://doi.org/10.1109/i2ct51068.2021.9417815",
      summary:
        "Presents a real-time Random Forest intrusion detection system tested against live network traffic from an IoT sensor node (Arduino UNO, NodeMCU, Ultrasonic sensor) rather than static non-IoT benchmarks."
    },
    {
      title: "Survey on Anomaly-Based Intrusion Detection Systems in IoT Networks",
      conference: "2020 International Conference on Emerging Smart Computing and Informatics (ESCI) · IEEE",
      date: "Mar 2020",
      summary:
        "Comprehensive evaluation of anomaly-based intrusion detection methodologies, network telemetry features, and machine learning classifiers for resource-constrained IoT networks."
    }
  ]
};
