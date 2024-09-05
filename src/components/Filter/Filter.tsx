import React from 'react';
import './style.scss';

interface Props {
  filter: string;
  setFilter: (filter: string) => void;
}
const FILTER_OPTIONS = [
  { value: 'title', label: 'По названию' },
  { value: 'artist_title', label: 'По артисту' },
];

export const Filter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <div className="filter">
      <select value={filter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)}>
        {FILTER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
