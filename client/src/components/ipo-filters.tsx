import { Button } from "@/components/ui/button";

interface IpoFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  stats?: {
    totalIPOs: number;
    openIPOs: number;
    upcomingIPOs: number;
    closedIPOs: number;
  };
}

const filters = [
  { key: "all", label: "All IPOs", icon: "fas fa-list" },
  { key: "open", label: "Open", icon: "fas fa-door-open" },
  { key: "upcoming", label: "Upcoming", icon: "fas fa-clock" },
  { key: "closed", label: "Closed", icon: "fas fa-lock" },
];

export function IpoFilters({ activeFilter, onFilterChange, stats }: IpoFiltersProps) {
  const getFilterCount = (filterKey: string) => {
    if (!stats) return null;
    
    switch (filterKey) {
      case "all": return stats.totalIPOs;
      case "open": return stats.openIPOs;
      case "upcoming": return stats.upcomingIPOs;
      case "closed": return stats.closedIPOs;
      default: return null;
    }
  };

  const getFilterClass = (filterKey: string) => {
    if (activeFilter === filterKey) {
      return "bg-blue-600 text-white hover:bg-blue-700";
    }
    
    switch (filterKey) {
      case "open":
        return "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100";
      case "upcoming":
        return "bg-yellow-50 text-yellow-600 border border-yellow-200 hover:bg-yellow-100";
      case "closed":
        return "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100";
    }
  };

  return (
    <section className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 py-6">
          {filters.map((filter) => {
            const count = getFilterCount(filter.key);
            return (
              <Button
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${getFilterClass(filter.key)}`}
                variant="outline"
              >
                <i className={`${filter.icon} mr-2`}></i>
                {filter.label}
                {count !== null && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-black/10">
                    {count}
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
