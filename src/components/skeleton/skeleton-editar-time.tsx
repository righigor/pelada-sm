import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonEditarTimes() {
  return (
    <div className="flex flex-col mt-8 container mx-auto px-8 py-8">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border-2">
            <CardHeader className={`py-3 px-4`}>
              <CardTitle className="text-sm font-bold uppercase text-gray-500">
                Time {i + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-2 bg-slate-700 min-h-[300px]">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
