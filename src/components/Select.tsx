import { useState } from "react";
import "./select.css";

const options = [
  "תל אביב",
  "נוף גליל",
  "ראשון לציון",
  "טבריה",
  "רעננה",
  "חיפה",
  "אילת",
];

const Select = () => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container">
      <div className="custom-select-header" onClick={toggleOpen}>
        {selected}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="custom-select-list">
          {options.map((option) => (
            <li
              key={option}
              className={`custom-select-item ${
                selected === option ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
