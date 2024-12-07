export interface Experience {
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  date?: string;
}

export interface Publication {
  title: string;
  conference?: string;
  date?: string;
}

export interface Award {
  title: string;
  issuer?: string;
  date?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  email: string;
  linkedIn: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: {
    technical: string[];
    languages: string[];
  };
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
}

export const profileData: ProfileData = {
  name: "Rhishabh Hattarki",
  title: "Software Engineer",
  tagline: "Software Engineer | Lifelong Learner | Technology Enthusiast",
  email: "rhish9h@gmail.com",
  linkedIn: "https://www.linkedin.com/in/rhishabh-hattarki",
  summary: `"I’m a builder of solutions, driven by a relentless curiosity to turn complex challenges into impactful innovations."

At EmpowerID, I thrive at the intersection of cybersecurity and software engineering, creating seamless, secure solutions in Identity and Access Management (IAM) and Identity Governance and Administration (IGA). It’s not just about code—it’s about crafting systems that safeguard identities and enable organizations to thrive. Every project pushes me to think deeper, design smarter, and make an impact that matters.

One project that exemplifies my drive for innovation is CycleSafe, a mobile app that enhances cyclist safety. Partnering with the University of Arizona and the Rob Dollar Foundation, we created a solution that connects to a handlebar-mounted device, detects approaching vehicles, captures license plates, and enforces Arizona’s three-foot passing law. The result? Safer roads and empowered cyclists. It was more than a technical achievement—it was a mission to make a difference.

What excites me most is what’s ahead. We’re living in an era where AI, autonomous systems, and generative technologies are reshaping industries. I’m inspired to be part of this transformation—leveraging innovation to solve meaningful problems, connect people, and drive progress. Let’s connect and explore what we can build together.`,
  experiences: [
    {
      company: "EmpowerID",
      title: "EmpowerID IAM Engineer",
      location: "Dublin, Ohio, United States",
      startDate: "July 2024",
      endDate: "Present",
      bullets: [
        "Optimized Group Inventory and Export modules for a banking client's integration.",
        "Enhanced ODBC connector security in a Python FastAPI project.",
        "Achieved certifications as EmpowerID Identity Orchestration Developer and Operator."
      ]
    },
    {
      company: "Arizona State University",
      title: "Graduate Services Assistant - Instructional Assistant",
      startDate: "Aug 2023",
      endDate: "May 2024",
      bullets: [
        "Assisted grading for SER 232 Fall course and supported students' learning.",
        "Handled grading concerns and escalated complex issues to supervisors."
      ]
    },
    {
      company: "Arizona State University",
      title: "Graduate Services Assistant - Grader",
      startDate: "May 2023",
      endDate: "July 2023",
      bullets: [
        "Graded assignments for 66 students in SER 232 and resolved auto-grader issues."
      ]
    },
    {
      company: "Arizona State University",
      title: "Parking Assistant Student Worker III",
      startDate: "April 2023",
      endDate: "August 2023",
      bullets: [
        "Maintained parking operations, addressing machine malfunctions and assisting users."
      ]
    },
    {
      company: "Persistent Systems",
      title: "Software Engineer",
      startDate: "January 2021",
      endDate: "July 2022",
      bullets: [
        "Developed a scalable configuration management microservice with Spring Boot.",
        "Led a front-end redesign team and mentored interns."
      ]
    },
    {
      company: "Mithi Software Technologies",
      title: "Trainee Software Engineer",
      startDate: "June 2020",
      endDate: "January 2021",
      bullets: [
        "Enhanced system security by implementing RSA encryption for login systems."
      ]
    },
    {
      company: "Mithi Software Technologies",
      title: "Intern - Trainee Software Engineer",
      startDate: "January 2020",
      endDate: "June 2020",
      bullets: [
        "Implemented salted hashing authentication for secure login systems."
      ]
    },
    {
      company: "Apace Apparels and Equipment Pvt. Ltd.",
      title: "Intern - Full-Stack Developer",
      startDate: "June 2019",
      endDate: "July 2019",
      bullets: [
        "Built a web-based inventory management system using Vue.js, PHP, and MySQL."
      ]
    }
  ],
  education: [
    {
      school: "Arizona State University",
      degree: "MS in Software Engineering",
      duration: "August 2022 – April 2024"
    },
    {
      school: "Savitribai Phule Pune University",
      degree: "BE in Computer Engineering",
      duration: "2016 – 2020"
    }
  ],
  skills: {
    technical: [
      "Full-Stack Development",
      "Identity and Access Management (IAM)",
      "Python"
    ],
    languages: [
      "Marathi (Native)",
      "Hindi (Limited Working)",
      "English (Full Professional)",
      "Kannada (Elementary)"
    ]
  },
  certifications: [
    {
      name: "Certified EmpowerID Identity Orchestration Developer"
    },
    {
      name: "Microsoft Certified: Azure Fundamentals"
    },
    {
      name: "Certified EmpowerID Operator"
    },
    {
      name: "AWS Certified Cloud Practitioner"
    }
  ],
  awards: [
    {
      title: "Best Poster IEEE Conference ESCI2020"
    },
    {
      title: "First Prize Techno Spark 2020"
    },
    {
      title: "Featured Project - Polytechnic Innovation Showcase Spring 2024"
    }
  ],
  publications: [
    {
      title: "Survey on Anomaly-Based Intrusion Detection Systems in IoT Networks"
    },
    {
      title: "Real-Time Intrusion Detection System for IoT Networks"
    }
  ]
};
