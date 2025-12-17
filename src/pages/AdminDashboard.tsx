import { useState, useRef } from 'react';
import { usePortfolio, Project, Experience, Theme, PersonalInfo } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Edit2, Save, X, LogOut, Upload, Image as ImageIcon, Video, FileText, User, Settings, Code, GraduationCap, Lock } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const AdminDashboard = () => {
  const { 
    projects, experience, personalInfo, skills, education, theme,
    updateProjects, updateExperience, updatePersonalInfo, updateSkills, updateEducation, updateTheme, updateResume, updatePassword,
    logout, resumeUrl 
  } = usePortfolio();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'skills' | 'education' | 'resume' | 'theme' | 'settings'>('profile');
  
  // Editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingEducation, setEditingEducation] = useState<any | null>(null);
  const [editingEducationIndex, setEditingEducationIndex] = useState<number>(-1);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Skills state
  const [newSkillCategory, setNewSkillCategory] = useState('');
  const [newSkillInput, setNewSkillInput] = useState<Record<string, string>>({});

  // Local state for profile and theme forms
  const [profileForm, setProfileForm] = useState<PersonalInfo>(personalInfo);
  const [themeForm, setThemeForm] = useState<Theme>(theme);
  const [passwordForm, setPasswordForm] = useState({ new: '', confirm: '' });

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Helper to convert file to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // --- Handlers ---

  // Skills Handlers
  const handleAddCategory = () => {
    if (newSkillCategory.trim() && !skills[newSkillCategory]) {
      updateSkills({ ...skills, [newSkillCategory]: [] });
      setNewSkillCategory('');
    }
  };

  const handleDeleteCategory = (category: string) => {
    if (confirm(`Are you sure you want to delete the "${category}" category?`)) {
      const newSkills = { ...skills };
      delete newSkills[category];
      updateSkills(newSkills);
    }
  };

  const handleAddSkill = (category: string) => {
    const val = newSkillInput[category];
    if (val && val.trim()) {
      updateSkills({
        ...skills,
        [category]: [...(skills[category] || []), val.trim()]
      });
      setNewSkillInput({ ...newSkillInput, [category]: '' });
    }
  };

  const handleDeleteSkill = (category: string, skill: string) => {
    updateSkills({
      ...skills,
      [category]: skills[category].filter(s => s !== skill)
    });
  };

  // Education Handlers
  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation) return;

    const newEducation = [...education];
    if (isAddingNew) {
      newEducation.unshift(editingEducation);
    } else if (editingEducationIndex >= 0) {
      newEducation[editingEducationIndex] = editingEducation;
    }
    
    updateEducation(newEducation);
    setEditingEducation(null);
    setEditingEducationIndex(-1);
    setIsAddingNew(false);
  };

  const handleDeleteEducation = (index: number) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
      const newEducation = [...education];
      newEducation.splice(index, 1);
      updateEducation(newEducation);
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    alert('Profile updated successfully!');
  };

  const handleThemeSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme(themeForm);
    alert('Theme updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new.length < 4) {
      alert('Password must be at least 4 characters long.');
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      alert('Passwords do not match!');
      return;
    }
    updatePassword(passwordForm.new);
    setPasswordForm({ new: '', confirm: '' });
    alert('Password updated successfully! Please login with your new password next time.');
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isAddingNew) {
      updateProjects([editingProject, ...projects]);
    } else {
      updateProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    }
    setEditingProject(null);
    setIsAddingNew(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      updateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && editingProject) {
      const files = Array.from(e.target.files);
      const newImages: string[] = [];
      let newVideo: string | undefined = undefined;

      await Promise.all(files.map(async (file) => {
        const base64 = await convertToBase64(file);
        if (file.type.startsWith('image/')) {
          newImages.push(base64);
        } else if (file.type.startsWith('video/')) {
          newVideo = base64; // Last video wins if multiple
        }
      }));

      setEditingProject((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          images: [...(prev.images || []), ...newImages],
          video: newVideo || prev.video
        }
      });
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    if (editingProject && editingProject.images) {
      setEditingProject({
        ...editingProject,
        images: editingProject.images.filter((_, index) => index !== indexToRemove)
      });
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      updateResume(base64);
      alert('Resume updated successfully!');
    }
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;

    if (isAddingNew) {
      updateExperience([editingExperience, ...experience]);
    } else {
      updateExperience(experience.map(exp => exp.id === editingExperience.id ? editingExperience : exp));
    }
    setEditingExperience(null);
    setIsAddingNew(false);
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      updateExperience(experience.filter(e => e.id !== id));
    }
  };

  // --- Render Helpers ---
  const TabButton = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => { 
        setActiveTab(id); 
        setEditingProject(null); 
        setEditingExperience(null); 
        setEditingEducation(null);
        setIsAddingNew(false);
        // Reset forms to current context state when switching tabs
        setProfileForm(personalInfo);
        setThemeForm(theme);
        setPasswordForm({ new: '', confirm: '' });
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        activeTab === id 
          ? 'bg-primary text-black font-bold' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={18} />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <SectionHeader title="Admin Dashboard" subtitle="Manage Content & Theme" />
        <Button variant="outline" onClick={logout} className="flex items-center gap-2">
          <LogOut size={16} /> Logout
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
        <TabButton id="profile" icon={User} label="Profile" />
        <TabButton id="projects" icon={Code} label="Projects" />
        <TabButton id="experience" icon={FileText} label="Experience" />
        <TabButton id="skills" icon={Code} label="Skills" />
        <TabButton id="education" icon={GraduationCap} label="Education" />
        <TabButton id="resume" icon={FileText} label="Resume" />
        <TabButton id="theme" icon={Settings} label="Theme" />
        <TabButton id="settings" icon={Lock} label="Settings" />
      </div>

      <div className="bg-card/50 border border-white/5 rounded-2xl p-6 min-h-[500px]">
        
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSave} className="space-y-6 max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-secondary">Full Name</label>
                <input 
                  value={profileForm.name}
                  onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-secondary">Job Title</label>
                <input 
                  value={profileForm.title}
                  onChange={e => setProfileForm({...profileForm, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-4">
              <h4 className="font-bold text-white">Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  placeholder="Phone"
                  value={profileForm.contact.phone}
                  onChange={e => setProfileForm({...profileForm, contact: {...profileForm.contact, phone: e.target.value}})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white"
                />
                <input 
                  placeholder="Email"
                  value={profileForm.contact.email}
                  onChange={e => setProfileForm({...profileForm, contact: {...profileForm.contact, email: e.target.value}})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white"
                />
                <input 
                  placeholder="Location"
                  value={profileForm.contact.location}
                  onChange={e => setProfileForm({...profileForm, contact: {...profileForm.contact, location: e.target.value}})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="mt-4">Save Profile</Button>
          </form>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {!editingProject && (
              <Button 
                variant="primary" 
                onClick={() => {
                  setEditingProject({
                    id: `new-${Date.now()}`,
                    title: '',
                    category: '',
                    duration: '',
                    description: '',
                    tech: [],
                    images: [],
                  });
                  setIsAddingNew(true);
                }}
                className="flex items-center gap-2"
              >
                <Plus size={16} /> Add New Project
              </Button>
            )}

            {editingProject ? (
              <form onSubmit={handleSaveProject} className="bg-card border border-white/10 p-6 rounded-xl space-y-4">
                 {/* ... (Project Form Fields - same as before) ... */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Title"
                    value={editingProject.title}
                    onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                    className="bg-black/50 border border-white/10 rounded p-3 text-white w-full"
                    required
                  />
                  <input
                    placeholder="Category"
                    value={editingProject.category}
                    onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                    className="bg-black/50 border border-white/10 rounded p-3 text-white w-full"
                    required
                  />
                  <input
                    placeholder="Duration"
                    value={editingProject.duration}
                    onChange={e => setEditingProject({...editingProject, duration: e.target.value})}
                    className="bg-black/50 border border-white/10 rounded p-3 text-white w-full"
                  />
                  <input
                    placeholder="Tech Stack (comma separated)"
                    value={editingProject.tech.join(', ')}
                    onChange={e => setEditingProject({...editingProject, tech: e.target.value.split(',').map(t => t.trim())})}
                    className="bg-black/50 border border-white/10 rounded p-3 text-white w-full"
                  />
                </div>
                
                <textarea
                  placeholder="Description"
                  value={editingProject.description}
                  onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                  className="bg-black/50 border border-white/10 rounded p-3 text-white w-full h-32"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Demo URL"
                    value={editingProject.demoUrl || ''}
                    onChange={e => setEditingProject({...editingProject, demoUrl: e.target.value})}
                    className="bg-black/50 border border-white/10 rounded p-3 text-white w-full"
                  />
                  <input
                    placeholder="Repo URL"
                    value={editingProject.repoUrl || ''}
                    onChange={e => setEditingProject({...editingProject, repoUrl: e.target.value})}
                    className="bg-black/50 border border-white/10 rounded p-3 text-white w-full"
                  />
                </div>

                {/* Media Upload */}
                <div className="border-t border-white/10 pt-4 space-y-4">
                  <h4 className="font-bold text-white">Media</h4>
                  <div className="flex flex-col gap-4">
                    <div>
                      <input 
                        type="file" 
                        accept="image/*,video/*" 
                        multiple 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleFileUpload}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 py-8 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <Upload size={24} /> 
                        <div className="flex flex-col items-center">
                          <span className="font-bold">Upload Media</span>
                          <span className="text-xs font-normal text-secondary">Images & Video supported (Bulk upload enabled)</span>
                        </div>
                      </Button>
                      
                      {/* Previews */}
                      {editingProject.video && (
                         <div className="mt-4 p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                             <Video size={20} className="text-primary" />
                             <span className="text-sm text-white truncate">Video Uploaded</span>
                           </div>
                           <button type="button" onClick={() => setEditingProject({...editingProject, video: undefined})} className="text-red-500 hover:text-red-400 p-2 hover:bg-white/5 rounded-full transition-colors"><X size={16} /></button>
                         </div>
                       )}

                      {editingProject.images && editingProject.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {editingProject.images.map((img, idx) => (
                            <div key={idx} className="relative aspect-video group rounded-lg overflow-hidden border border-white/10">
                              <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors transform scale-90 group-hover:scale-100"><Trash2 size={16} /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <Button type="submit" variant="primary" className="flex items-center gap-2"><Save size={16} /> Save Project</Button>
                  <Button type="button" variant="outline" onClick={() => { setEditingProject(null); setIsAddingNew(false); }} className="flex items-center gap-2"><X size={16} /> Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="grid gap-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-card border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:border-primary/50 transition-colors">
                    <div>
                      <h4 className="text-lg font-bold text-white">{project.title}</h4>
                      <p className="text-secondary text-sm">{project.category}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingProject(project)} className="p-2 bg-white/10 hover:bg-primary hover:text-black rounded-lg transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteProject(project.id)} className="p-2 bg-white/10 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {!editingExperience && (
              <Button 
                variant="primary" 
                onClick={() => {
                  setEditingExperience({ id: `new-exp-${Date.now()}`, company: '', role: '', period: '', description: [''] });
                  setIsAddingNew(true);
                }}
                className="flex items-center gap-2"
              >
                <Plus size={16} /> Add New Experience
              </Button>
            )}

            {editingExperience ? (
              <form onSubmit={handleSaveExperience} className="bg-card border border-white/10 p-6 rounded-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Company" value={editingExperience.company} onChange={e => setEditingExperience({...editingExperience, company: e.target.value})} className="bg-black/50 border border-white/10 rounded p-3 text-white w-full" required />
                  <input placeholder="Role" value={editingExperience.role} onChange={e => setEditingExperience({...editingExperience, role: e.target.value})} className="bg-black/50 border border-white/10 rounded p-3 text-white w-full" required />
                  <input placeholder="Period" value={editingExperience.period} onChange={e => setEditingExperience({...editingExperience, period: e.target.value})} className="bg-black/50 border border-white/10 rounded p-3 text-white w-full" required />
                </div>
                <textarea placeholder="Description (one bullet per line)" value={editingExperience.description.join('\n')} onChange={e => setEditingExperience({...editingExperience, description: e.target.value.split('\n')})} className="bg-black/50 border border-white/10 rounded p-3 text-white w-full h-32" required />
                <div className="flex gap-4 pt-4">
                  <Button type="submit" variant="primary" className="flex items-center gap-2"><Save size={16} /> Save Experience</Button>
                  <Button type="button" variant="outline" onClick={() => { setEditingExperience(null); setIsAddingNew(false); }} className="flex items-center gap-2"><X size={16} /> Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="grid gap-4">
                {experience.map(exp => (
                  <div key={exp.id} className="bg-card border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:border-primary/50 transition-colors">
                    <div>
                      <h4 className="text-lg font-bold text-white">{exp.company}</h4>
                      <p className="text-secondary text-sm">{exp.role} • {exp.period}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingExperience(exp)} className="p-2 bg-white/10 hover:bg-primary hover:text-black rounded-lg transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteExperience(exp.id)} className="p-2 bg-white/10 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            {/* Add New Category */}
            <div className="bg-card border border-white/10 p-4 rounded-xl flex gap-4 items-center">
               <input 
                 placeholder="New Skill Category Name" 
                 value={newSkillCategory}
                 onChange={(e) => setNewSkillCategory(e.target.value)}
                 className="flex-1 bg-black/50 border border-white/10 rounded p-3 text-white"
               />
               <Button onClick={handleAddCategory} disabled={!newSkillCategory.trim()} variant="primary" className="flex items-center gap-2">
                 <Plus size={16} /> Add Category
               </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="bg-card border border-white/10 p-6 rounded-xl space-y-4 group hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <h3 className="text-lg font-bold text-white">{category}</h3>
                    <button onClick={() => handleDeleteCategory(category)} className="text-red-500 hover:text-red-400 p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 min-h-[50px]">
                    {items.map((skill) => (
                      <div key={skill} className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-sm text-white flex items-center gap-2 group/skill hover:border-primary/50 transition-colors">
                        {skill}
                        <button onClick={() => handleDeleteSkill(category, skill)} className="text-white/30 hover:text-red-500 transition-colors"><X size={12} /></button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <input 
                      placeholder="Add skill..." 
                      value={newSkillInput[category] || ''}
                      onChange={(e) => setNewSkillInput({...newSkillInput, [category]: e.target.value})}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(category)}
                      className="flex-1 bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white"
                    />
                    <Button onClick={() => handleAddSkill(category)} variant="outline" className="px-3">
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            {!editingEducation && (
              <Button 
                variant="primary" 
                onClick={() => {
                  setEditingEducation({ school: '', period: '', degree: '' });
                  setIsAddingNew(true);
                  setEditingEducationIndex(-1);
                }}
                className="flex items-center gap-2"
              >
                <Plus size={16} /> Add New Education
              </Button>
            )}

            {editingEducation ? (
              <form onSubmit={handleSaveEducation} className="bg-card border border-white/10 p-6 rounded-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-secondary">School / Institution</label>
                    <input 
                      value={editingEducation.school} 
                      onChange={e => setEditingEducation({...editingEducation, school: e.target.value})} 
                      className="bg-black/50 border border-white/10 rounded p-3 text-white w-full" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-secondary">Period</label>
                    <input 
                      value={editingEducation.period} 
                      onChange={e => setEditingEducation({...editingEducation, period: e.target.value})} 
                      className="bg-black/50 border border-white/10 rounded p-3 text-white w-full" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-sm text-secondary">Degree / Certification</label>
                   <textarea 
                     value={editingEducation.degree} 
                     onChange={e => setEditingEducation({...editingEducation, degree: e.target.value})} 
                     className="bg-black/50 border border-white/10 rounded p-3 text-white w-full h-24" 
                     required 
                   />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit" variant="primary" className="flex items-center gap-2"><Save size={16} /> Save Education</Button>
                  <Button type="button" variant="outline" onClick={() => { setEditingEducation(null); setIsAddingNew(false); }} className="flex items-center gap-2"><X size={16} /> Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="grid gap-4">
                {education.map((edu, index) => (
                  <div key={index} className="bg-card border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/10">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{edu.school}</h4>
                        <p className="text-secondary text-sm">{edu.period}</p>
                        <p className="text-white/60 text-sm mt-1">{edu.degree}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingEducation(edu); setEditingEducationIndex(index); setIsAddingNew(false); }} className="p-2 bg-white/10 hover:bg-primary hover:text-black rounded-lg transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteEducation(index)} className="p-2 bg-white/10 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RESUME TAB */}
        {activeTab === 'resume' && (
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary"><FileText size={40} /></div>
            <div><h3 className="text-2xl font-bold text-white mb-2">Resume Management</h3><p className="text-secondary">Upload a new PDF to replace your current resume.</p></div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 inline-block"><span className="text-sm text-white/70">Current File: </span><span className="text-primary font-mono text-sm">{resumeUrl.startsWith('data:') ? 'Custom Uploaded File.pdf' : resumeUrl}</span></div>
            <input type="file" accept="application/pdf" ref={resumeInputRef} className="hidden" onChange={handleResumeUpload} />
            <Button variant="primary" onClick={() => resumeInputRef.current?.click()} className="w-full py-4 flex items-center justify-center gap-2"><Upload size={20} /> Upload New Resume</Button>
          </div>
        )}

        {/* THEME TAB */}
        {activeTab === 'theme' && (
          <form onSubmit={handleThemeSave} className="space-y-6 max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Theme Customization</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-secondary">Primary Color (Accent)</label>
                <div className="flex gap-4">
                  <input 
                    type="color" 
                    value={themeForm.primary}
                    onChange={e => setThemeForm({...themeForm, primary: e.target.value})}
                    className="h-12 w-20 bg-transparent rounded cursor-pointer"
                  />
                  <input 
                    type="text"
                    value={themeForm.primary}
                    onChange={e => setThemeForm({...themeForm, primary: e.target.value})}
                    className="flex-1 bg-black/50 border border-white/10 rounded p-3 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-secondary">Background Color</label>
                <div className="flex gap-4">
                  <input 
                    type="color" 
                    value={themeForm.background}
                    onChange={e => setThemeForm({...themeForm, background: e.target.value})}
                    className="h-12 w-20 bg-transparent rounded cursor-pointer"
                  />
                  <input 
                    type="text"
                    value={themeForm.background}
                    onChange={e => setThemeForm({...themeForm, background: e.target.value})}
                    className="flex-1 bg-black/50 border border-white/10 rounded p-3 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-secondary">Card Background Color</label>
                <div className="flex gap-4">
                  <input 
                    type="color" 
                    value={themeForm.card}
                    onChange={e => setThemeForm({...themeForm, card: e.target.value})}
                    className="h-12 w-20 bg-transparent rounded cursor-pointer"
                  />
                  <input 
                    type="text"
                    value={themeForm.card}
                    onChange={e => setThemeForm({...themeForm, card: e.target.value})}
                    className="flex-1 bg-black/50 border border-white/10 rounded p-3 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
               <Button type="submit" variant="primary" className="w-full">Apply Theme</Button>
               <Button type="button" variant="outline" onClick={() => {
                 setThemeForm({ primary: '#CCFF00', background: '#050505', card: '#1A1A1A', secondary: '#888888' });
               }} className="w-full">Reset to Default</Button>
            </div>
          </form>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <form onSubmit={handlePasswordChange} className="space-y-6 max-w-xl mx-auto mt-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-primary border border-white/10 mb-4">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Security Settings</h3>
              <p className="text-secondary text-sm mt-2">Update your admin access password</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-secondary">New Password</label>
                <input 
                  type="password"
                  value={passwordForm.new}
                  onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-secondary">Confirm Password</label>
                <input 
                  type="password"
                  value={passwordForm.confirm}
                  onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full py-3 mt-4">Update Password</Button>
          </form>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
