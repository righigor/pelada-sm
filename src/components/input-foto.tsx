import { useState, useRef, type ChangeEvent } from 'react';
import { User, Camera } from 'lucide-react';
import { Input } from './ui/input';

interface InputFotoPerfilProps {
  onFileChange: (file: File | null) => void;
}

export default function InputFotoPerfil({ onFileChange }: InputFotoPerfilProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    onFileChange(file); 

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div 
        onClick={handleClick}
        className="relative w-32 h-36 bg-gray-200 border-2 border-gray-400 cursor-pointer 
                   flex items-center justify-center overflow-hidden rounded-md transition-colors hover:bg-gray-300"
      >
        {preview ? (
          <img src={preview} alt="Prévia da Foto de Perfil" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            <User className="w-10 h-10" />
            <span className="text-xs mt-1">Adicionar Foto</span>
          </div>
        )}

        <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
            <Camera className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
