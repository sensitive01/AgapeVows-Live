import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SearchableSelect = ({ options, value, onChange, placeholder, name, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = (options || []).filter((option) => {
    const optionLabel = typeof option === "string" ? option : (option?.label || "");
    return optionLabel.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get display value
  const getDisplayValue = () => {
    if (!value || !options) return "";
    const selected = options.find((opt) => {
      const optValue = typeof opt === "string" ? opt : opt?.value;
      return String(optValue) === String(value);
    });
    return selected
      ? typeof selected === "string"
        ? selected
        : (selected?.label || "")
      : "";
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (e, option) => {
    e.stopPropagation();
    if (disabled) return;
    const optValue = typeof option === "string" ? option : option.value;
    onChange({ target: { name, value: optValue } });
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%", zIndex: isOpen ? 1010 : 1 }}>
      {/* Selected Value Display */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) setIsOpen(!isOpen);
        }}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: disabled ? "#9ca3af" : "#374151",
          background: disabled ? "#f3f4f6" : "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "border-color 0.2s ease",
        }}
      >
        <span style={{ color: value ? (disabled ? "#9ca3af" : "#374151") : "#9ca3af" }}>
          {getDisplayValue() || placeholder || "Select..."}
        </span>
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            opacity: disabled ? 0.5 : 1
          }}
        />
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            zIndex: 2000,
            maxHeight: "300px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search Input */}
          <div style={{ padding: "8px", borderBottom: "1px solid #e5e7eb" }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Search..."
              autoFocus
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                fontSize: "14px",
                outline: "none",
                background: "#f9fafb"
              }}
            />
          </div>

          {/* Options List */}
          <div
            style={{
              overflowY: "auto",
              maxHeight: "250px",
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const optValue =
                  typeof option === "string" ? option : option.value;
                const optLabel =
                  typeof option === "string" ? option : option.label;
                const isSelected = String(optValue) === String(value);

                return (
                  <div
                    key={index}
                    onClick={(e) => handleSelect(e, option)}
                    style={{
                      padding: "10px 14px",
                      cursor: "pointer",
                      background: isSelected ? "#f3f4f6" : "#fff",
                      fontSize: "14px",
                      color: "#374151",
                      transition: "background 0.15s ease",
                      borderBottom: "1px solid #f9fafb"
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = "#fff";
                    }}
                  >
                    {optLabel}
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  padding: "20px 14px",
                  fontSize: "14px",
                  color: "#9ca3af",
                  textAlign: "center",
                }}
              >
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
