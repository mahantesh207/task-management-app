import { PlusIcon } from "../../assets/icons/PlusIcon";
import { ARIA_LABELS } from "../../constants/app";

interface FloatingButtonProps {
  onClick: () => void;
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <button className="fab" onClick={onClick} aria-label={ARIA_LABELS.ADD_FAB}>
      <PlusIcon />
    </button>
  );
}
