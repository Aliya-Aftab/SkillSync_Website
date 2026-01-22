
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const FloatingAssistantButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/assistant")}
      className="fixed bottom-6 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-105 transition-all"
      aria-label="Open AI Assistant"
    >
      <FaRobot size={22} />
    </button>
  );
};

export default FloatingAssistantButton;
