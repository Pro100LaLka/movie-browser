import { Link } from "react-router";

interface BreadcrumbsProps {
  title: string;
}

function Breadcrumbs({ title }: BreadcrumbsProps) {
  return (
    <div className="text-muted flex gap-2 text-sm">
      <Link to="/movies">Movies</Link>
      <span>/</span>
      <span className="text-foreground">{title}</span>
    </div>
  );
}

export default Breadcrumbs;
