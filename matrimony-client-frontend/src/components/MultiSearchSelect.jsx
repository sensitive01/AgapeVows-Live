import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

const MultiSearchSelect = ({ options, value, onChange, placeholder, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Ensure value is an array
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  // Filter options based on search term and exclude already selected
  const filteredOptions = (options || []).filter((option) => {
    const optionLabel = typeof option === "string" ? option : (option?.label || "");
    const optionValue = typeof option === "string" ? option : (option?.value || "");
    
    const matchesSearch = optionLabel.toLowerCase().includes(searchTerm.toLowerCase());
    const isNotSelected = !selectedValues.includes(optionValue);
    
    return matchesSearch && isNotSelected;
  });

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

  const handleSelect = (option) => {
    const optValue = typeof option === "string" ? option : option.value;
    const newValue = [...selectedValues, optValue];
    onChange({ target: { name, value: newValue } });
    setSearchTerm("");
    setIsOpen(false);
  };

  const removeValue = (valToRemove) => {
    const newValue = selectedValues.filter(v => v !== valToRemove);
    onChange({ target: { name, value: newValue } });
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%" }}>
      {/* Selected Value Display / Input area */}
      <div
        onClick={() => setIsOpen(true)}
        style={{
          width: "100%",
          padding: "6px 12px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#374151",
          background: "#fff",
          cursor: "text",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          alignItems: "center",
          minHeight: "42px",
          transition: "border-color 0.2s ease",
        }}
      >
        {selectedValues.map((val) => (
          <span
            key={val}
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              padding: "2px 8px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "13px",
              fontWeight: "500",
              border: "1px solid #dbeafe",
            }}
          >
            {val}
            <X
              size={14}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                removeValue(val);
              }}
            />
          </span>
        ))}
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          placeholder={selectedValues.length === 0 ? placeholder || "Select..." : ""}
          autoComplete="one-time-code"
          autoCapitalize="none"
          spellCheck="false"
          name={`multi-select-${name}`}
          id={`multi-select-${name}`}
          style={{
            border: "none",
            outline: "none",
            flex: "1",
            minWidth: "60px",
            fontSize: "14px",
            padding: "4px 0",
          }}
        />
        
        <ChevronDown
          size={16}
          style={{
            marginLeft: "auto",
            color: "#9ca3af",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            cursor: "pointer"
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const optLabel = typeof option === "string" ? option : option.label;

              return (
                <div
                  key={index}
                  onClick={() => handleSelect(option)}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#374151",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  {optLabel}
                </div>
              );
            })
          ) : (
            <div
              style={{
                padding: "10px 14px",
                fontSize: "14px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSearchSelect;
