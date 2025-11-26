import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

type LeafAnimationProps = {
  trigger: boolean;
};

export function LeafAnimation({ trigger }: LeafAnimationProps) {
  const [leaves, setLeaves] = useState<{ id: number; x: number; rotation: number }[]>([]);

  useEffect(() => {
    if (trigger) {
      const newLeaves = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
      }));
      setLeaves(newLeaves);

      setTimeout(() => setLeaves([]), 1000);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{ 
              x: '50vw', 
              y: '50vh', 
              opacity: 1, 
              scale: 0,
              rotate: 0 
            }}
            animate={{ 
              x: `calc(50vw + ${leaf.x}vw)`,
              y: '-20vh',
              opacity: 0,
              scale: 1,
              rotate: leaf.rotation
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="absolute"
          >
            <span className="text-4xl">🍃</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
