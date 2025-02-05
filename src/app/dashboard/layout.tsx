import Link from "next/link";
import { Home, Calendar, Dumbbell, FileSpreadsheet, Database, Users, Settings, Trophy, Medal } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: Medal, label: "Leaderboard", href: "/dashboard/leaderboard" },
    { icon: Trophy, label: "Records", href: "/dashboard/records" },
    { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
    { icon: Dumbbell, label: "Weightroom", href: "/dashboard/weightroom" },
    { icon: Database, label: "Data", href: "/dashboard/data" },
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
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
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