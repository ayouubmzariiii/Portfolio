import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { usePortfolio } from '@/context/PortfolioContext';
import { motion } from 'framer-motion';

export function Skills() {
  const { skills } = usePortfolio();
  return (
    <section id="skills" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <SectionHeader title="Technical Competency" subtitle="Skills & Expertise" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-primary/30">
                <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center">
                  <span className="w-1.5 h-6 bg-primary mr-3 rounded-full shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <Badge 
                      key={i} 
                      className="text-sm py-1 px-3 bg-white/5 border-white/10 hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
