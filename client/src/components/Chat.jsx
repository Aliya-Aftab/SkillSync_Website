import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FiSend, FiArrowLeft, FiMoreVertical, FiImage, FiCheck } from "react-icons/fi";

const formatTime = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const chatBackgroundStyle = {
  backgroundImage: 'radial-gradient(#cbd5e1 0.8px, transparent 0.8px)',
  backgroundSize: '32px 32px'
};

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null); 
  
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  
  const scrollRef = useRef(null);
  const socketRef = useRef(null);

  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/view/${targetUserId}`, {
        withCredentials: true,
      });
      setTargetUser(res.data.data || res.data); 
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/api/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          senderId: senderId?._id || senderId, 
          text,
          createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.error("Chat fetch error:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
    fetchTargetUser(); 
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt, senderId }) => {
      const incomingMsg = { firstName, lastName, text, createdAt, senderId };
      setMessages((prev) => [...prev, incomingMsg]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    };

    socketRef.current?.emit("sendMessage", payload);
    
    setMessages((prev) => [
      ...prev, 
      { ...payload, createdAt: new Date().toISOString(), senderId: userId }
    ]);
    
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!targetUser && messages.length === 0) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">Loading secure channel...</div>;

  return (
    // Layout adjusted to respect the global NavBar (mt-20) and not get stuck behind the Footer
    <div className="flex flex-col h-[calc(100vh-5rem)] mt-20 bg-[#f8fafc] overflow-hidden relative">
      
      {/* 1. HEADER */}
      <div className="flex-none h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          
          <div className="relative">
            <img 
              src={targetUser?.photoUrl || "https://geographyandyou.com/images/user-profile.png"} 
              alt="User" 
              className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          
          <div>
            <h2 className="font-black text-slate-900 text-lg uppercase tracking-tight leading-none">
              {targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : "Developer"}
            </h2>
            <p className="text-[9px] font-black text-[#4F46E5] uppercase tracking-widest mt-1">
              Online • Encrypted
            </p>
          </div>
        </div>
        
        <button className="text-slate-400 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-full transition-all">
          <FiMoreVertical className="text-xl" />
        </button>
      </div>

      {/* --- 2. MESSAGES AREA --- */}
      <div 
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
        style={chatBackgroundStyle}
      >
        {messages.map((msg, index) => {
          const isSelf = msg.senderId === userId || msg.firstName === user.firstName;
          
          return (
            <div
              key={index}
              className={`flex w-full ${isSelf ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] md:max-w-[65%] flex flex-col ${isSelf ? "items-end" : "items-start"}`}>
                
                {/* BUBBLE */}
                <div
                  className={`px-5 py-3 text-sm md:text-base leading-relaxed relative shadow-md
                    ${isSelf 
                      ? "bg-[#4F46E5] text-white rounded-2xl rounded-tr-none shadow-indigo-200" 
                      : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-none shadow-slate-100" 
                    }
                  `}
                >
                  {msg.text}
                </div>
                
                {/* Time & Status */}
                <div className="flex items-center gap-1 mt-1.5 px-1">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                     {formatTime(msg.createdAt)}
                   </span>
                   {isSelf && <FiCheck className="text-[10px] text-[#4F46E5]" />}
                </div>

              </div>
            </div>
          );
        })}
        <div ref={scrollRef}></div>
      </div>

      {/* --- 3. INPUT AREA --- */}
      <div className="flex-none p-4 bg-white border-t border-slate-200 z-20">
        <div className="max-w-4xl mx-auto flex gap-3 items-end bg-slate-50 p-2 rounded-[1.5rem] border border-slate-200 focus-within:ring-2 focus-within:ring-[#4F46E5] focus-within:border-transparent transition-all shadow-inner">
          
          <button className="p-3 text-slate-400 hover:text-[#4F46E5] transition-colors rounded-full hover:bg-white">
             <FiImage className="text-xl" />
          </button>

          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type a message..."
            className="w-full bg-transparent py-3 text-sm font-medium text-slate-700 resize-none outline-none placeholder:text-slate-400 max-h-32"
            style={{ minHeight: '44px' }} 
          />
          
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full transition-all flex items-center justify-center mb-0.5
              ${newMessage.trim() 
                ? "bg-[#4F46E5] text-white shadow-lg hover:bg-[#3730A3] transform active:scale-95" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
          >
            <FiSend className="text-lg ml-0.5" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Chat;