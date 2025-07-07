import { useState, useRef, useEffect } from "react";
import "./select.css";

const options = [
  "אילת",
  "אשדוד",
  "אשקלון",
  "באר שבע",
  "בית שמש",
  "בת ים",
  "גבעתיים",
  "דימונה",
  "הוד השרון",
  "הרצליה",
  "חדרה",
  "חולון",
  "חיפה",
  "טבריה",
  "ירושלים",
  "כפר סבא",
  "מודיעין",
  "נהריה",
  "נס ציונה",
  "נתניה",
];

interface SelectProps {
  name: string;
  onChange: (option: string) => void;
}

const Select = ({ name, onChange }: SelectProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // When opening, focus on the selected item or first item
      const selectedIndex = selected ? options.indexOf(selected) : 0;
      setFocusedIndex(selectedIndex);
    } else {
      setFocusedIndex(-1);
    }
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    setFocusedIndex(-1);
    onChange(option);
    // Return focus to the select button
    selectRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      // When closed, only handle Enter and Space to open
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleOpen();
      }
      return;
    }

    // When open, handle navigation
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleSelect(options[focusedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        selectRef.current?.focus();
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [focusedIndex, isOpen]);

  return (
    <div className="custom-select" ref={selectRef}>
      <div
        className="custom-select-header"
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
        aria-activedescendant={
          isOpen && focusedIndex >= 0 ? `option-${focusedIndex}` : undefined
        }
      >
        <div className="selected">{selected ? selected : "אולם תצוגה*"}</div>
        <div className="arrow-wrapper">
          <span className="arrow" />
        </div>
      </div>
      {isOpen && (
        <div className="list-wrapper">
          <ul
            className="custom-select-list"
            ref={listRef}
            role="listbox"
            aria-labelledby="select-label"
            tabIndex={-1}
          >
            {options.map((option, index) => (
              <li
                key={option}
                id={`option-${index}`}
                className={`custom-select-item ${
                  selected === option ? "selected" : ""
                } ${focusedIndex === index ? "focused" : ""}`}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setFocusedIndex(index)}
                role="option"
                aria-selected={selected === option}
                tabIndex={-1}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selected && <input type="hidden" name={name} value={selected} />}
    </div>
  );
};

export default Select;
