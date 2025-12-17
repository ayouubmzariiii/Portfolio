import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Play } from 'lucide-react';
import { Project } from '@/context/PortfolioContext';
import { Button } from './Button';
import { Badge } from './Badge';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-primary hover:text-black rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Header / Media Section */}
              <div className="w-full aspect-video bg-black relative overflow-hidden group">
                {project.video ? (
                   <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                     <span className="text-gray-500">Video Player Placeholder for {project.video}</span>
                   </div>
                ) : project.images && project.images.length > 0 ? (
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                     <h3 className="text-3xl font-display text-white/10">{project.title}</h3>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-display text-white mb-2">{project.title}</h2>
                    <div className="flex flex-wrap gap-2 text-sm text-secondary">
                      <span>{project.category}</span>
                      <span>•</span>
                      <span>{project.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" className="flex items-center gap-2">
                          <ExternalLink size={16} /> Live Demo
                        </Button>
                      </a>
                    )}
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Github size={16} /> Code
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">About the Project</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>

                {project.images && project.images.length > 1 && (
                  <div className="space-y-4">
                     <h3 className="text-lg font-bold text-white">Gallery</h3>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {project.images.slice(1).map((img, idx) => (
                         <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-white/10">
                           <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                         </div>
                       ))}
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
