import { Card, CardContent } from "@/components/ui/card";

export default function FielSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="animate-pulse overflow-hidden border-t-4 border-muted"
        >
          <CardContent className="flex items-center gap-4 p-5">
            <div className="h-14 w-14 rounded-md bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-16 rounded bg-muted" />
              <div className="h-4 w-28 rounded bg-muted" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
