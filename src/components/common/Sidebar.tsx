import {
  Sidebar,
  MoreHorizontal,
  Cpu,
  SearchIcon,
  EditIcon,
} from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import SidebarJson from "../../constant/Sidebar.json";

// Type definitions
interface SidebarComponentProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DashboardProps extends SidebarComponentProps {}

export const SidebarComponent: React.FC<SidebarComponentProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const [stickyHeader, setStickyHeader] = useState<string>("Yesterday");
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, [setIsSidebarOpen]);



  return (
    <section
      className={`md:relative bg-primary flex flex-col transition-[max-width] duration-300 ease-in-out z-40 
      ${
        isSidebarOpen ? "max-w-64" : "max-w-16"
      } h-screen md:z-30 overflow-x-hidden`}
    >
      <aside className="px-2 py-4">
        <div className="flex space-x-4 justify-between items-center">
          <button
            className="p-2 hover:bg-secondary rounded-xl cursor-pointer transition-colors"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Sidebar className="text-white" size={20} />
          </button>
          <div className="">
            <button className="p-2 hover:bg-secondary rounded-xl cursor-pointer transition-colors">
              <SearchIcon className="text-white" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-xl cursor-pointer transition-colors">
              <EditIcon className="text-white" />
            </button>
          </div>
        </div>
      </aside>

      <div className="sticky top-16 px-3 z-10 bg-primary py-2">
        <p className="text-xs text-gray-400">{stickyHeader}</p>
      </div>

      <div
        className="overflow-y-auto px-4 py-2 text-sm text-white max-h-[calc(100vh-140px)] custom-scrollbar"
      >
        <div>
          {(SidebarJson?.RecentActivities?.Yesterday || []).map(
            (item, index) => (
              <div
                key={`yesterday-${index}`}
                className="mb-2 cursor-pointer flex justify-between items-center px-3 py-1 rounded-md hover:bg-secondary transition-all group"
              >
                <span className="overflow-hidden whitespace-nowrap">
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
        <div>
          {(SidebarJson?.RecentActivities?.["Previous 7 Days"] || []).map(
            (item: string, index: number) => (
              <div
                key={`previous-${index}`}
                className="mb-2 cursor-pointer flex justify-between items-center px-3 py-1 rounded-md hover:bg-secondary transition-all group"
              >
                <span className="overflow-hidden whitespace-nowrap">
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

      <div className="p-4 mt-auto">
        <button className="flex space-x-3 items-center text-white hover:bg-secondary p-2 rounded-lg transition-colors w-full">
          <Cpu
            size={30}
            className="border text-white border-secondary p-2 rounded-full"
          />
          <span className="flex flex-col items-start">
            <span>Upgrade Plan</span>
            <span className="text-xs text-textMuted text-left">
              More access to the best models
            </span>
          </span>
        </button>
      </div>
    </section>
  );
};
