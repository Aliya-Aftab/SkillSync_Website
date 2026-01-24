import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FiCpu, FiSend, FiActivity, FiZap, FiCode, FiTrendingUp, FiUserCheck, FiMessageCircle } from "react-icons/fi";

const PremiumBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
    <div className="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] bg-[#4F46E5] opacity-[0.2] rounded-full blur-[120px]"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] border border-indigo-200/60 rounded-full opacity-50"></div>
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
    <div className="absolute inset-0 opacity-[0.6]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
  </div>
);

const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (text = message) => {
    if (!text.trim()) return;
    setLoading(true);
    // If triggered by a button, set the message input too
    if (text !== message) setMessage(text);
    
    try {
      const res = await axios.post(
        `${BASE_URL}/api/ai-assistant`,
        { message: text },
        { withCredentials: true }
      );
      setReply(res.data.reply || "No response from SkillSync AI.");
    } catch (err) {
      console.error("AI error:", err);
      setReply("I encountered an error while processing your request. Please try again.");
    } finally {
      setLoading(false);
      if (text === message) setMessage(""); // Clear input only if typed manually
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen pt-10 pb-10 px-4 sm:px-6 lg:px-8 relative flex flex-col items-center justify-start overflow-hidden">
      
      <PremiumBackground />

      {/* HEADER*/}
      <div className="relative z-10 text-center mb-8 animate-fade-in-down">
         <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tighter mb-3">
           Supercharge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-purple-600">Dev Journey</span>
         </h1>
         <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
           Your personal career architect. Optimize your stack, find elite connections, and level up your profile.
         </p>
      </div>

      {/* MAIN INTERFACE CARD */}
      <div className="w-full max-w-5xl relative z-10 animate-fade-in-up">
        
        {/* OUTER GLASS RIM */}
        <div className="p-3 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl shadow-indigo-500/10">
           
           {/* INNER WINDOW */}
           <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden flex flex-col min-h-[60vh] shadow-inner relative">
               
               {/* 1. WINDOW TOOLBAR */}
               <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-6">
                   <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-rose-400 border border-rose-500/20"></div>
                       <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/20"></div>
                       <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20"></div>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100">
                       <FiCode /> Intelligence Engine
                   </div>
                   <div className="w-10"></div>
               </div>

               {/* 2. CONTENT AREA */}
               <div className="flex-1 p-6 md:p-8 flex flex-col relative bg-slate-50/30">
                  
                  {/* SCROLLABLE RESPONSE AREA */}
                  <div className="flex-1 overflow-y-auto mb-6 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                      {reply ? (
                        // SHOW REPLY IF EXISTS
                        <div className="animate-fade-in">
                          <div className="flex items-start gap-4 max-w-3xl">
                             <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 mt-1">
                                <FiCpu className="text-xl" />
                             </div>
                             <div className="flex-1">
                                 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Insight</div>
                                 <div className="text-slate-800 text-base leading-relaxed font-medium whitespace-pre-line bg-white p-6 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                                    {reply}
                                 </div>
                             </div>
                          </div>
                        </div>
                      ) : (
                        // SHOW PREDEFINED QUESTIONS IF NO REPLY
                        <div className="h-full flex flex-col items-center justify-center py-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                              
                              {/* Card 1 */}
                              <button 
                                onClick={() => handleSubmit("Analyze my profile and suggest improvements")}
                                className="group p-5 bg-white border border-slate-200 rounded-2xl text-left hover:border-[#4F46E5] hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                              >
                                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                                      <FiUserCheck className="text-xl" />
                                  </div>
                                  <h3 className="font-bold text-slate-800 mb-1">Analyze My Profile</h3>
                                  <p className="text-xs text-slate-500">Get AI feedback to stand out to recruiters.</p>
                              </button>

                              {/* Card 2 */}
                              <button 
                                onClick={() => handleSubmit("How can I get more matches on SkillSync?")}
                                className="group p-5 bg-white border border-slate-200 rounded-2xl text-left hover:border-[#4F46E5] hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                              >
                                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                                      <FiTrendingUp className="text-xl" />
                                  </div>
                                  <h3 className="font-bold text-slate-800 mb-1">Boost My Matches</h3>
                                  <p className="text-xs text-slate-500">Tips to increase visibility and connections.</p>
                              </button>

                              {/* Card 3 */}
                              <button 
                                onClick={() => handleSubmit("Suggest a project idea for my tech stack")}
                                className="group p-5 bg-white border border-slate-200 rounded-2xl text-left hover:border-[#4F46E5] hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                              >
                                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                                      <FiCode className="text-xl" />
                                  </div>
                                  <h3 className="font-bold text-slate-800 mb-1">Project Ideas</h3>
                                  <p className="text-xs text-slate-500">Find something cool to build next.</p>
                              </button>

                              {/* Card 4 */}
                              <button 
                                onClick={() => handleSubmit("Write a professional connection request message")}
                                className="group p-5 bg-white border border-slate-200 rounded-2xl text-left hover:border-[#4F46E5] hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                              >
                                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                                      <FiMessageCircle className="text-xl" />
                                  </div>
                                  <h3 className="font-bold text-slate-800 mb-1">Icebreakers</h3>
                                  <p className="text-xs text-slate-500">Generate the perfect first message.</p>
                              </button>

                           </div>
                        </div>
                      )}
                  </div>

                  {/* 3. INPUT AREA */}
                  <div className="relative mt-auto">
                      <div className="relative bg-white rounded-2xl border border-slate-200 focus-within:border-[#4F46E5] focus-within:ring-4 focus-within:ring-[#4F46E5]/5 transition-all duration-300 flex flex-col md:flex-row items-end p-2 shadow-lg shadow-slate-200/50">
                         <textarea
                           className="w-full bg-transparent text-slate-900 p-4 min-h-[60px] max-h-[120px] outline-none resize-none text-base font-medium placeholder-slate-400"
                           placeholder="Ask anything..."
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                           onKeyDown={handleKeyPress}
                         />
                         <button
                           onClick={() => handleSubmit()}
                           disabled={loading || !message.trim()}
                           className={`m-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 shrink-0 ${
                             loading || !message.trim()
                             ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                             : "bg-[#4F46E5] text-white hover:bg-[#3730A3] shadow-md hover:shadow-lg shadow-indigo-500/20"
                           }`}
                         >
                           {loading ? <FiActivity className="animate-spin" /> : <FiSend />}
                           <span className="hidden md:inline">Run</span>
                         </button>
                      </div>
                  </div>

               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;