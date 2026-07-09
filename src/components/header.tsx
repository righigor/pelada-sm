import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const navItemsDesktopPrincipais = [
    { name: "Jogadores", link: "/jogadores" },
    { name: "Partidas", link: "/partidas" },
    { name: "Premiações", link: "/premiacoes" },
  ];

  const navItemsDesktopSecundarios = [
    { name: "Estatísticas", link: "/estatisticas" },
    { name: "Portal da Transparência", link: "/transparencia" },
    { name: "Vire Mensalista", link: "/caixinha" },
  ];

  const navItemsMobile = [
    { name: "Jogadores", link: "/jogadores" },
    { name: "Partidas", link: "/partidas" },
    { name: "Premiações", link: "/premiacoes" },
    { name: "Estatísticas", link: "/estatisticas" },
    { name: "Portal da Transparência", link: "/transparencia" },
    { name: "Vire Mensalista", link: "/caixinha" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        
        {/* Basta passar a nova prop aqui! */}
        <NavItems 
          items={navItemsDesktopPrincipais} 
          overflowItems={navItemsDesktopSecundarios}
        />

        <NavbarButton
          variant="primary"
          className="hidden items-center md:inline-flex shrink-0"
          onClick={() => navigate("/partida/selecionar-jogadores")}
        >
          <Plus className="mr-1 h-4 w-4" />
          Adicionar registro
        </NavbarButton>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItemsMobile.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}

          <NavbarButton
            onClick={() => (
              navigate("/partida/selecionar-jogadores"),
              setIsMobileMenuOpen(false)
            )}
            variant="primary"
            className="w-full mt-4 flex items-center justify-center"
          >
              <Plus className="h-4 w-4" />
              Adicionar registro
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}