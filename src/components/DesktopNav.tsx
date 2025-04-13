import { type FC } from "react";
import NavItem from "./NavItem";

export type DesktopNavProps = {
  navItems: ReadonlyArray<{ id: string; label: string }>;
  currentPage: string;
  onNavItemClick: (id: string) => void;
};

const DesktopNav: FC<DesktopNavProps> = ({
  navItems,
  currentPage,
  onNavItemClick,
}) => {
  return (
    <div className="text-primary-first font-semibold hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          {...item}
          currentPage={currentPage}
          onClick={onNavItemClick}
        />
      ))}
    </div>
  );
};

export default DesktopNav;
