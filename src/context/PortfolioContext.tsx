import React, { createContext, useContext, useState, useEffect } from 'react';
import { experience as initialExperience, projects as initialProjects, personalInfo as initialPersonalInfo, skills as initialSkills, education as initialEducation } from '@/data/portfolio';
import { Mail, Phone, Github, MapPin, Globe, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const LinkedInFilled = ({ size = 24, className = "" }: { size?: number | string, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Icon mapping for rehydration
const ICON_MAP: Record<string, any> = {
  'Email': Mail,
  'Phone': Phone,
  'GitHub': Github,
  'Location': MapPin,
  'LinkedIn': LinkedInFilled,
  'Website': Globe,
  'Twitter': Twitter,
  'Facebook': Facebook,
  'Instagram': Instagram
};

// Define types
export interface Project {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  tech: string[];
  images?: string[];
  video?: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  contact: {
    phone: string;
    email: string;
    location: string;
  };
  socials: {
    name: string;
    icon: any; // We'll handle icons dynamically or simplify for now
    href: string;
  }[];
}

export interface Theme {
  primary: string;
  background: string;
  card: string;
  secondary: string;
}

interface PortfolioContextType {
  projects: Project[];
  experience: Experience[];
  personalInfo: typeof initialPersonalInfo;
  skills: typeof initialSkills;
  education: typeof initialEducation;
  theme: Theme;
  resumeUrl: string;
  
  updateResume: (url: string) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updatePersonalInfo: (info: typeof initialPersonalInfo) => void;
  updateSkills: (skills: typeof initialSkills) => void;
  updateEducation: (education: typeof initialEducation) => void;
  updateTheme: (theme: Theme) => void;
  updatePassword: (password: string) => void;
  
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Default Theme
const defaultTheme: Theme = {
  primary: '#CCFF00',
  background: '#050505',
  card: '#1A1A1A',
  secondary: '#888888',
};

// Add IDs to initial data if missing
const normalizeProjects = (projects: any[]): Project[] => {
  return projects.map((p, i) => ({
    ...p,
    id: p.id || `proj-${i}-${Date.now()}`,
    images: p.images || [],
  }));
};

const normalizeExperience = (exp: any[]): Experience[] => {
  return exp.map((e, i) => ({
    ...e,
    id: e.id || `exp-${i}-${Date.now()}`,
  }));
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- STATE ---
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    const baseProjects = saved ? JSON.parse(saved) : normalizeProjects(initialProjects);

    // Migration: Add Portfolio CMS if missing
    const hasPortfolioCMS = baseProjects.some((p: Project) => p.title.includes('Dynamic Portfolio CMS'));
    if (!hasPortfolioCMS) {
       const cmsProject = initialProjects.find(p => p.title.includes('Dynamic Portfolio CMS'));
       if (cmsProject) {
         baseProjects.push({
           ...cmsProject,
           id: `proj-cms-${Date.now()}`
         });
       }
    }
    return baseProjects;
  });

  const [experience, setExperience] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('portfolio_experience');
    const baseExperience = saved ? JSON.parse(saved) : normalizeExperience(initialExperience);
    
    // Legacy migration for Upwork if needed
    const hasUpwork = baseExperience.some((e: Experience) => e.company.includes('Upwork'));
    if (!hasUpwork && !saved) {
       baseExperience.unshift({
        id: 'exp-upwork',
        company: 'Upwork',
        role: 'Freelance WordPress & Full Stack Developer',
        period: '2023 – present',
        description: [
          'Completed 1 contract with 5-star rating.',
          'Currently working on an active long-term contract.',
          'Delivering custom WordPress solutions and full-stack web applications.'
        ]
       });
    }
    return baseExperience;
  });

  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem('portfolio_personalInfo');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Migration: Add LinkedIn if missing
        if (parsed.socials && !parsed.socials.some((s: any) => s.name === 'LinkedIn')) {
          parsed.socials.splice(parsed.socials.length - 1, 0, { // Insert before Location
             name: "LinkedIn",
             href: "https://www.linkedin.com/in/ayoub-mzari/",
             // Icon will be handled by rehydration below
          });
        }

        // Rehydrate icons
        if (parsed.socials && Array.isArray(parsed.socials)) {
          parsed.socials = parsed.socials.map((s: any) => ({
            ...s,
            icon: ICON_MAP[s.name] || Mail // Fallback to Mail if icon not found
          }));
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse saved personal info", e);
        return initialPersonalInfo;
      }
    }
    return initialPersonalInfo;
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('portfolio_skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [education, setEducation] = useState(() => {
    const saved = localStorage.getItem('portfolio_education');
    return saved ? JSON.parse(saved) : initialEducation;
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  const [resumeUrl, setResumeUrl] = useState(() => {
    return localStorage.getItem('portfolio_resume') || '/resume.pdf';
  });

  const [password, setPassword] = useState(() => {
    return localStorage.getItem('portfolio_password') || 'admin123';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('portfolio_auth') === 'true';
  });

  // --- EFFECTS ---
  useEffect(() => { localStorage.setItem('portfolio_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('portfolio_experience', JSON.stringify(experience)); }, [experience]);
  useEffect(() => { localStorage.setItem('portfolio_personalInfo', JSON.stringify(personalInfo)); }, [personalInfo]);
  useEffect(() => { localStorage.setItem('portfolio_skills', JSON.stringify(skills)); }, [skills]);
  useEffect(() => { localStorage.setItem('portfolio_education', JSON.stringify(education)); }, [education]);
  useEffect(() => { localStorage.setItem('portfolio_resume', resumeUrl); }, [resumeUrl]);
  useEffect(() => { localStorage.setItem('portfolio_password', password); }, [password]);
  
  // Theme Effect
  useEffect(() => {
    localStorage.setItem('portfolio_theme', JSON.stringify(theme));
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-card', theme.card);
    root.style.setProperty('--color-secondary', theme.secondary);
  }, [theme]);

  // --- UPDATERS ---
  const updateProjects = (newProjects: Project[]) => setProjects(newProjects);
  const updateExperience = (newExperience: Experience[]) => setExperience(newExperience);
  const updatePersonalInfo = (info: typeof initialPersonalInfo) => setPersonalInfo(info);
  const updateSkills = (newSkills: typeof initialSkills) => setSkills(newSkills);
  const updateEducation = (newEducation: typeof initialEducation) => setEducation(newEducation);
  const updateTheme = (newTheme: Theme) => setTheme(newTheme);
  const updateResume = (url: string) => setResumeUrl(url);
  const updatePassword = (newPassword: string) => setPassword(newPassword);

  const login = (inputPassword: string) => {
    if (inputPassword === password) {
      setIsAuthenticated(true);
      localStorage.setItem('portfolio_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('portfolio_auth');
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        experience,
        personalInfo,
        skills,
        education,
        theme,
        resumeUrl,
        updateProjects,
        updateExperience,
        updatePersonalInfo,
        updateSkills,
        updateEducation,
        updateTheme,
        updateResume,
        updatePassword,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
