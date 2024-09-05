import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
