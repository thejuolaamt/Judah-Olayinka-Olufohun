import { motion } from 'motion/react';
import { Artwork } from '../types';

interface ArtworkCardProps {
  key?: string | number;
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
  index: number;
}

export default function ArtworkCard({ artwork, onClick, index }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group cursor-pointer relative bg-brand-card border border-brand-border overflow-hidden flex flex-col justify-end p-8 aspect-[4/5]"
      onClick={() => onClick(artwork)}
    >
      <div className="absolute inset-0 z-0">
        <motion.img
          src={`${artwork.imageUrl}?auto=format&fit=crop&w=800&q=80`}
          alt={artwork.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none z-10" />
      </div>

      <div className="absolute top-6 right-6 z-20 text-[10px] text-brand-dim tracking-[1px] uppercase tabular-nums">
        {artwork.year}
      </div>

      <div className="relative z-20">
        <h3 className="text-[16px] font-light tracking-[1px] text-brand-ink mb-1">
          {artwork.title}
        </h3>
        <span className="text-[10px] text-brand-muted uppercase tracking-[1.5px]">
          {artwork.medium}
        </span>
      </div>
    </motion.div>
  );
}
