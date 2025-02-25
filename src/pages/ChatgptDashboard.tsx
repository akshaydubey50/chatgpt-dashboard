import {
  Sidebar,
  Plus,
  Globe,
  Menu,
  ChevronDown,
  MoreHorizontal,
  Lightbulb,
  Cpu,
  Sparkles,
  CheckCircle,
  ChevronDownIcon,
  LucideIcon,
} from "lucide-react";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Card, CardContent } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import SidebarJson from "../constant/Sidebar.json";
import DropdownMenu from "../components/common/UserProfile";

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
    <main className="text-white flex h-screen transition-all bg-[#212121]">
      {/* Sidebar with Smooth Transition */}
      <div
        className={`bg-[#171717] w-64 flex items-center justify-center fixed h-full transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarComponent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main Content (Dashboard) */}
      <div
        className={`flex-1 bg-[#212121] flex flex-col items-center justify-center transition-all duration-500 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Dashboard
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </main>
  );
};

// Dashboard Content Component
const Dashboard: React.FC<DashboardProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  // Action buttons for the textarea
  const actionButtons = useMemo(
    () => [
      { icon: Globe, label: "Create Image" },
      { icon: Globe, label: "Analyze Image" },
      { icon: Lightbulb, label: "Summarize text" },
      { icon: Lightbulb, label: "Help me write" },
    ],
    []
  );

  // Toggle sidebar function
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, [setIsSidebarOpen]);

  return (
    <div
      className={`${
        isSidebarOpen ? "col-span-10" : "col-span-12"
      } flex flex-col items-center justify-center w-full h-full transition-all`}
    >
      {/* Top Menu when sidebar is closed */}
      {!isSidebarOpen && (
        <div className="flex space-x-4 absolute top-5 left-5 text-white">
          <button
            className="hover:bg-[#2f2f2f] hover:rounded-xl cursor-pointer px-3 p-2 transition-colors"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <Sidebar className="text-white" size={20} />
          </button>
          <ChatgptModelList />
        </div>
      )}
      {isSidebarOpen && (
        <div className="absolute top-4 left-72 transition-all duration-700 ">
          <ChatgptModelList />
        </div>
      )}

      {/* User Profile Dropdown */}
      <DropdownMenu />

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          What can I help with?
        </h1>

        {/* Input Area */}
        <div className="relative w-full max-w-4xl">
          <textarea
            className="bg-[#303030] rounded-3xl resize-none outline-none px-4 py-4 w-full"
            rows={4}
            placeholder="Ask Anything"
            aria-label="Ask a question"
          />

          {/* Quick Actions */}
          <div className="flex gap-3 absolute top-16 px-4 text-sm">
            <button className="px-3 py-3 border-2 border-[#3A3A3A] hover:bg-[#3A3A3A] rounded-full cursor-pointer transition-colors">
              <Plus className="text-white" size={18} />
            </button>
            <button className="px-4 py-2 border-2 border-[#3A3A3A] hover:bg-[#454545] rounded-full flex items-center gap-2 cursor-pointer transition-colors">
              <Globe className="text-white" size={16} /> Search
            </button>
            <button className="px-4 py-2 border-2 border-[#3A3A3A] hover:bg-[#454545] rounded-full flex items-center gap-2 cursor-pointer transition-colors">
              <Lightbulb className="text-white" size={16} /> Hover me
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 my-4 mx-4 justify-start text-sm">
            {actionButtons.map((button, index) => (
              <button
                key={`action-${index}`}
                className="px-4 py-2 border-2 border-[#3A3A3A] hover:bg-[#454545] rounded-full flex items-center gap-2 cursor-pointer transition-colors"
              >
                <button.icon className="text-white" size={16} /> {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-center fixed bottom-4 text-[#9B9A9A] text-xs">
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
};

// Sidebar Component
const SidebarComponent: React.FC<SidebarComponentProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const [stickyHeader, setStickyHeader] = useState<string>("Yesterday"); // Default sticky section
  const yesterdayRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle sidebar function
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, [setIsSidebarOpen]);

  // Intersection Observer for sticky header
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top <= 0) {
          setStickyHeader("Previous 7 Days");
        } else {
          setStickyHeader("Yesterday");
        }
      },
      { root: containerRef.current, threshold: 0.1 }
    );

    if (previousRef.current) {
      observer.observe(previousRef.current);
    }

    return () => {
      if (previousRef.current) {
        observer.unobserve(previousRef.current);
      }
    };
  }, []);

  return (
    <section
      className={`col-span-2 bg-[#171717] flex flex-col transition-all ${
        isSidebarOpen ? "w-64" : "w-16"
      } h-screen`}
    >
      {/* Sidebar Toggle Button */}
      <aside className="relative">
        <button
          className="absolute top-5 left-5 p-2 hover:bg-[#2f2f2f] rounded-xl cursor-pointer transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Sidebar className="text-white" size={20} />
        </button>
      </aside>

      {/* Sticky Header */}
      <div className="sticky top-16 px-3 z-10 bg-[#171717] py-2">
        <p className="text-xs text-gray-400">{stickyHeader}</p>
      </div>

      {/* Scrollable List View with Custom Scrollbar */}
      <div
        ref={containerRef}
        className="overflow-y-auto px-4 py-2 text-sm text-white mt-16 max-h-[calc(100vh-140px)] custom-scrollbar"
      >
        {/* Yesterday's Activities */}
        <div ref={yesterdayRef}>
          {SidebarJson?.RecentActivities?.Yesterday?.map(
            (item: string, index: number) => (
              <div
                key={`yesterday-${index}`}
                className="mb-2 cursor-pointer flex justify-between items-center px-3 py-1 rounded-md hover:bg-[#2F2F2F] transition-all group"
              >
                <span className="overflow-hidden  whitespace-nowrap">
                  {item}
                </span>
                <MoreHorizontal
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            )
          )}
        </div>

        {/* Previous 7 Days Activities */}
        <div ref={previousRef}>
          {SidebarJson?.RecentActivities?.["Previous 7 Days"]?.map(
            (item: string, index: number) => (
              <div
                key={`previous-${index}`}
                className="mb-2 cursor-pointer flex justify-between items-center px-3 py-1 rounded-md hover:bg-[#2F2F2F] transition-all group"
              >
                <span className="overflow-hidden  whitespace-nowrap">
                  {item}
                </span>
                <MoreHorizontal
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Upgrade Plan Button */}
      <div className="p-4 mt-auto">
        <button className="flex space-x-3 items-center text-white hover:bg-[#2A2A2A] p-2 rounded-lg transition-colors w-full">
          <span>
            <Cpu
              size={30}
              className="border text-white border-[#2f2f2f] p-2 rounded-full"
            />
          </span>
          <span className="flex flex-col items-start">
            <span>Upgrade Plan</span>
            <span className="text-xs text-[#9B9A9A]">
              More access to the best models
            </span>
          </span>
        </button>
      </div>
    </section>
  );
};

// ChatGPT Model Selection Component
const ChatgptModelList: React.FC = () => {
  const [showChatGptList, setShowChatGptList] = useState<boolean>(false);

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    setShowChatGptList((prev) => !prev);
  }, []);

  return (
    <div className="flex space-x-4 relative text-white">
      <button
        onClick={toggleDropdown}
        className="hover:bg-[#2f2f2f] hover:rounded-xl cursor-pointer px-3 p-2 flex space-x-2 items-center transition-colors"
        aria-expanded={showChatGptList}
        aria-haspopup="true"
      >
        <span>ChatGPT</span>
        <ChevronDownIcon size={16} />
      </button>

      {showChatGptList && (
        <div className="absolute w-80 top-12 -left-2 z-50">
          <Card className="bg-[#3A3A3A] text-white p-2 rounded-xl border-[#3A3A3A] shadow-lg">
            <CardContent className="space-y-4 px-0">
              {/* ChatGPT Plus Option */}
              <div className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-[#454545] transition-colors">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-yellow-400" size={18} />
                  <div>
                    <p className="text-sm font-semibold">ChatGPT Plus</p>
                    <p className="text-xs text-gray-400">
                      Our smartest model & more
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="text-white border-gray-600 px-3 py-1 hover:bg-[#555555] transition-colors"
                >
                  Upgrade
                </Button>
              </div>

              {/* ChatGPT Free Option */}
              <div className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-[#454545] transition-colors">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  <div>
                    <p className="text-sm font-semibold">ChatGPT</p>
                    <p className="text-xs text-gray-400">
                      Great for everyday tasks
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  checked
                  readOnly
                  className="accent-blue-500"
                />
              </div>

              {/* Temporary Chat Option */}
              <div className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[#454545] cursor-pointer border-t border-gray-700 pt-2 transition-colors">
                <p className="text-sm font-semibold">Temporary chat</p>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatgptDashboard;
