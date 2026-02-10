import Container from "@/components/Container/Container";
import Skeleton, { ChargerCardSkeleton } from "@/components/Skeleton/Skeleton";

export default function SearchLoading() {
  return (
    <section className="min-h-screen py-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header skeleton */}
          <div className="mb-6">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>

          {/* Filters skeleton */}
          <div className="mb-6">
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>

          {/* Results skeleton */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <ChargerCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}