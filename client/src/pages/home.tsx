import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Ipo } from "@shared/schema";
import { SEOHead } from "@/components/seo-head";
import { SearchBar } from "@/components/search-bar";
import { IpoFilters } from "@/components/ipo-filters";
import { IpoTable } from "@/components/ipo-table";
import { PAGE_SEO } from "@/lib/seo";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch IPO data
const { data: ipos = [], isLoading, error } = useQuery<Ipo[]>({
  queryKey: ["ipos", { status: activeFilter, search: searchQuery }],
  queryFn: ({ queryKey }) => {
    const [_key, params] = queryKey;
    const url = new URL("/api/ipos", window.location.origin);

    if (params.status && params.status !== "all") {
      url.searchParams.set("status", params.status);
    }
    if (params.search) {
      url.searchParams.set("search", params.search);
    }

    return fetch(url.toString()).then(res => res.json());
  },
});

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ["/api/ipos/stats"],
  });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setSearchQuery(""); // Clear search when changing filter
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveFilter("all"); // Reset filter when searching
  };

  return (
    <>
      <SEOHead metadata={PAGE_SEO.home} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Indian Stock Market IPO Listings</h2>
            <p className="text-xl text-blue-100 mb-8">Track real-time IPO premiums, application status, and market insights</p>
            
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* IPO Filter Tabs */}
      <IpoFilters 
        activeFilter={activeFilter} 
        onFilterChange={handleFilterChange}
        stats={stats}
      />

      {/* IPO Listings Table */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IpoTable 
          ipos={ipos} 
          isLoading={isLoading}
          error={error?.message}
        />
      </main>

      {/* Statistics Section */}
      {stats && (
        <section className="bg-white py-16 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Market Overview</h3>
              <p className="text-lg text-gray-600">Real-time IPO market statistics and insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalIPOs}</div>
                <div className="text-gray-700 font-medium">Total IPOs</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.openIPOs}</div>
                <div className="text-gray-700 font-medium">Open IPOs</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.upcomingIPOs}</div>
                <div className="text-gray-700 font-medium">Upcoming IPOs</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                <div className="text-3xl font-bold text-gray-600 mb-2">{stats.avgPremium}%</div>
                <div className="text-gray-700 font-medium">Avg Premium</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
