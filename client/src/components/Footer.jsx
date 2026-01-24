import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; 
import { FiLock, FiX, FiArrowRight } from "react-icons/fi";

const Footer = () => {
  const user = useSelector((store) => store.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleProtectedLink = (e) => {
    if (!user) {
      e.preventDefault(); 
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 mt-auto text-slate-400 z-40 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-1">
              <h2 className="text-xl font-black text-white tracking-tighter uppercase mb-4">
                Skill<span className="text-[#4F46E5]">Sync</span>
              </h2>
              <p className="text-xs font-medium leading-relaxed max-w-xs text-slate-400">
                The premier network for developers. 
                Connect, collaborate, and build the future together.
              </p>
            </div>

            {/* Links Column 1 - PROTECTED LINKS */}
            <div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-6">Platform</h3>
              <ul className="space-y-3">
                <li>
                    <Link 
                        to="/feed" 
                        onClick={handleProtectedLink} 
                        className="text-xs font-semibold hover:text-[#4F46E5] transition-colors"
                    >
                        Browse Devs
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/smart-matches" 
                        onClick={handleProtectedLink}
                        className="text-xs font-semibold hover:text-[#4F46E5] transition-colors"
                    >
                        Smart Match
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/assistant" 
                        onClick={handleProtectedLink}
                        className="text-xs font-semibold hover:text-[#4F46E5] transition-colors"
                    >
                        AI Mentor
                    </Link>
                </li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-6">Support</h3>
              <ul className="space-y-3">
                <li><Link to="#" className="text-xs font-semibold hover:text-[#4F46E5] transition-colors">Help Center</Link></li>
                <li><Link to="#" className="text-xs font-semibold hover:text-[#4F46E5] transition-colors">Guidelines</Link></li>
                <li><Link to="#" className="text-xs font-semibold hover:text-[#4F46E5] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-6">Stay Connected</h3>
              <div className="flex gap-4">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#4F46E5] hover:text-white transition-all transform hover:-translate-y-1">
                    <FaGithub className="text-lg" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#4F46E5] hover:text-white transition-all transform hover:-translate-y-1">
                    <FaLinkedin className="text-lg" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#4F46E5] hover:text-white transition-all transform hover:-translate-y-1">
                    <FaTwitter className="text-lg" />
                  </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Signature */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              © {new Date().getFullYear()} SkillSync. All rights reserved.
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Made by <span className="text-white hover:text-[#4F46E5] transition-colors cursor-default">Aliya Aftab</span>
            </p>
          </div>

        </div>
      </footer>

    
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLoginModal(false)}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-fade-in-up border border-slate-100">
            
            <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 rounded-full hover:bg-slate-100"
            >
                <FiX className="text-lg" />
            </button>

            <div className="w-16 h-16 bg-indigo-50 text-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm">
                <FiLock />
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                Access Restricted
            </h3>
            <p className="text-slate-500 font-medium text-sm mb-8 leading-relaxed">
                You need to be a part of the network to view developer profiles and access AI tools.
            </p>

            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => { setShowLoginModal(false); navigate("/login"); }}
                    className="w-full py-3.5 bg-[#4F46E5] text-white font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-[#3730A3] transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                >
                    Log In
                </button>
                <button 
                    onClick={() => { setShowLoginModal(false); navigate("/login?mode=signup"); }}
                    className="w-full py-3.5 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                >
                    Create Account <FiArrowRight />
                </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Footer;