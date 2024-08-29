import React, { useRef, useState } from "react";
import { useSearch } from "../../context/SearchContext.tsx";
import "./style.scss";
export const Search: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setSearchTerm } = useSearch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };
  return (
    <div className="search">
      <input
        value={value}
        onChange={handleChange}
        type="text"
        placeholder={"search..."}
      />
      <p></p>
    </div>
  );
};
