import { motion } from 'motion/react';

export function LoadingLeaf() {
  return (
    <div className="fixed inset-0 bg-stone-50/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            y: [0, -10, 0, -10, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-4"
        >
          🍃
        </motion.div>
        <motion.p 
          className="text-slate-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Завантаження...
        </motion.p>
      </div>
    </div>
  );
}
