import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { usePortfolio, Project } from '@/context/PortfolioContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectModal } from '@/components/ui/ProjectModal';

export function Projects() {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader title="Projects" subtitle="Featured Work" align="right" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group cursor-pointer",
                index === 0 ? "md:col-span-2" : ""
              )}
              onClick={() => setSelectedProject(project)}
            >
              <Card className="h-full flex flex-col hover:bg-card/80 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="flex items-center text-white/40 text-xs font-mono">
                    <Clock className="w-3 h-3 mr-1" />
                    {project.duration}
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h3>

                <p className="text-white/60 mb-6 flex-grow leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <Badge key={i} className="bg-white/5 hover:bg-white/10">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
