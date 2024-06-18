import "./style.css";

export default function ActionButton({ onClick = () => {}, title, icon }) {
  return (
    <button className="action-button" onClick={onClick}>
      <img src={icon} alt={`icon-${title}`} />
    </button>
  );
}
