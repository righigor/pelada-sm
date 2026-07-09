import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function HeroPortalSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="animate-pulse bg-muted">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              &nbsp;
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-muted" />
          </CardHeader>
          <CardContent>
            <div className="h-6 w-full rounded bg-muted" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
