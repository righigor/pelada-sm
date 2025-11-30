import { IconAlertCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <IconAlertCircle className="size-16 text-gray-600" />

      <p className="mt-5 text-xl text-gray-700">
        Ops! Parece que essa página não existe ou foi movida.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 text-sm font-medium leading-5 text-white bg-blue-900 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out shadow-md"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}