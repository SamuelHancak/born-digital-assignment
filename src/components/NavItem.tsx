import { type FC } from "react";

type NavItemProps = {
  id: string;
  label: string;
  currentPage: string;
  onClick: (id: string) => void;
  isMobile?: boolean;
};

const NavItem: FC<NavItemProps> = ({
  id,
  label,
  currentPage,
  onClick,
  isMobile = false,
}) => {
  return (
    <a
      href="#"
      onClick={() => onClick(id)}
      className={`${isMobile && "block"} relative group`}
    >
      {label}
      <span
        className={`absolute -bottom-0 left-0 w-full h-0.5 bg-primary-fourth rounded-full transform transition-transform duration-200
          ${currentPage === id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
      ></span>
    </a>
  );
};

export default NavItem;
