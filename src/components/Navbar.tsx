import { motion } from 'motion/react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const links: { id: View; label: string }[] = [
    { id: 'gallery', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-14 py-14 flex justify-between items-start bg-brand-bg/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="cursor-pointer brand"
        onClick={() => onNavigate('gallery')}
      >
        <h1 className="text-2xl font-normal tracking-[4px] uppercase text-brand-ink leading-tight">Akinola <br /> Oluwanifemi</h1>
        <p className="text-[12px] text-brand-muted tracking-[0.5px] uppercase mt-2">Professional Painter &<br />Art Educator</p>
      </motion.div>

      <div className="flex flex-col gap-5 items-end">
        {links.map((link, idx) => (
          <motion.button
            key={link.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx + 0.3, duration: 0.8 }}
            onClick={() => onNavigate(link.id)}
            className={`nav-link sm:text-right ${currentView === link.id ? 'active' : ''}`}
          >
            {link.label}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
