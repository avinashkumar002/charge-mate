import Container from "@/components/Container/Container";
import Skeleton from "@/components/Skeleton/Skeleton";

export default function ChargerDetailsLoading() {
  return (
    <section className="min-h-screen py-20 bg-[#FAFAFA]">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Back button skeleton */}
          <Skeleton className="h-6 w-32 mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Image skeleton */}
              <Skeleton className="w-full h-64 md:h-80 rounded-2xl" />

              {/* Details card skeleton */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E5E5]">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2 mb-6" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-20 rounded-xl" />
                  ))}
                </div>

                <Skeleton className="h-px w-full mb-6" />
                <Skeleton className="h-6 w-32 mb-3" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </div>

            {/* Sidebar skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
                <Skeleton className="h-10 w-32 mb-6" />
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-10 rounded-lg" />
                  ))}
                </div>
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}