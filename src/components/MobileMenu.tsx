import { type FC } from "react";
import { LuAlignJustify, LuX } from "react-icons/lu";
import NavItem from "./NavItem";
import { type DesktopNavProps } from "./DesktopNav.tsx";

type MobileMenuProps = DesktopNavProps & {
  isOpen: boolean;
  onToggle: () => void;
};

const MobileMenu: FC<MobileMenuProps> = ({
  isOpen,
  onToggle,
  navItems,
  currentPage,
  onNavItemClick,
}) => {
  const handleItemClick = (id: string) => {
    onNavItemClick(id);
    onToggle();
  };

  return (
    <>
      <button
        className="md:hidden text-primary-first p-2 cursor-pointer"
        onClick={onToggle}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <LuX className="w-6 h-6" />
        ) : (
          <LuAlignJustify className="w-6 h-6" />
        )}
      </button>

      <div
        className={`md:hidden text-primary-first absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              {...item}
              currentPage={currentPage}
              onClick={handleItemClick}
              isMobile
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
