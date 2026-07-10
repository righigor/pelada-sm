import { Card, CardContent } from "@/components/ui/card";

export default function HallSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="animate-pulse overflow-hidden">
          <CardContent className="flex flex-col items-center gap-3 p-6 pt-8">
            <div className="h-24 w-24 rounded-full bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-10 w-16 rounded bg-muted" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
