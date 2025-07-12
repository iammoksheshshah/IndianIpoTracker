import { useState } from "react";
import { type Ipo } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface IpoTableProps {
  ipos: Ipo[];
  isLoading?: boolean;
  error?: string;
}

export function IpoTable({ ipos, isLoading, error }: IpoTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(ipos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIpos = ipos.slice(startIndex, endIndex);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'open': return 'ipo-status-open';
      case 'upcoming': return 'ipo-status-upcoming';
      case 'closed': return 'ipo-status-closed';
      default: return '';
    }
  };

  const getActionButton = (ipo: Ipo) => {
    switch (ipo.currentStatus) {
      case 'open':
        return (
          <Button className="ipo-btn-apply">
            <i className="fas fa-edit mr-1"></i>Apply
          </Button>
        );
      case 'upcoming':
        if (ipo.isPreApply) {
          return (
            <Button className="ipo-btn-pre-apply">
              <i className="fas fa-clock mr-1"></i>Pre-Apply
            </Button>
          );
        }
        return (
          <Button className="ipo-btn-disabled" disabled>
            <i className="fas fa-clock mr-1"></i>Upcoming
          </Button>
        );
      case 'closed':
        if (ipo.allotmentLink) {
          return (
            <Button className="ipo-btn-check" asChild>
              <a href={ipo.allotmentLink} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-check mr-1"></i>Check Allotment
              </a>
            </Button>
          );
        }
        return (
          <Button className="ipo-btn-disabled" disabled>
            <i className="fas fa-hourglass-half mr-1"></i>Waiting
          </Button>
        );
      default:
        return (
          <Button className="ipo-btn-disabled" disabled>
            N/A
          </Button>
        );
    }
  };

  const getPremiumBadge = (ipo: Ipo) => {
    if (!ipo.premium || !ipo.premiumPercentage) {
      return <span className="premium-neutral">N/A</span>;
    }

    const percentage = parseFloat(ipo.premiumPercentage);
    const className = percentage > 30 ? 'premium-high' : 'premium-positive';

    return (
      <span className={className}>
        +{ipo.premium} ({percentage}%)
      </span>
    );
  };

  const formatPrice = (ipo: Ipo) => {
    if (!ipo.minPrice && !ipo.maxPrice) return 'TBA';
    if (ipo.minPrice === ipo.maxPrice) return `₹${ipo.minPrice}`;
    return `₹${ipo.minPrice}-${ipo.maxPrice}`;
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="text-red-500">
            <i className="fas fa-exclamation-triangle text-2xl mb-2"></i>
            <p className="text-lg font-medium">Error loading IPO data</p>
            <p className="text-sm text-gray-600 mt-1">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (ipos.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="text-gray-500">
            <i className="fas fa-search text-2xl mb-2"></i>
            <p className="text-lg font-medium">No IPOs found</p>
            <p className="text-sm text-gray-600 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {/* Table Header */}
      <CardHeader className="border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">IPO Listings</h3>
          <div className="text-sm text-gray-500">
            <span>{ipos.length}</span> total records
          </div>
        </div>
      </CardHeader>

      {/* Responsive Table */}
      <div className="overflow-x-auto hidden md:block">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-left">Company</TableHead>
              <TableHead className="text-left">Price Range</TableHead>
              <TableHead className="text-left">Open Date</TableHead>
              <TableHead className="text-left">Close Date</TableHead>
              <TableHead className="text-left">Premium</TableHead>
              <TableHead className="text-left">Lot Size</TableHead>
              <TableHead className="text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentIpos.map((ipo) => (
              <TableRow
                key={ipo.id}
                className={`hover:bg-gray-50 transition-colors ${getStatusClass(ipo.currentStatus)}`}
              >
                <TableCell>
                  <div className="flex items-center">
                    {ipo.iconUrl ? (
                      <img
                        src={ipo.iconUrl}
                        alt={`${ipo.name} logo`}
                        className="h-10 w-10 rounded-lg object-cover mr-3"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center mr-3">
                        <i className="fas fa-building text-gray-400"></i>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ipo.name}</div>
                      <div className="text-sm text-gray-500">{ipo.exchange}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium text-gray-900">{formatPrice(ipo)}</div>
                </TableCell>
                <TableCell className="text-sm text-gray-900">{ipo.openDate}</TableCell>
                <TableCell className="text-sm text-gray-900">{ipo.closeDate}</TableCell>
                <TableCell>{getPremiumBadge(ipo)}</TableCell>
                <TableCell className="text-sm text-gray-900">{ipo.lotSize || 'TBA'}</TableCell>
                <TableCell>{getActionButton(ipo)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View (visible on small screens) */}
      <div className="block md:hidden space-y-4 p-2">
        {currentIpos.map((ipo) => (
          <Card key={ipo.id} className="p-4 space-y-2">
            <div className="flex items-center gap-3">
              {ipo.iconUrl ? (
                <img
                  src={ipo.iconUrl}
                  alt={`${ipo.name} logo`}
                  className="h-12 w-12 rounded-md object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ) : (
                <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md">
                  <i className="fas fa-building text-gray-400"></i>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{ipo.name}</h3>
                <p className="text-xs text-gray-500">{ipo.exchange}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium text-gray-600">Price:</span>{" "}
                {formatPrice(ipo)}
              </div>
              <div>
                <span className="font-medium text-gray-600">Premium:</span>{" "}
                {getPremiumBadge(ipo)}
              </div>
              <div>
                <span className="font-medium text-gray-600">Open:</span> {ipo.openDate}
              </div>
              <div>
                <span className="font-medium text-gray-600">Close:</span> {ipo.closeDate}
              </div>
              <div>
                <span className="font-medium text-gray-600">Lot:</span>{" "}
                {ipo.lotSize || "TBA"}
              </div>
            </div>

            <div>{getActionButton(ipo)}</div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, ipos.length)}</span> of{' '}
              <span className="font-medium">{ipos.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="rounded-l-md"
              >
                <i className="fas fa-chevron-left"></i>
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "bg-blue-50 border-blue-500 text-blue-600" : ""}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="rounded-r-md"
              >
                <i className="fas fa-chevron-right"></i>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </Card>
  );
}
