import React from 'react'
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { RiAdvertisementLine } from "react-icons/ri";

function Sidebar() {
    const navItems = [
        { name: "Home", path: "/", icon: IoHomeOutline },
        { name: "Billing", path: "/billing", icon: FiUsers },
        
    ];

    return (
        <div>
            {/* bg-[#1f709f] */}
            <div className="w-64 h-screen bg-[#1f709f] text-white flex flex-col p-4 space-y-4">
                <h1 className="text-2xl font-bold mb-6">Breezy</h1>
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `p-2 rounded-xl hover:bg-gray-700 flex gap-2 transition ${
                                isActive ? "bg-gray-700" : ""
                            }`
                        }
                    >
                      
                        <span className="text-[15px]">{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;