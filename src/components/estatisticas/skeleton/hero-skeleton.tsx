import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-4 w-4 rounded bg-muted" />
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 rounded bg-muted" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
