import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export const personalInfo = {
  name: "AYOUB MZARI",
  title: "Full-Stack Developer",
  contact: {
    phone: "+212682282716",
    email: "ayoub.mzari@uit.ac.ma",
    location: "Wifak, Temara",
  },
  socials: [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:ayoub.mzari@uit.ac.ma",
    },
    {
      name: "Phone",
      icon: Phone,
      href: "tel:+212682282716",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/ayouubmzariiii",
    },
    {
      name: "Location",
      icon: MapPin,
      href: "#",
    }
  ]
};

export const experience = [
  {
    company: "SecureValley Training Center",
    role: "Full-Stack Developer",
    period: "2025 – present",
    description: [
      "Design and implementation of internal tools.",
      "Optimization of performance and SEO for the company’s projects.",
      "Hosting and administration of a local server for internal needs.",
    ],
  },
  {
    company: "Golden Park",
    role: "Web Developer",
    period: "2023 – 2025",
    description: [
      "Development of websites, plugins, and customizations based on client needs.",
      "Development of over 20 custom e-commerce websites with advanced features.",
      "Hosting applications on AWS, integrating Amazon Polly, and performing cloud optimization.",
      "Managing website migrations and DNS configuration for complex integrations.",
    ],
  },
];

export const projects = [
  {
    title: "Agenteo — AI Voice Assistant",
    duration: "3 months",
    category: "AI / Voice",
    description:
      "Intelligent voice assistant capable of answering customer calls, handling inquiries, checking availability, and managing reservations for restaurants, barbershops, clinics, and other service businesses. Utilizes speech recognition, text-to-speech, SIP routing, and telephony infrastructure.",
    tech: ["AI", "SIP", "Speech Recognition", "Telephony"],
  },
  {
    title: "LinkSphere — Automated PBN SEO",
    duration: "2 weeks",
    category: "SEO / Automation",
    description:
      "Automated private blog network (PBN) system that creates and manages interconnected websites to generate high-quality backlinks and optimize SEO for target websites. Manages domains, content publication, and link placement.",
    tech: ["SEO", "Automation", "Backlinks", "Domain Mgmt"],
  },
  {
    title: "Risk Vision — AI Risk Management",
    duration: "1 month",
    category: "AI / SaaS",
    description:
      "Developed during the Bolt Hackathon, this AI-powered risk management platform identifies potential project risks, suggests solutions, and integrates task tracking. Built with Bolt for workflow orchestration, ReactJS for UI, and Supabase for real-time data.",
    tech: ["ReactJS", "Supabase", "Bolt", "AI"],
  },
  {
    title: "MyFeedPro — SaaS for NFC Cards",
    duration: "1 month",
    category: "SaaS / IoT",
    description:
      "SaaS platform enabling clients to create full profiles and receive NFC cards that redirect to their online profile. Features a homepage, user dashboard, admin dashboard, and profile pages. Facilitates centralized management of client data.",
    tech: ["SaaS", "NFC", "Dashboard", "Full Stack"],
  },
  {
    title: "Dynamic Portfolio CMS",
    duration: "Ongoing",
    category: "Web / Open Source",
    description:
      "A fully customizable, white-label portfolio CMS built with React, TypeScript, and Tailwind CSS. Features a comprehensive admin dashboard for managing projects, experience, skills, and education without code changes. Includes dynamic theming, local persistence, and a responsive modern UI.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Context API"],
    repoUrl: "https://github.com/ayouubmzariiii/Portfolio"
  },
];

export const education = [
  {
    school: "EST Kénitra",
    period: "2022–2023",
    degree: "Professional Bachelor’s Degree in Computer Engineering and Digital Governance",
  },
  {
    school: "3W ACADEMY",
    period: "2021–2021",
    degree: "Training and certification in WordPress development",
  },
  {
    school: "ISTA NTIC",
    period: "2020–2022",
    degree: "Specialized Technician in Software Development",
  },
];

export const skills = {
  "Cloud Computing": ["VPS", "AWS", "DNS", "Server Migrations", "ESXi"],
  "Web Development": [
    "HTML/CSS/JS",
    "PHP",
    "jQuery",
    "Spring Boot",
    "Bootstrap",
    "Angular",
    "React",
    "Node.js",
    "WordPress",
  ],
  "Software Development": ["Python", "Java", "Dart"],
  "Mobile Development": ["Flutter", "Android"],
  "Databases": ["Oracle SQL", "PL/SQL"],
  "Analysis & Management": ["UML", "XML", "Design Patterns"],
  "Other": ["Debugging", "Technical Research", "Fortigate"],
};
