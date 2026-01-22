
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCode, FiZap, FiCpu, FiUsers, FiGlobe, FiLayers, FiActivity, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const features = [
  {
    icon: <FiUsers />,
    title: "Smart Matching",
    description: "Our algorithm connects you with developers who complement your tech stack perfectly.",
  },
  {
    icon: <FiCode />,
    title: "Project Collaboration",
    description: "Find the missing piece for your next big hackathon team or startup idea.",
  },
  {
    icon: <FiCpu />,
    title: "Skill Growth",
    description: "Learn from elite peers, perform code reviews, and level up your engineering game.",
  },
  {
    icon: <FiGlobe />,
    title: "Global Network",
    description: "Connect with high-performance developers from top tech hubs around the world.",
  },
];

const Home = () => {

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  // 2. LOGIC: If user exists, kick them to Feed immediately
  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user, navigate]);
  const [displayText, setDisplayText] = useState("");
  const fullText = "The Neural Network for Developers.";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  
  const PremiumBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
       
       {/* Main Deep Purple Orb - High Opacity for Visibility */}
       <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#4F46E5] opacity-[0.4] rounded-full blur-[120px]"></div>
       
       {/* Secondary Purple Glow */}
       <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-600 opacity-[0.3] rounded-full blur-[120px]"></div>

       {/* Geometry & Grid */}
       <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] border border-indigo-200/60 rounded-full opacity-50"></div>
       <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
    </div>
  );

  return (
    // PARENT: 'relative' creates the boundary for the background
    <div className="w-full min-h-screen text-slate-900 selection:bg-[#4F46E5]/20 relative overflow-x-hidden">
      
      {/* 1. BACKGROUND (Layer 0) */}
      <PremiumBackground />
      
      {/* 2. CONTENT WRAPPER (Layer 10 - Sits ABOVE background) */}
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="w-full pt-32 pb-24 px-6 sm:px-12 lg:px-24 flex flex-col items-center min-h-[90vh] justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16 max-w-7xl mx-auto">
            
            {/* Left Text */}
            <div className="flex-1 lg:max-w-3xl text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                
                {/* Heading Typewriter */}
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1] mb-8 text-slate-900">
                  {displayText}<span className="text-[#4F46E5] animate-pulse">_</span>
                </h1>
                
                <p className="text-slate-500 text-lg md:text-xl mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                  Stop coding alone. <span className="text-slate-900 font-bold decoration-[#4F46E5] underline decoration-4 underline-offset-4">SkillSync</span> is the elite ecosystem where ambitions align. 
                  Match with peers, build teams, and ship legendary software.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <Link to="/login?mode=signup" className="px-10 py-5 bg-[#4F46E5] hover:bg-[#3730A3] text-white rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1">
                    Join the Network
                  </Link>
                  <Link to="/login" className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-bold text-sm uppercase tracking-widest hover:border-slate-900 transition-all hover:-translate-y-1">
                    Login
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Code Console */}
            <div className="flex-1 w-full max-w-lg perspective-1000 mt-10 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-[#0f172a] rounded-2xl shadow-2xl shadow-indigo-500/20 overflow-hidden border border-slate-700 relative z-20">
                  <div className="bg-[#1e293b]/50 px-5 py-4 flex items-center justify-between border-b border-slate-700/50">
                     <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                     </div>
                     <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">skillsync_core</div>
                  </div>
                  <div className="p-8 font-mono text-sm leading-8 text-slate-300">
                     <p><span className="text-purple-400">const</span> <span className="text-blue-300">dev</span> <span className="text-slate-500">=</span> <span className="text-yellow-300">new</span> <span className="text-green-400">User</span>();</p>
                     <p className="mt-2"><span className="text-purple-400">await</span> <span className="text-blue-300">dev</span>.<span className="text-yellow-300">syncStack</span>([<span className="text-orange-400">"React"</span>, <span className="text-orange-400">"Node"</span>]);</p>
                     <p className="mt-4 text-slate-500">// Searching for matches...</p>
                     <div className="mt-2 flex items-center gap-2 text-green-400 font-bold">
                        <FiCheckCircle className="text-base" />
                        <span>Match Found: 98% Compatibility</span>
                     </div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-[#4F46E5] opacity-20 blur-2xl -z-10 rounded-full"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
                Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-purple-600">Capabilities</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                A specialized suite of tools designed to accelerate your development career.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-[2rem] bg-slate-900 border border-slate-800 shadow-xl shadow-slate-900/20 hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 bg-slate-800 text-[#4F46E5] border border-slate-700 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[#4F46E5] text-xs font-bold uppercase tracking-widest">
                     <span>Explore</span> <FiArrowRight />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STATISTICS SECTION */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[2.5rem] p-12 md:p-16 shadow-2xl shadow-indigo-500/15 border-2 border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left relative overflow-hidden">
               
               {/* Subtle white pattern inside card */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10"></div>

               <div className="md:w-1/3 relative z-10">
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">System <br/>Metrics</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Live Ecosystem Data</p>
               </div>

               <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                  {[
                    { label: "Active Nodes", val: "5k+", icon: <FiLayers /> }, 
                    { label: "Matches Made", val: "1.2k+", icon: <FiZap /> }, 
                    { label: "Uptime", val: "99.9%", icon: <FiActivity /> }
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center md:items-start group">
                      <div className="text-[#4F46E5] mb-3 text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                      <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">{stat.val}</div>
                      <div className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-[#4F46E5] transition-colors">{stat.label}</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;