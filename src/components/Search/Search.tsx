import React, { useRef, useState } from "react";
import { useSearch } from "../../context/SearchContext.tsx";
import "./style.scss";
export const Search: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setSearchTerm } = useSearch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 400);
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
