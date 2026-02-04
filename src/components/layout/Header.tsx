import { ArrowLeftIcon } from "../../assets/icons/ArrowLeftIcon";
import { ARIA_LABELS } from "../../constants/app";

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export function Header({ title, onBack }: HeaderProps) {
  return (
    <header className={`app-header ${onBack ? "has-back" : ""}`}>
      {onBack && (
        <button className="back-btn" onClick={onBack} aria-label={ARIA_LABELS.BACK_BTN}>
          <ArrowLeftIcon />
        </button>
      )}
      <h1>{title}</h1>
    </header>
  );
}
