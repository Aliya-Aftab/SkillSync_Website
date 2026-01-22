import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // PURE WHITE PALETTE
        canvas: '#FFFFFF',   
        surface: '#FFFFFF',  
        
        // Brand Colors (Deep Violet & Electric Purple)
        primary: '##4F46E5',      
        secondary: '#9333EA',    
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)', // Very clean shadow
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        skillsync: {
          "primary": "##4F46E5",     
          "secondary": "#9333EA",   
          "accent": "#F43F5E",      
          "neutral": "#f3f4f6",     
          "base-100": "#FFFFFF",   
          "base-200": "#FFFFFF",    
          "base-300": "#f9fafb",    
          
          "--rounded-box": "1rem", 
          "--rounded-btn": "0.5rem", 
        },
      },
    ],
    darkTheme: "skillsync", 
  },
};