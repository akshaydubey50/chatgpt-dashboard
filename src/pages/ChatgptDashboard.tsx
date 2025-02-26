
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

const ChatgptDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <main className="flex text-white h-screen transition-all bg-tertiary  relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden transition-opacity duration-500"
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <div
        className={`bg-primary flex flex-col overflow-y-auto transition-transform duration-500 ease-in-out shadow-lg h-screen 
    fixed z-50 lg:static lg:z-0
    ${isSidebarOpen ? "translate-x-0 " : "-translate-x-full "}
    `}
      >
        <SidebarComponent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div
        className={`flex-1 bg-tertiary  flex flex-col items-center justify-center transition-all duration-500  `}
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
