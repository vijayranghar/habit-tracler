import "./style.css";

export default function TextInput({
  habit,
  handleChange,
  onSubmit,
  onReset,
  isEditMode,
  placeholder,
}) {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder={placeholder}
        value={habit?.title}
        onChange={(e) => handleChange(e, "textbox")}
      />
      <input
        type="date"
        readOnly={isEditMode ? true : false}
        value={habit?.habitStartDate}
        onChange={(e) => handleChange(e, "date")}
      />
      <div className="button-wrapper">
        <button type="submit" onClick={onSubmit}>
          {isEditMode ? "Edit" : "Add"}
        </button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}
