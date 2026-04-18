import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import ArtworkCard from './components/ArtworkCard';
import { ARTWORKS } from './constants';
import { Artwork, View } from './types';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<View>('gallery');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Handle scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setView('detail');
  };

  const closeDetail = () => {
    setSelectedArtwork(null);
    setView('gallery');
  };

  return (
    <div className="min-h-screen selection:bg-brand-ink selection:text-brand-bg bg-brand-bg text-brand-ink">
      <Navbar currentView={view} onNavigate={setView} />

      <main className="pt-60 pb-24 px-14 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          {view === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {ARTWORKS.map((artwork, idx) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  index={idx}
                  onClick={handleArtworkClick}
                />
              ))}
            </motion.div>
          )}

          {view === 'detail' && selectedArtwork && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
            >
              <div className="lg:col-span-8">
                <motion.div 
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-brand-card border border-brand-border aspect-auto overflow-hidden"
                >
                  <img
                    src={`${selectedArtwork.imageUrl}?auto=format&fit=crop&w=1600&q=90`}
                    alt={selectedArtwork.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover opacity-90"
                  />
                </motion.div>
              </div>

              <div className="lg:col-span-4 lg:sticky lg:top-60 space-y-12">
                <div>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={closeDetail}
                    className="group flex items-center gap-2 text-[11px] uppercase tracking-[1.5px] text-brand-muted hover:text-brand-ink transition-colors mb-12"
                  >
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    Archive / Collection
                  </motion.button>

                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl font-light tracking-[2px] uppercase text-brand-ink leading-tight"
                  >
                    {selectedArtwork.title}
                  </motion.h1>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-8 space-y-1 border-t border-brand-border pt-8"
                  >
                    <p className="text-[10px] uppercase tracking-[1.5px] text-brand-dim">Specifications</p>
                    <div className="flex justify-between items-baseline pt-4">
                      <span className="text-[12px] uppercase tracking-[1px]">Year</span>
                      <span className="text-[12px] font-sans tabular-nums text-brand-muted">{selectedArtwork.year}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-[12px] uppercase tracking-[1px]">Medium</span>
                      <span className="text-[12px] text-brand-muted">{selectedArtwork.medium}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-[12px] uppercase tracking-[1px]">Dimensions</span>
                      <span className="text-[12px] text-brand-muted tabular-nums">{selectedArtwork.dimensions}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-12 space-y-4"
                  >
                    <p className="text-[10px] uppercase tracking-[1.5px] text-brand-dim">Narrative</p>
                    <p className="text-[15px] leading-relaxed text-brand-muted font-light whitespace-pre-wrap">
                      {selectedArtwork.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto space-y-24"
            >
              <div className="aspect-[21/9] bg-brand-card border border-brand-border overflow-hidden grayscale opacity-70">
                <img 
                  src="https://lh3.googleusercontent.com/d/1LaDt85OF3bPVlzMw0S-3T8VYpzxWgNCV" 
                  alt="Akinola Oluwanifemi" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <h1 className="text-5xl font-light tracking-[4px] uppercase leading-tight">
                  Educator <br /> 
                  & Painter
                </h1>
                
                <div className="space-y-8">
                  <p className="text-[15px] leading-relaxed text-brand-muted font-light">
                    I am an artist and researcher whose practice functions at the intersection of existential philosophy and cultural deconstruction. Holding a Bachelor of Arts in Fine and Applied Arts from Adeyemi Federal University of Education, my work is driven by a central inquiry: "Who am I beyond the given?" 
                  </p>
                  <p className="text-[15px] leading-relaxed text-brand-muted font-light">
                    I explore the layers of identity; religion, language, and heritage — imposed upon us before we possess the agency to choose them. Through fractured acrylic portraits and stark charcoal studies, I examine the social and biological barriers we navigate, focusing on narratives of "The Other" and features that challenge colonial-era beauty standards.
                  </p>
                  <p className="text-[15px] leading-relaxed text-brand-muted font-light">
                    My multidisciplinary approach utilizes oils to celebrate the Black experience, while clay grounds my work in the tactile traditions of my Ondo heritage. Ultimately, my art is an act of reclamation. It is a movement from the shattering of inherited labels toward a grounded, authentic assertion of self, celebrating the resilience of the human spirit.
                  </p>
                </div>
              </div>

              <div className="pt-16 border-t border-brand-border grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-6">
                  <p className="text-[10px] uppercase tracking-[1.5px] text-brand-dim">Education</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[12px] uppercase tracking-[1px] text-brand-ink">BA Fine & Applied Arts</p>
                      <p className="text-[11px] text-brand-muted">Adeyemi Federal University of Education</p>
                      <p className="text-[10px] text-brand-dim mt-1">Expected 2025</p>
                    </div>
                    <div>
                      <p className="text-[12px] uppercase tracking-[1px] text-brand-ink">SSCE</p>
                      <p className="text-[11px] text-brand-muted">Victory Comprehensive College</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] uppercase tracking-[1.5px] text-brand-dim">Practice</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[12px] uppercase tracking-[1px] text-brand-ink">Teaching Practice</p>
                      <p className="text-[11px] text-brand-muted">Day Star Impressive College</p>
                      <p className="text-[10px] text-brand-dim mt-1">2023 — 2024</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] uppercase tracking-[1.5px] text-brand-dim">Expertise</p>
                  <ul className="space-y-2 text-[11px] uppercase tracking-[1px] text-brand-muted">
                    <li>Curriculum Support /</li>
                    <li>Student Mentorship /</li>
                    <li>Copywriting /</li>
                    <li>Painting /</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto py-24 space-y-32"
            >
              <div className="space-y-6">
                <h1 className="text-[10px] uppercase tracking-[4px] text-brand-dim">Inquiries</h1>
                <p className="text-5xl font-light tracking-[2px] uppercase text-brand-ink max-w-2xl leading-tight">
                  Collaborate on <br /> digital dialogues.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start text-left">
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[1.5px] text-brand-dim">Location</p>
                  <p className="text-[13px] uppercase tracking-[1px] leading-relaxed">Adeyemi, Ore–Ondo Road <br /> Ondo State <br /> Nigeria</p>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[1.5px] text-brand-dim">Signal</p>
                  <p className="text-[13px] uppercase tracking-[1px] leading-relaxed">nikky9ice009@gmail.com <br /> +234 (0) 816 406 9869</p>
                </div>
              </div>

              <div className="pt-32 flex flex-wrap gap-x-12 gap-y-6">
                {['Instagram', 'Artsy', 'Foundation', 'Journal'].map(link => (
                  <a key={link} href="#" className="text-[11px] uppercase tracking-[2px] text-brand-dim hover:text-brand-ink transition-colors border-b border-transparent hover:border-brand-ink pb-1">
                    {link}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="px-14 py-14 flex justify-between items-center border-t border-brand-border max-w-[1600px] mx-auto text-brand-dim">
        <p className="text-[10px] uppercase tracking-[2px]">© 2024 Akinola Oluwanifemi</p>
        <div className="flex gap-8">
          <p className="text-[10px] uppercase tracking-[2px]">Professional Painter & Art Educator</p>
        </div>
      </footer>
    </div>
  );
}
