import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { usePortfolio } from '@/context/PortfolioContext';
import { motion } from 'framer-motion';

export function Experience() {
  const { experience } = usePortfolio();
  return (
    <section id="experience" className="py-24 bg-card/30 relative overflow-hidden">
       {/* Decorative BG */}
       <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title="Experience" subtitle="My Professional Journey" />

        <div className="relative mt-16">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 h-full w-px bg-white/10 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 w-full pl-12 md:pl-0">
                  <Card className="h-full hover:-translate-y-2 transition-transform duration-300 group border-l-4 border-l-primary/50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors font-display tracking-wide">
                          {job.company}
                        </h3>
                        <p className="text-primary/80 font-mono text-sm">{job.role}</p>
                      </div>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-white/50 border border-white/5">
                        {job.period}
                      </span>
                    </div>
                    <ul className="space-y-2 text-white/60 text-sm">
                      {job.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 shadow-[0_0_5px_rgba(204,255,0,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center rounded-full bg-background border border-primary shadow-[0_0_10px_rgba(204,255,0,0.5)] z-10 mt-1 md:mt-0">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
