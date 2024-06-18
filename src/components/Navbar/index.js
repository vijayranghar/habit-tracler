import "./style.css";

export default function Navbar({ title }) {
  return (
    <nav className="navbar">
      <div className="container">{title}</div>
    </nav>
  );
}
