import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, 
  Users, 
  Sliders, 
  Monitor, 
  Hexagon, 
  Search, 
  LogOut 
} from 'lucide-react';

const DropdownMenu = () => {
  // Icon mapping object to reference Lucide icons by name
  const iconMap = {
    Users,
    Sliders,
    Settings,
    Monitor,
    Hexagon,
    Search,
    LogOut
  };
  
  // Menu items stored as JSON data
  const menuItems = [
    {
      section: "main",
      items: [
        { icon: "Users", label: "Explore GPTs" },
        { icon: "Sliders", label: "Customize ChatGPT" },
        { icon: "Settings", label: "Settings" }
      ]
    },
    {
      section: "secondary",
      items: [
        { icon: "Monitor", label: "Download the Windows app" },
        { icon: "Hexagon", label: "Upgrade Plan" },
        { icon: "Search", label: "Get ChatGPT search extension" },
        { icon: "LogOut", label: "Log out" }
      ]
    }
  ];
  
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Render menu item
  const renderMenuItem = (item) => {
    const IconComponent = iconMap[item.icon];
    
    return (
      <button 
        key={item.label} 
        className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-zinc-700 text-white"
      >
        <IconComponent size={20} className="text-white" />
        <span>{item.label}</span>
      </button>
    );
  };
  
  return (
    <>
      {/* Avatar button */}
      <div className="absolute top-4 right-4">
        <div 
          onClick={(e) => {
            e.stopPropagation(); // Prevent immediate close
            setShowMenu((prev) => !prev);
          }}
          className="w-10 h-10 rounded-full bg-orange-600 cursor-pointer flex items-center justify-center text-white font-bold"
        >
          A
        </div>
      </div>
      
      {/* Dropdown Menu */}
       {showMenu&&(
        <div ref={menuRef} className="absolute top-16 right-4 z-50">
          <div className="w-72 bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
            {menuItems.map((section, index) => (
              <React.Fragment key={section.section}>
                <div className="p-3 space-y-1">
                  {section.items.map(renderMenuItem)}
                </div>
                {index < menuItems.length - 1 && <hr className="border-zinc-700" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
