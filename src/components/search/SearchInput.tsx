import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useCallback, useState } from 'react';

interface SearchInputProps {
  searchInputValue: string;
  setSearchInputValue: Dispatch<SetStateAction<string>>;
  openHistory: () => void;
  onKeydown: (e: KeyboardEvent) => void;
}

const SearchInput = ({ searchInputValue, setSearchInputValue, openHistory, onKeydown }: SearchInputProps) => {
  const onChangeSearchInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    setSearchInputValue(() => e.target.value);
  }, []);

  return (
    <input
      type="text"
      onChange={onChangeSearchInput}
      value={searchInputValue}
      onFocus={openHistory}
      onKeyDown={onKeydown}
    />
  );
};

export default SearchInput;
