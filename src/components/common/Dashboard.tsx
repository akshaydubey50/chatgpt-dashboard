import {
  Sidebar,
  Plus,
  Globe,
  Lightbulb,
  Sparkles,
  CheckCircle,
  ChevronDownIcon,
} from "lucide-react";
import React, {
  useState,
  useCallback,
  useMemo,
} from "react";
import { Card, CardContent } from "../ui/card";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import DropdownMenu from "../common/UserProfile";

interface SidebarComponentProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DashboardProps extends SidebarComponentProps {}

export const Dashboard: React.FC<DashboardProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const actionButtons = useMemo(
    () => [
      { icon: Globe, label: "Create Image" },
      { icon: Globe, label: "Analyze Image" },
      { icon: Lightbulb, label: "Summarize text" },
      { icon: Lightbulb, label: "Help me write" },
      { icon: Lightbulb, label: "More" },
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
      } flex flex-col items-center justify-end lg:justify-center w-full h-screen transition-all`}
    >
      <div className="flex items-center justify-between w-full mt-2 px-4 py-2 transition-all">
        <div className="flex items-center space-x-4">
          {!isSidebarOpen && (
            <button
              className="p-2 rounded-lg hover:bg-gray-700 transition"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <Sidebar className="text-white" size={20} />
            </button>
          )}

          <div className="ml-4">
            <ChatgptModelList />
          </div>
        </div>
      </div>

      <DropdownMenu />

      <div className="flex flex-col items-center justify-center w-full h-full transition-all relative px-4">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-8 text-center">
          What can I help with?
        </h1>

        <div className="lg:hidden flex flex-wrap gap-3 my-4 mx-4 justify-center text-sm">
          {actionButtons.map((button, index) => (
            <button
              key={`action-${index}`}
              className="px-4 py-2 border-2 border-[#3A3A3A] hover:bg-[#454545] text-xs rounded-full flex items-center gap-2 cursor-pointer transition-colors"
            >
              {button.icon && <button.icon className="text-white" size={16} />}
              {button.label}
            </button>
          ))}
        </div>

        <div className="w-full max-w-4xl px-4 lg:relative lg:mt-8 absolute bottom-4 sm:bottom-2 md:bottom-4">
          <textarea
            className="bg-[#303030] rounded-2xl lg:rounded-3xl resize-none outline-none px-4 py-4 w-full mb-4"
            rows={4}
            placeholder="Ask Anything"
            aria-label="Ask a question"
          />

          <div className="flex gap-3 absolute  top-16 px-4 text-sm">
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

          <div className="hidden lg:flex flex-wrap gap-3 my-4 mx-4 justify-start text-sm">
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

      <p className="text-center fixed bottom-4 text-[#9B9A9A] text-xs">
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
};

export const ChatgptModelList: React.FC = () => {
  const [showChatGptList, setShowChatGptList] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowChatGptList((prev) => !prev);
  };

  return (
    <div className="flex space-x-4 relative text-white cursor-pointer">
    <button
      onClick={toggleDropdown}
      className="hover:bg-secondary hover:rounded-xl cursor-pointer px-3 p-2 flex space-x-2 items-center transition-colors"
      aria-expanded={showChatGptList}
      aria-haspopup="true"
    >
      <span>ChatGPT</span>
      <ChevronDownIcon size={16} />
    </button>
  
    {showChatGptList && (
      <div className="absolute w-80 top-12 lg:-left-2 -left-16 z-50">
        <Card className="bg-accent text-white p-2 rounded-xl border-accent shadow-lg">
          <CardContent className="space-y-4 px-0">
            <div className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-border transition-colors">
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
  
            <div className="flex items-center justify-between px-2 py-1 lg:px-4 lg:py-2 rounded-lg cursor-pointer hover:bg-border transition-colors">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} />
                <div>
                  <p className="text-sm font-semibold">ChatGPT</p>
                  <p className="text-xs text-gray-400">
                    Great for everyday tasks
                  </p>
                </div>
              </div>
              <input type="radio" checked readOnly className="accent-blue-500" />
            </div>
  
            <div className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-border cursor-pointer border-t border-gray-700 pt-2 transition-colors">
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
