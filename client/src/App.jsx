import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore"; 

// Components
import Body from "./components/Body"; 
import Home from "./components/Home"; 
import Login from "./components/Login"; 
import NavBar from "./components/NavBar"; 
import Footer from "./components/Footer"; 
import ScrollToTop from "./components/ScrollToTop"; 

// Private Pages
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import SmartMatches from "./components/SmartMatches";
import Assistant from "./pages/Assistant";
import Chat from "./components/Chat";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={appStore}>
      <div className="min-h-screen flex flex-col bg-canvas text-ink font-sans selection:bg-primary/20">
        <Router>
          
          <ScrollToTop />

          <NavBar />

          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* --- PROTECTED ROUTES --- */}
            {/* Body.jsx acts as the Wrapper (Outlet) for these pages */}
            <Route element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/smart-matches" element={<SmartMatches />} />
              <Route path="/assistant" element={<Assistant />} />
            </Route>
          </Routes>

          <Footer />
        
          {/* TOASTER CONFIGURATION */}
          <Toaster 
            position="top-center" 
            reverseOrder={false} 
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b', // Slate-800 (Dark Premium)
                color: '#fff',         // White Text
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                marginTop: '80px', // Pushes it down slightly so it doesn't cover the Navbar
              },
              success: {
                iconTheme: {
                  primary: '#4F46E5', // Indigo 
                  secondary: '#fff',
                },
              },
              error: {
                style: {
                  background: '#fff1f2', // Light Rose
                  color: '#e11d48',      // Rose Red Text
                  border: '1px solid #ffe4e6'
                },
                iconTheme: {
                  primary: '#e11d48',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </div>
    </Provider>
  );
}

export default App;