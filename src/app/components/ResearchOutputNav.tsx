import { Link, useLocation } from "react-router";
import { BookOpen, Award, Coins } from "lucide-react";

export function ResearchOutputNav() {
  const location = useLocation();
  
  const tabs = [
    {
      name: "Journal Articles",
      path: "/publications/articles",
      icon: <BookOpen size={20} />,
      activePaths: ["/publications", "/publications/articles"]
    },
    {
      name: "Awards",
      path: "/publications/awards",
      icon: <Award size={20} />,
      activePaths: ["/publications/awards"]
    },
    {
      name: "Grants & Fundings",
      path: "/publications/grants",
      icon: <Coins size={20} />,
      activePaths: ["/publications/grants"]
    }
  ];

  return (
    <nav className="flex flex-wrap gap-4 mb-12">
      {tabs.map((tab) => {
        const isActive = tab.activePaths.includes(location.pathname);
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.icon}
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
