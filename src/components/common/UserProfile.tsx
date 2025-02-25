import React, { useState, useCallback, useMemo } from "react";
import {
  Settings,
  Users,
  Sliders,
  Monitor,
  Hexagon,
  Search,
  LogOut,
  LucideIcon
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

// Type definitions
type MenuItem = {
  icon: string;
  label: string;
};

type MenuSection = {
  section: string;
  items: MenuItem[];
};

// Props interface
interface DropdownMenuProps {
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ className = "" }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  // Icon mapping with proper typing
  const iconMap: Record<string, LucideIcon> = useMemo(() => ({
    Users,
    Sliders,
    Settings,
    Monitor,
    Hexagon,
    Search,
    LogOut,
  }), []);

  // Menu items defined once using useMemo
  const menuItems: MenuSection[] = useMemo(() => [
    {
      section: "main",
      items: [
        { icon: "Users", label: "Explore GPTs" },
        { icon: "Sliders", label: "Customize ChatGPT" },
        { icon: "Settings", label: "Settings" },
      ],
    },
    {
      section: "secondary",
      items: [
        { icon: "Monitor", label: "Download the Windows app" },
        { icon: "Hexagon", label: "Upgrade Plan" },
        { icon: "Search", label: "Get ChatGPT search extension" },
        { icon: "LogOut", label: "Log out" },
      ],
    },
  ], []);

  // Toggle menu with useCallback to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setShowMenu(prev => !prev);
  }, []);

  // Close menu when clicking outside (can be attached to a useEffect)
  const closeMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  // Memoized render function for menu items
  const renderMenuItem = useCallback((item: MenuItem) => {
    const IconComponent = iconMap[item.icon];
    
    return (
      <button
        key={item.label}
        className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-zinc-700 text-white transition-colors"
      >
        <IconComponent size={20} className="text-white shrink-0" />
        <span className="truncate">{item.label}</span>
      </button>
    );
  }, [iconMap]);

  return (
    <>
      {/* Avatar Button */}
      <div className={`absolute top-4 right-4 ${className}`}>
        <button
          onClick={toggleMenu}
          className="w-10 h-10 rounded-full cursor-pointer bg-orange-600 flex items-center justify-center text-white font-bold transition-transform hover:scale-105"
          aria-label="Open user menu"
          aria-expanded={showMenu}
          aria-haspopup="true"
        >
          A
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-16 right-4 z-50 w-72">
          <Card className="bg-[#3A3A3A] text-white rounded-xl border-[#3A3A3A] shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {menuItems.map((section, index) => (
                <React.Fragment key={section.section}>
                  <div className="px-3 py-2 select-none text-sm space-y-1">
                    {section.items.map(renderMenuItem)}
                  </div>
                  {index < menuItems.length - 1 && (
                    <hr className="border-zinc-700 mx-3" />
                  )}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default DropdownMenu;