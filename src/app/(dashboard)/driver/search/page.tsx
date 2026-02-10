"use client";
import { useState, useMemo, useCallback } from "react";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import SearchFilters from "@/components/SearchFilters/SearchFilters";
import ChargerListItem from "@/components/ChargerListItem/ChargerListItem";
import { ChargerCardSkeleton } from "@/components/Skeleton/Skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchChargersQuery } from "@/store/services/chargerApi";

const INITIAL_FILTERS = {
  pincode: "",
  charger_type: "",
  min_price: "",
  max_price: "",
  min_power: "",
};

export default function SearchChargersPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  
  // Debounce filters to avoid too many API calls
  const debouncedFilters = useDebounce(filters, 500);

  // Build search params from debounced filters
  const searchParams = useMemo(() => ({
    ...(debouncedFilters.pincode && { pincode: debouncedFilters.pincode }),
    ...(debouncedFilters.charger_type && { charger_type: debouncedFilters.charger_type }),
    ...(debouncedFilters.min_price && { min_price: parseInt(debouncedFilters.min_price) }),
    ...(debouncedFilters.max_price && { max_price: parseInt(debouncedFilters.max_price) }),
    ...(debouncedFilters.min_power && { min_power: parseFloat(debouncedFilters.min_power) }),
  }), [debouncedFilters]);

  // RTK Query - cached & optimized
  const { data: chargers, isLoading, isError, refetch } = useSearchChargersQuery(searchParams);

  // Memoized callbacks to prevent child re-renders
  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  return (
    <ProtectedRoute allowedRole="driver">
      <section className="min-h-screen py-20 bg-[#FAFAFA]">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <Typography variant="h2" weight={600} className="text-black-900">
                Find Chargers
              </Typography>
              <Typography variant="para" className="text-black-600 mt-1">
                Search for available EV chargers near you
              </Typography>
            </div>

            {/* Filters */}
            <div className="mb-6">
              <SearchFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>

            {/* Results */}
            <div className="flex flex-col gap-4">
              {/* Results count */}
              {!isLoading && chargers && (
                <Typography variant="para" className="text-black-600">
                  {chargers.length} charger{chargers.length !== 1 ? "s" : ""} found
                </Typography>
              )}

              {/* Loading state */}
              {isLoading && (
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map((i) => (
                    <ChargerCardSkeleton key={i} />
                  ))}
                </div>
              )}

              {/* Error state */}
              {isError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                  <Typography variant="h4" className="text-red-600 mb-2">
                    Failed to load chargers
                  </Typography>
                  <button
                    onClick={() => refetch()}
                    className="text-[#2C7FFF] hover:underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* Empty state */}
              {!isLoading && !isError && chargers?.length === 0 && (
                <div className="bg-white border border-[#E5E5E5] rounded-xl p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <Typography variant="h4" weight={600} className="text-black-900 mb-2">
                    No chargers found
                  </Typography>
                  <Typography variant="para" className="text-black-600">
                    Try adjusting your filters or search in a different area
                  </Typography>
                </div>
              )}

              {/* Charger list */}
              {!isLoading && !isError && chargers && chargers.length > 0 && (
                <div className="flex flex-col gap-4">
                  {chargers.map((charger) => (
                    <ChargerListItem key={charger.id} charger={charger} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}