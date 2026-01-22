

import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

import { FiMenu, FiX } from "react-icons/fi"; 

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      setIsMenuOpen(false); // Close menu on logout
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const isSelected = (path) => location.pathname === path;

  // THEME COLORS
  const activeClass = "text-[#4F46E5]"; 
  const inactiveClass = "text-slate-400 hover:text-white";

  const navLinks = [
    { path: "/feed", label: "Feed" },
    { path: "/connections", label: "Network" },
    { path: "/requests", label: "Requests" },
    { path: "/profile", label: "Profile" },
    { path: "/assistant", label: "Assistant" },
    { path: "/smart-matches", label: "Sync" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 h-20 shadow-lg transition-all duration-300">
      {/* FIX 1: Responsive Padding (px-4 on small, px-12 on large) gives links more room */}
      <div className="max-w-7xl mx-auto h-full px-4 lg:px-12 flex justify-between items-center">
        
        {/* 1. LOGO */}
        <div 
          onClick={() => {
             user ? navigate("/feed") : navigate("/");
             setIsMenuOpen(false);
          }}
          className="cursor-pointer flex items-center gap-1 group z-50 relative flex-shrink-0"
        >
          <span className="text-2xl font-black text-white tracking-tighter uppercase group-hover:opacity-90 transition-opacity">
            Skill<span className="text-[#4F46E5]">Sync</span>
          </span>
        </div>

        {/* 2. DESKTOP NAVIGATION */}
        <nav className="hidden md:flex flex-grow justify-center h-full">
          {user && (
            // FIX 2: Responsive Gap (gap-4 on tablet, gap-10 on desktop) prevents merging
            <div className="flex h-full gap-4 lg:gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`relative h-full flex items-center font-bold text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap
                    ${isSelected(link.path) ? activeClass : inactiveClass}
                  `}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-[#4F46E5] shadow-[0_0_10px_#4F46E5] transition-all duration-300 transform origin-left
                    ${isSelected(link.path) ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100"}
                  `}></span>
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* 3. DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-shrink-0">
          {user ? (
            <button 
              onClick={handleLogout}
              className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors whitespace-nowrap"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-4 lg:gap-8">
              <Link to="/login" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors whitespace-nowrap">
                Log In
              </Link>
              <Link to="/login?mode=signup" className="px-6 py-2.5 bg-[#4F46E5] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#3730A3] transition-all whitespace-nowrap">
                Join Now
              </Link>
            </div>
          )}
        </div>

        {/* 4. MOBILE MENU TOGGLE */}
        <div className="md:hidden flex items-center z-50">
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className="text-white text-2xl focus:outline-none"
           >
             {isMenuOpen ? <FiX /> : <FiMenu />}
           </button>
        </div>
      </div>

      {/* 5. MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-slate-900 border-b border-slate-800 shadow-2xl flex flex-col pt-24 pb-10 px-6 animate-fade-in-down">
          {user ? (
            <>
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-4 text-center border-b border-slate-800 text-sm font-bold uppercase tracking-widest transition-colors
                    ${isSelected(link.path) ? "text-[#4F46E5]" : "text-slate-300"}
                  `}
                >
                  {link.label}
                </Link>
              ))}
              <button 
                onClick={handleLogout}
                className="py-6 text-center text-sm font-bold uppercase tracking-widest text-rose-500 hover:text-rose-400"
              >
                Logout
              </button>
            </>
          ) : (
             <div className="flex flex-col gap-6 mt-4">
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-center text-sm font-bold uppercase tracking-widest text-white"
                >
                  Log In
                </Link>
                <Link 
                  to="/login?mode=signup" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-4 bg-[#4F46E5] text-white text-center text-sm font-bold uppercase tracking-widest"
                >
                  Join Now
                </Link>
             </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;