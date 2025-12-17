import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { usePortfolio } from '@/context/PortfolioContext';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export function Education() {
  const { education } = usePortfolio();
  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader title="Academic Background" subtitle="Education & Certifications" align="right" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col items-center text-center p-8 hover:bg-card/50 transition-colors group">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(204,255,0,0.2)]">
                  <GraduationCap className="w-8 h-8 text-white/70 group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  {edu.school}
                </h3>
                
                <span className="text-primary font-mono text-xs mb-4 block">
                  {edu.period}
                </span>
                
                <p className="text-white/60 text-sm leading-relaxed">
                  {edu.degree}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
