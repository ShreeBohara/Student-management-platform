import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import StudentsPage from "./pages/StudentsPage";
import ChatPage from "./pages/ChatPage";
import { useEffect } from "react";

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    localStorage.setItem("smp.currentView", pathname);
  }, [pathname]);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <Navigation />
      <main className="flex-1 p-4 overflow-auto">
        <Routes>
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/" element={<Navigate to="/students" replace />} />
          <Route path="*" element={<Navigate to="/students" replace />} />
        </Routes>
      </main>
    </div>
  );
}
