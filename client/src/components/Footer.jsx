import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; 

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 mt-auto text-slate-400">
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

          {/* Links Column 1 */}
          <div>
            <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-6">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/feed" className="text-xs font-semibold hover:text-[#4F46E5] transition-colors">Browse Devs</Link></li>
              <li><Link to="/smart-matches" className="text-xs font-semibold hover:text-[#4F46E5] transition-colors">Smart Match</Link></li>
              <li><Link to="/assistant" className="text-xs font-semibold hover:text-[#4F46E5] transition-colors">AI Mentor</Link></li>
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
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[hsl(243,75%,59%)] hover:text-white transition-all transform hover:-translate-y-1">
                   <FaGithub className="text-lg" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[hsl(243,75%,59%)] hover:text-white transition-all transform hover:-translate-y-1">
                   <FaLinkedin className="text-lg" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[hsl(243,75%,59%)] hover:text-white transition-all transform hover:-translate-y-1">
                   <FaTwitter className="text-lg" />
                </a>
             </div>
          </div>
        </div>

        {/* Bottom Bar - Signature */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            © 2026 SkillSync. All rights reserved.
          </p>
          
          {/*Signature */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
             Made by <span className="text-white">Aliya Aftab</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;