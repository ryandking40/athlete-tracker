'use client';

import Link from "next/link";
import { useState } from "react";
import { 
  Home, 
  Calendar, 
  Dumbbell, 
  FileSpreadsheet, 
  Database, 
  Users, 
  Settings, 
  Trophy, 
  Medal,
  ChevronDown,
  ChevronRight,
  Clipboard,
  ListChecks,
  ScrollText,
  ClipboardCheck,
  LineChart,
  PenLine
} from "lucide-react";

const Sidebar = () => {
  const [isWeightroomOpen, setIsWeightroomOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    {
      icon: Dumbbell,
      label: "Weightroom",
      href: "/dashboard/weightroom",
      subItems: [
        { icon: Clipboard, label: "Workouts", href: "/dashboard/weightroom/workouts" },
        { icon: ListChecks, label: "Exercises", href: "/dashboard/weightroom/exercises" },
        { icon: ScrollText, label: "Sheet Builder", href: "/dashboard/weightroom/sheet-builder" },
      ],
    },
    {
      icon: Database,
      label: "Data",
      href: "/dashboard/data",
      subItems: [
        { icon: ClipboardCheck, label: "Test Entry", href: "/dashboard/data/test-entry" },
        { icon: PenLine, label: "Workout Entry", href: "/dashboard/data/workout-entry" },
        { icon: LineChart, label: "Reports", href: "/dashboard/data/reports" },
      ],
    },
    { icon: Medal, label: "Leaderboard", href: "/dashboard/leaderboard" },
    { icon: Trophy, label: "Records", href: "/dashboard/records" },
    { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
    { icon: Users, label: "Rosters", href: "/dashboard/rosters" },
    { icon: FileSpreadsheet, label: "Powerlifting", href: "/dashboard/powerlifting" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="h-screen w-[200px] bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-red-600">Athlete Tracker</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => {
                      if (item.label === "Weightroom") {
                        setIsWeightroomOpen(!isWeightroomOpen);
                      } else if (item.label === "Data") {
                        setIsDataOpen(!isDataOpen);
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {(item.label === "Weightroom" ? isWeightroomOpen : isDataOpen) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {((item.label === "Weightroom" && isWeightroomOpen) || 
                    (item.label === "Data" && isDataOpen)) && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={subItem.href}
                            className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
} 