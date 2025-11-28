import { Skeleton } from "../ui/skeleton";

export default function SkeletonCard() {
  return (
    <div>
      <Skeleton className="mb-2 p-4 flex flex-row justify-between items-center w-full h-20 md:h-26" />
      <Skeleton className="mb-2 p-4 flex flex-row justify-between items-center w-full h-20 md:h-26" />
      <Skeleton className="mb-2 p-4 flex flex-row justify-between items-center w-full h-20 md:h-26" />
      <Skeleton className="mb-2 p-4 flex flex-row justify-between items-center w-full h-20 md:h-26" />
      <Skeleton className="mb-2 p-4 flex flex-row justify-between items-center w-full h-20 md:h-26" />
    </div>
  );
}
