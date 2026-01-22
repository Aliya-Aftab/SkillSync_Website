
import { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      
      setVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          
          className="fixed bottom-36 right-8 z-[100] w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200 rounded-full shadow-soft hover:shadow-indigo-100 hover:border-primary hover:text-primary transition-all duration-300 active:scale-90"
          aria-label="Scroll to top"
        >
          <FiChevronUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;