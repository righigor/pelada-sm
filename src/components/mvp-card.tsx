import AvatarLoad from "./avatar-load";
import { Card, CardContent, CardHeader } from "./ui/card";

interface MvpCardProps {
  title: string;
  icon: React.ReactNode;
  name: string | null | undefined;
  fotoUrl: string | null;
  stat: number | null;
  type: 'gols' | 'assistencias' | 'gols contra' | 'mvp';
  fallbackMessage: string,
}

export default function MvpCard({ title, icon, name, fotoUrl, stat, type, fallbackMessage }: MvpCardProps) {
  if (stat === null) {
    return (
      <Card>
        <CardHeader>
          <CardHeader className="text-center">
            <div className="flex items-center gap-2 w-full justify-center">
            {icon}
            <h4 className="text-lg font-semibold">{title}</h4>
            </div>
          </CardHeader>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-1">
            <p className="text-md text-gray-400">{fallbackMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card>
      <CardHeader>
        <CardHeader className="text-center">
          <div className="flex items-center gap-1 w-full justify-center">
          {icon}
          <h4 className="text-lg font-semibold">{title}</h4>
          </div>
        </CardHeader>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-1">
          <AvatarLoad avatarSizeClasses="size-40" jogador={{ nome: name ?? "", fotoUrl }} />
          <h5 className="text-lg font-medium">{name}</h5>
          {type !== "mvp" && <p className="text-md text-gray-400">{stat} {type}</p>}
        </div>
      </CardContent>
    </Card>
  );
}