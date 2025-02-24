import {
  Sidebar,
  Plus,
  Globe,
  Menu,
  ChevronDown,
  Sparkles,
  CheckCircle,
  ChevronDownIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Switch } from "../components/ui/switch.tsx";
import { Button } from "../components/ui/button";

export default function ChatgptDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
}

const Dashboard = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={` ${
        isSidebarOpen ? "col-span-10 " : "col-span-12 "
      } flex flex-col items-center justify-center transition-all`}
    >
      {!isSidebarOpen && (
        <div className="flex space-x-4 absolute top-5 left-5 text-white ">
          <button
            className=" hover:bg-[#2f2f2f] hover:rounded-xl cursor-pointer px-3 p-2"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <Sidebar className="text-white" size={20} />
          </button>
          <ChatgptModelList />
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-8 text-center">
        What can I help with?
      </h1>
      <div className="relative">
        <textarea
          className="bg-[#303030] rounded-3xl resize-none outline-none  px-4 py-4 "
          rows={4}
          cols={90}
          placeholder="Ask Anything"
        />
        <div className="flex gap-3 absolute top-16 px-4 text-sm">
          <button className="px-3 py-3 border-2 border-[#3A3A3A] hover:bg-[#3A3A3A] rounded-full cursor-pointer">
            <Plus className="text-white" size={18} />
          </button>
          <button className="px-4 py-2 border-2 border-[#3A3A3A] hover:bg-[#454545] rounded-full flex items-center gap-2 cursor-pointer">
            <Globe className="text-white" size={16} /> Search
          </button>
          {/* <Tooltip>
            <TooltipTrigger> */}
          <button className="px-4 py-2 border-2 border-[#3A3A3A] hover:bg-[#454545] rounded-full flex items-center gap-2 cursor-pointer">
            Hover me
          </button>
          {/* </TooltipTrigger>
            <TooltipContent>Think before responding</TooltipContent>
          </Tooltip> */}
        </div>
      </div>
    </div>
  );
};

const SidebarComponent = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <aside className="col-span-2  bg-[#171717] flex items-center justify-center transition-all">
      <button
        className="absolute top-5 left-5 px-3 p-2  hover:bg-[#2f2f2f] hover:rounded-xl cursor-pointer"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <Sidebar className="text-white" size={20} />
      </button>
      <p className="text-white">Hello</p>
    </aside>
  );
};

const ChatgptModelList = () => {
  const [showChatGptList, setShowChatGptList] = useState(false);
  return (
    <>
      <div className="flex space-x-4 relative text-white ">
        <button
          className=" hover:bg-[#2f2f2f] hover:rounded-xl cursor-pointer px-3 p-2 flex space-x-2"
          onClick={() => setShowChatGptList(true)}
        >
          <span>ChatGPT</span>
          <ChevronDownIcon />
        </button>

      {showChatGptList && (
        <div className="absolute w-80  top-12 -left-2">
          <Card className="bg-[#3A3A3A] text-white p-2 rounded-xl border-[#3A3A3A] ">
            <CardContent className="space-y-4 px-0">
              <div className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-[#454545]">
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
                  className="text-white border-gray-600 px-3 py-1"
                >
                  Upgrade
                </Button>
              </div>
              <div className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-[#454545]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  <div>
                    <p className="text-sm font-semibold">ChatGPT</p>
                    <p className="text-xs text-gray-400">
                      Great for everyday tasks
                    </p>
                  </div>
                </div>
                <input type="radio" checked readOnly className="" />
              </div>
              <div className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[#454545] cursor-pointer border-t border-gray-700 pt-2">
                <p className="text-sm font-semibold">Temporary chat</p>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
        
      )}
      </div>

    </>
  );
};
