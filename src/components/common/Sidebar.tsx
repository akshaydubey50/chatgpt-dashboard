import {
  Sidebar,
  MoreHorizontal,
  Cpu,
  SearchIcon,
  EditIcon,
} from "lucide-react";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
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
  const yesterdayRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, [setIsSidebarOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStickyHeader(
              entry.target === yesterdayRef.current
                ? "Yesterday"
                : "Previous 7 Days"
            );
          }
        });
      },
      { root: containerRef.current, threshold: 0.1 }
    );

    if (yesterdayRef.current) observer.observe(yesterdayRef.current);
    if (previousRef.current) observer.observe(previousRef.current);

    return () => {
      if (yesterdayRef.current) observer.unobserve(yesterdayRef.current);
      if (previousRef.current) observer.unobserve(previousRef.current);
    };
  }, []);

  return (
    <section
      className={` md:relative bg-[#171717] flex flex-col transition-[max-width] duration-300 ease-in-out z-40 
      ${
        isSidebarOpen ? "max-w-64" : "max-w-16"
      } h-screen md:z-30 overflow-x-hidden`}
    >
      {/* Sidebar Toggle Button */}
      <aside className="px-2 py-4">
        <div className="flex space-x-4 justify-between items-center">
          <button
            className="p-2 hover:bg-[#2f2f2f] rounded-xl cursor-pointer transition-colors"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Sidebar className="text-white" size={20} />
          </button>
          <div className="">
            <button
              className="p-2 hover:bg-[#2f2f2f] rounded-xl cursor-pointer transition-colors"
              aria-label="Search"
            >
              <SearchIcon className="text-white" />
            </button>
            <button
              className="p-2 hover:bg-[#2f2f2f] rounded-xl cursor-pointer transition-colors"
              aria-label="Edit"
            >
              <EditIcon className="text-white" />
            </button>
          </div>
        </div>
      </aside>

      <div className="sticky top-16 px-3 z-10 bg-[#171717] py-2">
        <p className="text-xs text-gray-400">{stickyHeader}</p>
      </div>

      <div
        ref={containerRef}
        className="overflow-y-auto px-4 py-2 text-sm text-white max-h-[calc(100vh-140px)] custom-scrollbar"
      >
        {/* Yesterday's Activities */}
        <div ref={yesterdayRef}>
          {(SidebarJson?.RecentActivities?.Yesterday || []).map(
            (item: string, index: number) => (
              <div
                key={`yesterday-${index}`}
                className="mb-2 cursor-pointer flex justify-between items-center px-3 py-1 rounded-md hover:bg-[#2F2F2F] transition-all group"
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
        <div ref={previousRef}>
          {(SidebarJson?.RecentActivities?.["Previous 7 Days"] || []).map(
            (item: string, index: number) => (
              <div
                key={`previous-${index}`}
                className="mb-2 cursor-pointer flex justify-between items-center px-3 py-1 rounded-md hover:bg-[#2F2F2F] transition-all group"
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


