export default function Footer() {
  return (
    <footer className="w-full py-4 mt-8 border-t text-center text-xs text-gray-500 flex justify-center items-center gap-1 flex-col md:flex-row">
      &copy; {new Date().getFullYear()} Pelada SM. Todos os direitos reservados. <a href="https://github.com/righigor" target="_blank" rel="noopener noreferrer">@righigor</a>
    </footer>
  );
}