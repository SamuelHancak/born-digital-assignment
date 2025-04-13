import { type FC } from "react";

type CallButtonProps = {
  onClick: () => void;
};

const CallButton: FC<CallButtonProps> = ({ onClick }) => (
  <button
    className="bg-primary-fourth font-medium text-[#2d3532] px-6 py-2 rounded-2xl hover-ring transition-shadow cursor-pointer"
    onClick={onClick}
  >
    Call Jessica
  </button>
);

export default CallButton;
