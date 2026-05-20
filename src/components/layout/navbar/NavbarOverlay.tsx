'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavbarOverlay({ isOpen, onClose }: NavbarOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="nav-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onClose}
          aria-hidden="true"
        >
          <style jsx>{`
            .nav-overlay {
              position: fixed;
              inset: 0;
              background: rgba(0, 0, 0, 0.55);
              backdrop-filter: blur(3px);
              -webkit-backdrop-filter: blur(3px);
              z-index: 997;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
