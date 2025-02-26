import React, { useState, useEffect, useRef } from "react";
import {
  Settings,
  Users,
  Sliders,
  Monitor,
  Hexagon,
  Search,
  LogOut,
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

// Define TypeScript interfaces for menu items and sections
interface MenuItem {
  icon: keyof typeof iconMap;
  label: string;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

// Mapping of icons to Lucide icons
const iconMap = {
  Users,
  Sliders,
  Settings,
  Monitor,
  Hexagon,
  Search,
  LogOut,
} as const;

const menuItems: MenuSection[] = [
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
];

const UserProfileDropdownMenu: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { logout, user } = useAuth0();

  const handleClick = (item: MenuItem) => {
    if (item.label === "Log out") {
      logout({ returnTo: window.location.origin });
    } else {
      console.log(`Clicked on ${item.label}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderMenuItem = (item: MenuItem) => {
    const IconComponent = iconMap[item.icon];

    return (
      <button
        key={item.label}
        onClick={() => handleClick(item)}
        className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-zinc-700 text-white"
      >
        <IconComponent size={20} className="text-white" />
        <span>{item.label}</span>
      </button>
    );
  };

  console.log(user);

  return (
    <>
      <div className="absolute top-4 right-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
          className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-white font-bold"
        >
          <img
            src={user?.picture}
            alt={user?.nickname}
            className="rounded-full w-8 h-8 lg:w-full lg:h-full"
          />
        </div>
      </div>

      {showMenu && (
        <div ref={menuRef} className="absolute top-16 right-4 z-50">
          <div className="w-72 bg-accent rounded-lg shadow-lg overflow-hidden">
            {menuItems.map((section, index) => (
              <React.Fragment key={section.section}>
                <div className="p-3 space-y-1">
                  {section.items.map(renderMenuItem)}
                </div>
                {index < menuItems.length - 1 && (
                  <hr className="border-border" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileDropdownMenu;
