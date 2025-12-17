import { usePortfolio } from '@/context/PortfolioContext';
import { Github } from 'lucide-react';

export function Footer() {
  const { personalInfo } = usePortfolio();
  return (
    <footer className="bg-card py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-display font-bold text-white">
            {personalInfo.name}
          </h3>
          <p className="text-white/50 text-sm mt-1">
            {personalInfo.title}
          </p>
        </div>

        <a 
          href="https://github.com/ayouubmzariiii" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors"
        >
          <Github size={20} />
          <span className="font-mono text-sm">ayouubmzariiii</span>
        </a>
        
        <div className="text-white/30 text-xs">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
