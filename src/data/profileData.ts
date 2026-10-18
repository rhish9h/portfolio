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
  tagline: "Software Engineer at Path Robotics",
  headline:
    "Software Engineer with 4+ years of experience building backend systems, APIs, integrations, data pipelines, and full-stack applications using Python, C#, JavaScript, TypeScript, SQL, and related technologies.",
  email: "rhish9h@gmail.com",
  linkedIn: "https://www.linkedin.com/in/rhishabh-hattarki/",
  github: "https://github.com/rhish9h",
  summary: `Software Engineer with 4+ years of experience building backend systems, APIs, integrations, data pipelines, and full-stack applications using Python, C#, JavaScript, TypeScript, SQL, and related technologies. I hold an MS in Software Engineering from Arizona State University and currently work as a Software Engineer at Path Robotics.

My experience spans backend services, distributed systems, integrations, data processing, developer tooling, cybersecurity, and full-stack development. Previously at EmpowerID, I worked on Identity and Access Management and Identity Governance systems, developing REST, SCIM, ODBC, and database integrations, FastAPI microservices, and C#/.NET connectors. I also worked on data ingestion and synchronization pipelines, SQL performance optimization, validation tooling, and debugging production systems. Earlier in my career at Persistent Systems, I developed REST APIs, contributed to frontend applications, and mentored interns.

I enjoy understanding systems end to end, breaking down ambiguous technical problems, debugging difficult issues, and building solutions that are reliable, maintainable, and practical. I’m particularly interested in backend engineering, distributed systems, APIs, data-intensive applications, developer platforms, robotics software, and AI-enabled products.

I also enjoy building technology around real-world problems. One project I worked on was CycleSafe, a cyclist safety application developed in collaboration with the University of Arizona and the Rob Dollar Foundation. The system connected to a handlebar-mounted device to detect approaching vehicles, capture license plates, and help address unsafe passing incidents.

Outside of work, I continue to explore software architecture, AI, generative technologies, product development, and systems engineering. I enjoy learning how complex systems work and turning that understanding into software people can actually use.`,
  bioParagraphs: [
    "Software Engineer with 4+ years of experience building backend systems, APIs, integrations, data pipelines, and full-stack applications using Python, C#, JavaScript, TypeScript, SQL, and related technologies. I hold an MS in Software Engineering from Arizona State University and currently work as a Software Engineer at Path Robotics.",
    "My experience spans backend services, distributed systems, integrations, data processing, developer tooling, cybersecurity, and full-stack development. Previously at EmpowerID, I worked on Identity and Access Management and Identity Governance systems, developing REST, SCIM, ODBC, and database integrations, FastAPI microservices, and C#/.NET connectors. I also worked on data ingestion and synchronization pipelines, SQL performance optimization, validation tooling, and debugging production systems. Earlier in my career at Persistent Systems, I developed REST APIs, contributed to frontend applications, and mentored interns.",
    "I enjoy understanding systems end to end, breaking down ambiguous technical problems, debugging difficult issues, and building solutions that are reliable, maintainable, and practical. I’m particularly interested in backend engineering, distributed systems, APIs, data-intensive applications, developer platforms, robotics software, and AI-enabled products.",
    "I also enjoy building technology around real-world problems. One project I worked on was CycleSafe, a cyclist safety application developed in collaboration with the University of Arizona and the Rob Dollar Foundation. The system connected to a handlebar-mounted device to detect approaching vehicles, capture license plates, and help address unsafe passing incidents.",
    "Outside of work, I continue to explore software architecture, AI, generative technologies, product development, and systems engineering. I enjoy learning how complex systems work and turning that understanding into software people can actually use."
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
        "Working as a Software Engineer building backend services, systems, and software for autonomous robotic manufacturing platforms."
      ],
      skills: ["Python", "Backend Systems", "Robotics Software", "Distributed Systems", "APIs", "TypeScript"],
      roles: [
        {
          title: "Software Engineer",
          startDate: "Sep 2026",
          endDate: "Present",
          location: "Columbus, Ohio, United States",
          bullets: [
            "Working as a Software Engineer building backend services, systems, and software for autonomous robotic manufacturing platforms."
          ],
          skills: ["Python", "Backend Systems", "Robotics Software", "Distributed Systems", "APIs", "TypeScript"]
        }
      ]
    },
    {
      company: "EmpowerID",
      companyUrl: "https://www.linkedin.com/company/empowerid",
      industry: "Identity and Access Management (IAM) & Identity Governance",
      title: "Software Engineer",
      location: "Dublin, Ohio, United States",
      startDate: "Jul 2024",
      endDate: "Aug 2026",
      bullets: [
        "Architected a multi-agent AI documentation pipeline in Cursor for an SAP Fieldglass enterprise connector, replacing a single Opus 1M-context monolith with 10 domain-specialized Composer 2.5 subagents (SQL pipeline, inbox, DataCollector, R10 config, tests) orchestrated in parallel SME → merge → doc-writer phases; cut full documentation regeneration cost 87% ($40 → ~$5) while preserving code-verified accuracy across 3 deliverables.",
        "Designed and implemented a 3-stage T-SQL data integration pipeline (JSON parsing → deduplication → Account sync) with atomic transaction semantics and microsecond-precision batch IDs to safely process SAP Fieldglass worker records into a 1M+ row table in the enterprise identity management system.",
        "Reduced pipeline execution time by 69.2% (13 min → 4 min for 50K records) by implementing HASHBYTES-based change detection across 68 columns, a single-scan caching pattern on a 1M+ row table, and targeted temp table indexing to eliminate redundant I/O.",
        "Engineered a 5-level cross-worker deduplication algorithm with custom priority ranking across Access Type, Assignment Status, and Worker Completeness to consolidate multiple work assignments per worker into a single winner record, and also error mitigation LogonName conflict detection within batches and against 1M+ existing accounts.",
        "Implemented the SAP Fieldglass worker inventory using our internal tool, DataCollector, including attribute mapping and inventory strategy design. Delivered cross-tenant and multi-environment deployments (Dev, UAT, UAT2, Prod), enabling reliable and scalable client data integration.",
        "Refactored common classes and utilities into a centralized common_utils library, reducing code duplication and standardizing functionality across Python microservices. Implemented an automated CI testing pipeline to improve code reliability."
      ],
      skills: ["Python", "FastAPI", "C# / .NET", "T-SQL", "SCIM & REST", "ODBC", "Multi-Agent AI", "CI/CD", "IAM / IGA"],
      roles: [
        {
          title: "Software Engineer",
          startDate: "Jan 2025",
          endDate: "Aug 2026",
          location: "Ohio, United States",
          bullets: [
            "Architected a multi-agent AI documentation pipeline in Cursor for an SAP Fieldglass enterprise connector, replacing a single Opus 1M-context monolith with 10 domain-specialized Composer 2.5 subagents (SQL pipeline, inbox, DataCollector, R10 config, tests) orchestrated in parallel SME → merge → doc-writer phases; cut full documentation regeneration cost 87% ($40 → ~$5) while preserving code-verified accuracy across 3 deliverables.",
            "Designed and implemented a 3-stage T-SQL data integration pipeline (JSON parsing → deduplication → Account sync) with atomic transaction semantics and microsecond-precision batch IDs to safely process SAP Fieldglass worker records into a 1M+ row table in the enterprise identity management system.",
            "Reduced pipeline execution time by 69.2% (13 min → 4 min for 50K records) by implementing HASHBYTES-based change detection across 68 columns, a single-scan caching pattern on a 1M+ row table, and targeted temp table indexing to eliminate redundant I/O.",
            "Engineered a 5-level cross-worker deduplication algorithm with custom priority ranking across Access Type, Assignment Status, and Worker Completeness to consolidate multiple work assignments per worker into a single winner record, and also error mitigation LogonName conflict detection within batches and against 1M+ existing accounts.",
            "Implemented the SAP Fieldglass worker inventory using our internal tool, DataCollector, including attribute mapping and inventory strategy design. Delivered cross-tenant and multi-environment deployments (Dev, UAT, UAT2, Prod), enabling reliable and scalable client data integration.",
            "Refactored common classes and utilities into a centralized common_utils library, reducing code duplication and standardizing functionality across Python microservices. Implemented an automated CI testing pipeline to improve code reliability."
          ],
          skills: ["Python", "FastAPI", "T-SQL", "C# / .NET", "SCIM", "Multi-Agent AI", "Data Pipelines", "CI/CD"]
        },
        {
          title: "EmpowerID IAM Engineer",
          startDate: "Jul 2024",
          endDate: "Dec 2024",
          location: "Dublin, Ohio, United States",
          bullets: [
            "Optimized the Group Inventory and Export modules of the Universal Flat File Connector for a client-facing project, enabling seamless integration between a banking client's systems and the C# based IAM software using flat files.",
            "Enhanced the ODBC connector in a Python FastAPI based internal project, implementing security improvements that strengthened defenses against SQL injection attacks and increased overall system robustness.",
            "Achieved Certified EmpowerID Identity Orchestration Developer and Certified EmpowerID Operator certifications, demonstrating a solid foundation in Identity and Access Management."
          ],
          skills: ["C#", "Python", "FastAPI", "ODBC", "SQL Security", "IAM"]
        }
      ]
    },
    {
      company: "Arizona State University",
      companyUrl: "https://www.linkedin.com/school/arizona-state-university",
      industry: "Higher Education",
      title: "Graduate Services Assistant - Instructional Assistant",
      location: "Tempe, Arizona, United States",
      startDate: "Apr 2023",
      endDate: "May 2024",
      bullets: [
        "Assisted in the grading process, including coordinating grading efforts and resolving routine grading inquiries for the SER 232 Fall course.",
        "Provided instructional support by engaging with students, addressing their questions, and fostering a conducive learning environment.",
        "Collaborated with a grading team of two members to review assignments and quizzes for 66 students in SER 232 Computer Systems Fundamentals."
      ],
      skills: ["SER 232", "Computer Systems Fundamentals", "Instructional Support", "Grading & Assessment"],
      roles: [
        {
          title: "Graduate Services Assistant - Instructional Assistant",
          startDate: "Aug 2023",
          endDate: "May 2024",
          location: "Tempe, Arizona, United States",
          bullets: [
            "Assisted in the grading process, including coordinating grading efforts and resolving routine grading inquiries for the SER 232 Fall course.",
            "Escalated complex issues to the faculty supervisor or Instructional Oversight Representative (IOR).",
            "Provided instructional support by engaging with students, addressing their questions, and fostering a conducive learning environment.",
            "Collaborated with faculty supervisor/IOR to handle various tasks such as resolving grading concerns and contributing to the smooth functioning of the instructional process."
          ],
          skills: ["Instructional Support", "SER 232", "Student Mentorship"]
        },
        {
          title: "Graduate Services Assistant - Grader",
          startDate: "Aug 2023",
          endDate: "May 2024",
          location: "Tempe, Arizona, United States",
          bullets: [
            "Supported testing and grading for the SER 232 Fall course, aiding the professor in various tasks.",
            "Evaluated and graded assignments, homework, lecture activities, quizzes, and exams, providing timely feedback to students.",
            "Monitored online platforms and requested removal of unauthorized materials like assignments and exams on platforms such as Chegg, Course Hero, etc.",
            "Applied grading templates to assess accuracy and completeness of short answer and essay responses, and collaborated with the Instructor to accurately record and manage student grades."
          ],
          skills: ["Assessment", "Academic Integrity", "SER 232"]
        },
        {
          title: "Graduate Services Assistant GR1",
          startDate: "May 2023",
          endDate: "Jul 2023",
          location: "Tempe, Arizona, United States",
          bullets: [
            "Summer Grader for SER 232 Computer Systems Fundamentals - Session C.",
            "Collaborated with a grading team of two members to review assignments and quizzes for 66 students, ensuring adherence to the provided rubric and maintaining consistent grading standards.",
            "Implemented a comprehensive regrading process to address inaccuracies caused by the auto grader, resulting in fair assessment and accurate grading of student submissions."
          ],
          skills: ["Auto-Grader Debugging", "Computer Systems Fundamentals"]
        },
        {
          title: "Parking Assistant Student Worker III",
          startDate: "Apr 2023",
          endDate: "Aug 2023",
          location: "Tempe, Arizona, United States",
          bullets: [
            "Proactively addressed gate machine malfunctions at the parking facility, ensuring uninterrupted operations, inspecting machines, and reporting issues to dispatch for prompt resolution.",
            "Provided customer service at the gates, assisting parking facility users."
          ]
        }
      ]
    },
    {
      company: "Persistent Systems",
      companyUrl: "https://www.linkedin.com/company/persistent-systems",
      industry: "IT Services and IT Consulting",
      title: "Software Engineer",
      location: "Pune, Maharashtra, India",
      startDate: "Jan 2021",
      endDate: "Jul 2022",
      bullets: [
        "Spearheaded the development of a configuration management microservice for an Escrow Payment System, consisting of 13 REST APIs and leveraging Spring Boot, Hibernate, and PostgreSQL that made the existing system scalable.",
        "Revamped the front-end interface of the configuration service using React.js and React-d3-tree, resulting in a high-quality user experience and aesthetic enhancement.",
        "Mentored and led a team of 5 creative interns through the redesign and development of a vault management front-end using React.js, overseeing project setup, design, and issue resolution.",
        "Conducted 7 technical interviews for Java, Spring Boot, and React JS roles, both internal and external."
      ],
      skills: ["Java", "Spring Boot", "PostgreSQL", "Hibernate", "React.js", "REST APIs", "Team Leadership"],
      roles: [
        {
          title: "Software Engineer",
          startDate: "Jan 2021",
          endDate: "Jul 2022",
          location: "Pune, Maharashtra, India",
          bullets: [
            "Spearheaded the development of a configuration management microservice for an Escrow Payment System, consisting of 13 REST APIs and leveraging Spring Boot, Hibernate, and PostgreSQL that made the existing system scalable.",
            "Revamped the front-end interface of the configuration service using React.js and React-d3-tree, resulting in a high-quality user experience and aesthetic enhancement.",
            "Mentored and led a team of 5 creative interns through the redesign and development of a vault management front-end using React.js, overseeing project setup, design, and issue resolution.",
            "Conducted 7 technical interviews for Java, Spring Boot, and React JS roles, both internal and external."
          ],
          skills: ["Java", "Spring Boot", "PostgreSQL", "Hibernate", "React.js", "REST APIs", "Team Leadership"]
        }
      ]
    },
    {
      company: "Mithi Software Technologies",
      companyUrl: "https://www.linkedin.com/company/mithi",
      industry: "IT Services and IT Consulting",
      title: "Trainee Software Engineer",
      location: "Pune, Maharashtra, India",
      startDate: "Jan 2020",
      endDate: "Jan 2021",
      bullets: [
        "Enhanced the salted hash-based login system that was initiated during my internship.",
        "Designed and implemented a secure login system using RSA encryption.",
        "Identified and remediated 5 security bugs to enhance system security.",
        "Implemented salted hashing authentication for the Roundcube login system using PHP to enhance security and add a second layer of protection to Skyconnect."
      ],
      skills: ["RSA Encryption", "Authentication Security", "PHP", "Docker", "Jenkins", "Linux", "Bash"],
      roles: [
        {
          title: "Trainee Software Engineer",
          startDate: "Jun 2020",
          endDate: "Jan 2021",
          location: "Pune, Maharashtra, India",
          bullets: [
            "Enhanced the salted hash-based login system that was initiated during my internship.",
            "Designed and implemented a secure login system using RSA encryption.",
            "Identified and remediated 5 security bugs to enhance system security."
          ],
          skills: ["RSA Encryption", "Application Security", "Authentication"]
        },
        {
          title: "Trainee Software Engineer (Intern)",
          startDate: "Jan 2020",
          endDate: "Jun 2020",
          location: "Pune, Maharashtra, India",
          bullets: [
            "Implemented salted hashing authentication for the Roundcube login system using PHP to enhance security and add a second layer of protection to Skyconnect.",
            "Demonstrated proficiency in SDLC processes, writing clean and maintainable production code, and working with tools such as Jenkins, Docker, Linux, Bash, and cloud technologies."
          ],
          skills: ["PHP", "Salted Hashing", "Docker", "Jenkins", "Linux", "Bash"]
        }
      ]
    },
    {
      company: "Apace Apparels and Equipment Pvt. Ltd.",
      companyUrl: "https://www.linkedin.com/company/keepapace",
      industry: "Cycling · Triathlon · Activewear",
      title: "Intern - Full-Stack Developer",
      location: "Pune, Maharashtra, India",
      startDate: "Jun 2019",
      endDate: "Jul 2019",
      bullets: [
        "Modernized an inventory management system by transitioning from Google Sheets to a secure web application built with Vue.js, PHP, and MySQL.",
        "Improved data privacy and system scalability by separating the inventory data from its presentation layer, resulting in enhanced performance and usability."
      ],
      skills: ["Vue.js", "PHP", "MySQL", "Full-Stack Development"],
      roles: [
        {
          title: "Intern - Full-Stack Developer",
          startDate: "Jun 2019",
          endDate: "Jul 2019",
          location: "Pune, Maharashtra, India",
          bullets: [
            "Modernized an inventory management system by transitioning from Google Sheets to a secure web application built with Vue.js, PHP, and MySQL.",
            "Improved data privacy and system scalability by separating the inventory data from its presentation layer, resulting in enhanced performance and usability."
          ],
          skills: ["Vue.js", "PHP", "MySQL"]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Cycle Safe",
      subtitle: "Cross-Platform Mobile Application & Cyclist Proximity System",
      period: "Jan 2024 – Apr 2024",
      association: "Arizona State University · University of Arizona · Rob Dollar Foundation",
      badge: "Featured Innovation Showcase Project",
      featured: true,
      description:
        "Developed CycleSafe, a cross-platform mobile application that connects to a handlebar-mounted device to enhance cyclist safety by detecting the proximity of vehicles and capturing license plate images.",
      highlights: [
        "Addressed the safety issue of over 130,000 annual cyclist injuries in the U.S. caused by car accidents, targeting enforcement of Arizona's law requiring vehicles to maintain a 3-foot distance from cyclists.",
        "Developed a complementary smartphone app for Android and iOS, enabling Wi-Fi connectivity with the CycleSafe device to facilitate image transfer, display, and analysis.",
        "Implemented automatic license plate recognition and optimal image selection in the app in partnership with the University of Arizona and the Rob Dollar Foundation."
      ],
      tags: ["iOS & Android", "Wi-Fi Connectivity", "License Plate Recognition", "Mobile Development"],
      link: "https://www.linkedin.com/posts/rhishabh-hattarki_our-capstone-project-cycle-safe-was-presented-activity-7190122897691029506-09_w",
      linkLabel: "Innovation Showcase Post"
    },
    {
      title: "Real Time Intrusion Detection System for IoT Networks using Random Forest",
      subtitle: "Full-Stack IoT Security Platform & ML Classifier",
      period: "Mar 2019 – Jun 2020",
      association: "Savitribai Phule Pune University",
      badge: "IEEE Published · 1st Prize Techno Spark",
      featured: true,
      description:
        "Led a team of 4 to build a full-stack web application created with a React front end and Django back end that detected 5 cyber attacks performed in a dummy IoT network.",
      highlights: [
        "Set up the IoT network consisting of a node (Arduino UNO, NodeMCU, Ultrasonic sensor) and an Apache server.",
        "Integrated WebSockets for real-time communication between the Apache server and Django backend capable of handling 10,000+ records.",
        "Built a Random Forest machine learning core in the backend to detect cyber attacks on live IoT node traffic and notify users in real time."
      ],
      tags: ["React", "Django", "Random Forest ML", "WebSockets", "Arduino / NodeMCU", "IoT Security"],
      link: "https://github.com/s3r-be/be-project",
      linkLabel: "GitHub Repository"
    },
    {
      title: "YouTube Video Data Analysis and Like Count Predictor",
      subtitle: "Machine Learning Desktop Application",
      period: "Jan 2019 – Jun 2019",
      association: "Academic Project",
      description:
        "Built a desktop machine learning tool for predicting YouTube video like counts trained on a dataset of ~200,000 videos.",
      highlights: [
        "Trained a Random Forest regression/prediction model on a large dataset of ~200,000 YouTube videos.",
        "Applied feature engineering, data cleaning, and feature selection pipelines to improve prediction accuracy.",
        "Built the interactive desktop application using Python 3.7, PyQt5, Pandas, NumPy, Scikit-learn, and Matplotlib."
      ],
      tags: ["Python", "Scikit-learn", "Random Forest", "Pandas", "NumPy", "PyQt5", "Matplotlib"],
      link: "https://github.com/rhish9h/Youtube-data-analysis-and-like-count-prediction",
      linkLabel: "GitHub Repository"
    },
    {
      title: "Apace Inventory Management System",
      subtitle: "Full-Stack Web ERP Application",
      period: "Jun 2019 – Jul 2019",
      association: "Apace Apparels and Equipment Pvt. Ltd.",
      description:
        "Mini ERP web application built to manage Masters, Orders, and Raw Material inventory workflows.",
      highlights: [
        "Transitioned company inventory operations from Google Sheets to a secure web application built with Vue.js, PHP, and MySQL.",
        "Separated inventory data storage from the presentation layer across Masters, Orders, and Materials modules."
      ],
      tags: ["Vue.js", "PHP", "MySQL", "JavaScript", "Bootstrap-Vue"],
      link: "https://github.com/rhish9h/apaceInventory",
      linkLabel: "GitHub Repository"
    }
  ],
  education: [
    {
      school: "Arizona State University",
      degree: "Master of Science - MS, Software Engineering",
      duration: "Aug 2022 – Apr 2024",
      location: "Tempe, Arizona, United States",
      highlights: [
        "Graduate Services Assistant (Instructional Assistant & Grader) for SER 232 Computer Systems Fundamentals",
        "Featured Project at the Polytechnic Innovation Showcase Spring 2024 (CycleSafe — only team selected from the Software Engineering department among 35+ teams)"
      ]
    },
    {
      school: "Savitribai Phule Pune University",
      degree: "Bachelor of Engineering - BE, Computer Engineering",
      duration: "2016 – 2020",
      location: "Pune, Maharashtra, India",
      highlights: [
        "Published 2 research papers on Intrusion Detection Systems in IoT Networks (IEEE I2CT 2021 & IERJ NCIET 2020)",
        "Won First Prize at Techno Spark 2020 and Best Poster Award at IEEE Conference ESCI 2020"
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
        description: "Service architecture, APIs, and enterprise integrations",
        skills: [
          "FastAPI",
          ".NET / C#",
          "Spring Boot",
          "Django",
          "REST APIs",
          "SCIM & ODBC Integrations",
          "Microservices",
          "WebSockets",
          "Hibernate"
        ]
      },
      {
        name: "Data Pipelines, Security & IAM",
        description: "Data ingestion, SQL optimization, and identity governance",
        skills: [
          "Data Ingestion & Sync Pipelines",
          "SQL Performance Optimization",
          "Identity & Access Management (IAM / IGA)",
          "RSA & Salted-Hash Authentication",
          "Random Forest / Scikit-learn"
        ]
      },
      {
        name: "Frontend, Cloud & Developer Tooling",
        description: "Web interfaces, cloud certifications, and engineering tools",
        skills: [
          "React.js",
          "Vue.js",
          "AWS (Certified Cloud Practitioner)",
          "Microsoft Azure (AZ-900)",
          "Docker",
          "Jenkins & CI/CD",
          "Linux",
          "Git",
          "Multi-Agent AI Workflows"
        ]
      }
    ],
    languages: [
      { name: "English", proficiency: "Full professional proficiency" },
      { name: "Marathi", proficiency: "Native or bilingual proficiency" },
      { name: "Hindi", proficiency: "Limited working proficiency" },
      { name: "Kannada", proficiency: "Elementary proficiency" }
    ]
  },
  certifications: [
    {
      name: "Certified EmpowerID Operator",
      issuer: "EmpowerID",
      date: "Issued Sep 2024",
      credentialId: "OPR2024-009"
    },
    {
      name: "Certified EmpowerID Identity Orchestration Developer",
      issuer: "EmpowerID",
      date: "Issued Aug 2024",
      credentialId: "DEV2024-006"
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "Issued Jun 2024",
      credentialId: "A93EDC54FB6111F0",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/RhishabhSuhasHattarki-3296/A93EDC54FB6111F0"
    },
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Issued Apr 2024 · Expires Apr 2027",
      credentialId: "a416d9b059364a468d56f0e5b40d0872",
      url: "https://www.credly.com/badges/b5c417f3-89d6-4221-886b-a2326e7f241f/linked_in_profile"
    }
  ],
  awards: [
    {
      title: "Featured Project - Polytechnic Innovation Showcase Spring 2024",
      issuer: "Arizona State University - The Polytechnic School",
      date: "Apr 2024",
      description:
        "Featured project at the Polytechnic Innovation Showcase Spring 2024. Only team picked to be featured from the Software Engineering department among 35+ teams including 250+ students."
    },
    {
      title: "First Prize Techno Spark 2020",
      issuer: "PCCoE&R",
      date: "May 2020",
      description:
        "Won the online state level project competition Techno Spark 2020 organized by PCCoE&R, where we presented our BE project 'Anomaly based intrusion detection system for IoT networks using Random Forest', competing against over 36 teams."
    },
    {
      title: "Best Poster IEEE Conference ESCI2020",
      issuer: "AISSMS IOIT",
      date: "Mar 2020",
      description:
        "Participated in the Poster Presentation Competition at the IEEE Conference ESCI2020 and won the Best Poster Award for 'Survey on anomaly based intrusion detection system for IoT networks'."
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
        "Presents a Real Time Intrusion Detection System based on the Random Forest machine learning model set up for an IoT node consisting of Arduino, NodeMCU, and an Ultrasonic sensor, tested with real-time network traffic monitored from our custom IoT network."
    },
    {
      title: "Survey on Anomaly-Based Intrusion Detection Systems in IoT Networks",
      conference: "International Engineering Research Journal (IERJ) · NCIET-2020",
      date: "2020",
      url: "http://www.ierjournal.org/pupload/NCIET-2020/154-159-converted.pdf",
      summary:
        "Discusses anomaly-based intrusion detection systems built for low-power IoT environments to detect newer unregistered attacks not filtered by firewalls, comparing methods, limitations, and an ensemble-based detection architecture."
    }
  ]
};
