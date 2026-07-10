import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function DuplasSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} className="h-full animate-pulse">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="h-5 w-5 rounded bg-muted" />
            <div className="h-5 w-40 rounded bg-muted" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="flex items-center gap-2">
                <div className="h-4 w-6 rounded bg-muted" />
                <div className="h-8 w-8 rounded-md bg-muted" />
                <div className="h-4 flex-1 rounded bg-muted" />
                <div className="h-8 w-8 rounded-md bg-muted" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
