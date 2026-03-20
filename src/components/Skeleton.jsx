export function SkeletonSection() {
  return (
    <section className="bg-black px-11 py-24">
      <div className="container mx-auto">
        <div className="h-10 w-48 bg-gray-800 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="py-10">
              <div className="w-full aspect-[2/3] bg-gray-800 rounded-md animate-pulse" />
              <div className="mt-2 px-1 space-y-2">
                <div className="h-6 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
