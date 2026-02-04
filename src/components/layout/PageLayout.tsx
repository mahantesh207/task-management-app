import { Header } from "./Header";

interface PageLayoutProps {
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
  fab?: React.ReactNode;
}

export function PageLayout({
  title,
  onBack,
  children,
  fab,
}: PageLayoutProps) {
  return (
    <div className="page">
      <Header title={title} onBack={onBack} />
      <main className="content">{children}</main>
      {fab}
    </div>
  );
}
