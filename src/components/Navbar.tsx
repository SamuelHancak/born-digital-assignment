import { type FC, useState } from "react";
import CallDialog from "./CallDialog";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import CallButton from "./CallButton";

const Navbar: FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isCallDialogOpen, setIsCallDialogOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "organization", label: "Organization" },
    { id: "account", label: "Account" },
    { id: "help", label: "Help" },
  ] as const;

  return (
    <>
      <nav className="w-full py-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between tracking-wide">
          <DesktopNav
            navItems={navItems}
            currentPage={currentPage}
            onNavItemClick={setCurrentPage}
          />

          <MobileMenu
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            navItems={navItems}
            currentPage={currentPage}
            onNavItemClick={setCurrentPage}
          />

          <CallButton onClick={() => setIsCallDialogOpen(true)} />
        </div>
      </nav>

      <CallDialog
        isOpen={isCallDialogOpen}
        onClose={() => setIsCallDialogOpen(false)}
      />
    </>
  );
};

export default Navbar;
