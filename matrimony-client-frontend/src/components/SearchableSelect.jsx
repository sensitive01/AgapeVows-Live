import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";

const SearchableSelect = ({ options, value, onChange, placeholder, name, disabled = false, isMulti = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const displayRef = useRef(null);
  const inputRef = useRef(null);
  const optionsListRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = (options || []).filter((option) => {
    const optionLabel = typeof option === "string" ? option : (option?.label || "");
    return optionLabel.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get display value
  const getDisplayValue = () => {
    if (isMulti) {
      if (!Array.isArray(value) || value.length === 0) return "";
      const validValues = value.filter(v => v !== "" && v != null);
      if (validValues.length === 0) return "";
      
      const selectedLabels = validValues.map(val => {
        const selectedOpt = options?.find((opt) => {
          const optValue = typeof opt === "string" ? opt : opt?.value;
          return String(optValue) === String(val);
        });
        return selectedOpt ? (typeof selectedOpt === "string" ? selectedOpt : selectedOpt.label) : val;
      });
      return selectedLabels.length > 0 
        ? `${selectedLabels.length} selected` 
        : "";
    } else {
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
    }
  };

  // Reset focus when search term changes or dropdown opens
  useEffect(() => {
    setFocusedIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [searchTerm, isOpen]);

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsListRef.current) {
      const focusedElement = optionsListRef.current.children[focusedIndex];
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isOpen]);

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
    e?.stopPropagation();
    if (disabled || !option) return;
    const optValue = typeof option === "string" ? option : option.value;
    
    if (isMulti) {
      const exclusiveOptions = ["Doesn't Matter", "Any", "Do not wish to specify", "Don't wish to specify", "Caste No Bar", "None"];
      const currentValues = Array.isArray(value) ? value : [];
      let newValues;

      if (exclusiveOptions.includes(optValue)) {
        if (currentValues.includes(optValue)) {
          newValues = [];
        } else {
          newValues = [optValue];
        }
      } else {
        const filteredValues = currentValues.filter(v => !exclusiveOptions.includes(v));
        if (filteredValues.includes(optValue)) {
          newValues = filteredValues.filter(v => String(v) !== String(optValue));
        } else {
          newValues = [...filteredValues, optValue];
        }
      }

      onChange({ target: { name, value: newValues } });
      // Keep dropdown open and keep focus on input so user can select more
      if (inputRef.current) inputRef.current.focus();
    } else {
      onChange({ target: { name, value: optValue } });
      setIsOpen(false);
      setSearchTerm("");
      
      // Delay focus restoration slightly to ensure dropdown is fully closed
      setTimeout(() => {
        displayRef.current?.focus();
      }, 10);
    }
  };

  return (
    <div 
      ref={dropdownRef} 
      onBlur={(e) => {
        if (!dropdownRef.current?.contains(e.relatedTarget)) {
          setIsOpen(false);
          setSearchTerm("");
        }
      }}
      style={{ position: "relative", width: "100%", zIndex: isOpen ? 1010 : 1 }}
    >
      {/* Selected Value Display */}
      <div
        ref={displayRef}
        tabIndex={disabled ? -1 : 0}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) setIsOpen(!isOpen);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          } else if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
            // User started typing directly while focused
            e.preventDefault();
            e.stopPropagation();
            setSearchTerm(e.key);
            setIsOpen(true);
          } else if (e.key === "Escape") {
            setIsOpen(false);
          }
        }}
        style={{
          width: "100%",
          padding: "6px 12px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "13px",
          color: disabled ? "#9ca3af" : "#374151",
          background: disabled ? "#f3f4f6" : "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: (isMulti && value?.length > 0) ? "flex-start" : "center",
          transition: "border-color 0.2s ease",
          minHeight: "36px",
          maxHeight: "85px",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexWrap: "wrap", gap: "4px", marginRight: "8px", alignItems: "center" }}>
          {isMulti && Array.isArray(value) && value.filter(v => v !== "" && v != null).length > 0 ? (
            value.filter(v => v !== "" && v != null).map((val) => {
              const selectedOpt = options?.find((opt) => {
                const optValue = typeof opt === "string" ? opt : opt?.value;
                return String(optValue) === String(val);
              });
              const label = selectedOpt ? (typeof selectedOpt === "string" ? selectedOpt : selectedOpt.label) : val;

              return (
                <span
                  key={val}
                  style={{
                    background: "#f3e8ff",
                    color: "#5c2a9d",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                    border: "1px solid #e9d5ff",
                  }}
                >
                  {label}
                  <X
                    size={12}
                    style={{ cursor: "pointer", marginLeft: "2px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(e, selectedOpt || val);
                    }}
                  />
                </span>
              );
            })
          ) : (
            <span style={{ color: (!value || (Array.isArray(value) && value.filter(v => v !== "" && v != null).length === 0)) ? "#9ca3af" : (disabled ? "#9ca3af" : "#374151"), whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {getDisplayValue() || placeholder || "Select..."}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          style={{
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            opacity: disabled ? 0.5 : 1,
            marginTop: (isMulti && value?.length > 0) ? "4px" : "0",
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
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setFocusedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setFocusedIndex((prev) => Math.max(prev - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
                    handleSelect(e, filteredOptions[focusedIndex]);
                  }
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  setIsOpen(false);
                  setTimeout(() => displayRef.current?.focus(), 10);
                }
              }}
              placeholder="Search..."
              autoFocus
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                fontSize: "14px",
                outline: "none",
                background: "#f9fafb",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Options List */}
          <div
            ref={optionsListRef}
            style={{
              overflowY: "auto",
              maxHeight: "250px",
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const optValue = typeof option === "string" ? option : option.value;
                const optLabel = typeof option === "string" ? option : option.label;
                const isSelected = isMulti 
                  ? Array.isArray(value) && value.includes(optValue)
                  : String(optValue) === String(value);
                const isFocused = index === focusedIndex;

                return (
                  <div
                    key={index}
                    onClick={(e) => handleSelect(e, option)}
                    style={{
                      padding: "10px 14px",
                      cursor: "pointer",
                      background: isFocused ? "#f3f4f6" : (isSelected ? "#f5f3ff" : "#fff"), 
                      fontWeight: isSelected ? "600" : "400", // Bold for selected
                      fontSize: "14px",
                      color: isSelected ? "#5c2a9d" : "#374151", // Brand color for selected
                      transition: "background 0.15s ease",
                      borderBottom: "1px solid #f9fafb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    <span>{optLabel}</span>
                    {isSelected && <Check size={16} color="#5c2a9d" />}
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
