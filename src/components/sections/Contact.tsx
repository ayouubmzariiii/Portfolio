import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePortfolio } from '@/context/PortfolioContext';
import { motion } from 'framer-motion';
import { Send, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const { personalInfo } = usePortfolio();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <SectionHeader title="Contact" subtitle="Get In Touch" align="center" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              Let's work together
            </h3>
            <p className="text-white/60 mb-8">
              I'm currently available for freelance projects and full-time opportunities.
              If you have a project that needs some creative touch, let's connect.
            </p>

            <div className="space-y-4">
              {personalInfo.socials.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <Card className="p-4 flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer" onClick={() => item.href !== '#' && window.open(item.href, '_blank')}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 font-mono uppercase tracking-wider">{item.name}</p>
                        <p className="text-white font-medium">
                          {item.name === 'Email' 
                            ? personalInfo.contact.email 
                            : item.name === 'Phone' 
                              ? personalInfo.contact.phone 
                              : item.name === 'GitHub'
                                ? personalInfo.name
                                : personalInfo.contact.location}
                        </p>
                      </div>
                    </div>
                    {item.name !== 'GitHub' && item.href !== '#' && (
                        <button 
                          className="text-white/30 hover:text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item.name === 'Email' ? personalInfo.contact.email : personalInfo.contact.phone, item.name);
                          }}
                        >
                          {copied === item.name ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                        </button>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-white/50">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-background/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-white/50">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-background/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-white/50">Subject</label>
                <input 
                  type="text" 
                  className="w-full bg-background/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-white/50">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-background/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
