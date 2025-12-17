import React, { createContext, useContext, useState, useEffect } from 'react';
import { experience as initialExperience, projects as initialProjects, personalInfo as initialPersonalInfo, skills as initialSkills, education as initialEducation } from '@/data/portfolio';
import { Mail, Phone, Github, MapPin, Globe, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

// Icon mapping for rehydration
const ICON_MAP: Record<string, any> = {
  'Email': Mail,
  'Phone': Phone,
  'GitHub': Github,
  'Location': MapPin,
  'LinkedIn': Linkedin,
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

  const login = (password: string) => {
    if (password === 'admin123') {
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
