import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeader({ title, subtitle, className, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", 
      align === 'center' ? 'text-center flex flex-col items-center' : '',
      align === 'right' ? 'text-right flex flex-col items-end' : '',
      className
    )}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-white"
      >
        {title} <span className="text-primary text-glow">.</span>
      </motion.h2>
      {subtitle && (
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(204,255,0,0.8)]" 
        />
      )}
    </div>
  );
}
