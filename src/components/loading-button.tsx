import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function LoadingButton({ isLoading, children, ...props }: { isLoading: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : children}
    </Button>
  );
}