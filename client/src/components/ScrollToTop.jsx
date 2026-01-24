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
          
          // ✨ FIXED: Now it is always Solid Indigo. No weird white background.
          className="fixed bottom-36 right-8 z-[100] w-12 h-12 flex items-center justify-center 
                     bg-[#4F46E5] text-white rounded-full 
                     shadow-lg shadow-indigo-500/40
                     hover:bg-[#4338ca] hover:shadow-indigo-500/60 hover:-translate-y-1
                     transition-all duration-300 active:scale-90"
          aria-label="Scroll to top"
        >
          <FiChevronUp className="text-xl stroke-[3px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;