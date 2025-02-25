
import React, {
  useState,
} from "react";
import { SidebarComponent } from "../components/common/Sidebar";
import { Dashboard } from "../components/common/Dashboard";

// Type definitions
interface SidebarComponentProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DashboardProps extends SidebarComponentProps {}

// Main Dashboard Component
const ChatgptDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <main className="flex text-white h-screen transition-all bg-[#212121] relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden transition-opacity duration-500"
          onClick={() => setIsSidebarOpen(false)} // Clicking backdrop closes sidebar
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#171717] flex flex-col overflow-y-auto transition-transform duration-500 ease-in-out shadow-lg h-screen 
    fixed z-50 
    ${isSidebarOpen ? "translate-x-0 " : "-translate-x-full w-64 "}
    `}
      >
        <SidebarComponent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main Content (Dashboard) */}
      <div
        className={`flex-1 bg-[#212121] flex flex-col items-center justify-center transition-all duration-500  `}
      >
        <Dashboard
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </main>
  );
};

export default ChatgptDashboard;
