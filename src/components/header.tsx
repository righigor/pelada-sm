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

export default function Header() {
  const navItems = [
    {
      name: "Jogadores",
      link: "/jogadores",
    },
    {
      name: "Partidas",
      link: "#partidas",
    },
    {
      name: "Estatísticas",
      link: "#estatisticas",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />

        <NavbarButton
          variant="primary"
          className="mr-4 hidden items-center md:inline-flex"
        >
          <Plus className="mr-2 h-4 w-4" />
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
          {navItems.map((item, idx) => (
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
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full mt-4 flex items-center justify-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar registro
            </NavbarButton>

        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
