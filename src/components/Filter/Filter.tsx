import './style.scss';
import { FILTER_OPTIONS } from '../../constants';
import { FilterProps } from '../../utils/types';
import { ChangeEvent, FC } from 'react';

export const Filter: FC<FilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="filter">
      <select value={filter} onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)}>
        {FILTER_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
