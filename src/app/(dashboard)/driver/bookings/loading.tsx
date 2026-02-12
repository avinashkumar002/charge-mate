import Container from "@/components/Container/Container";
import Skeleton from "@/components/Skeleton/Skeleton";

export default function BookingsLoading() {
  return (
    <section className="min-h-screen py-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header skeleton */}
          <div className="mb-6">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-5 w-72" />
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>

          {/* Filter skeleton */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-lg" />
            ))}
          </div>

          {/* List skeleton */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}