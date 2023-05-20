import { useSearchParams } from 'react-router-dom';
import search from '@/components/search/Search.module.scss';
import { ChangeEvent, FormEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import SearchHistory from '@/components/search/SeachHistory';
import { searchHistoryLocalStorage } from '@/models/localStorage';
import { BiSearch } from 'react-icons/bi';

interface SearchInputSectionProps {
  showHistory: boolean;
  openHistory: (e: MouseEvent) => void;
  closeHistory: (e: MouseEvent) => void;
}

const SearchInputSection = ({ showHistory, openHistory, closeHistory }: SearchInputSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const query = searchParams.get('query') ?? '';
    setSearchInput(() => query);
  }, [searchParams]);

  const onChangeSearchInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target) return;
      setSearchInput(() => e.target.value);
    },
    [searchInput],
  );

  const onSearch = useCallback(() => {
    searchHistoryLocalStorage.addOneData(searchInput);
    setSearchParams(() => ({ query: searchInput }));
  }, [searchHistoryLocalStorage, searchInput]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSearch();
    },
    [onSearch],
  );

  return (
    <section className={search['searchInputSection']} onClick={closeHistory}>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" onChange={onChangeSearchInput} value={searchInput} onClick={openHistory} />
          {showHistory ? <SearchHistory /> : null}
          <button type="submit">
            <BiSearch size="1.5rem" color="inherit" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchInputSection;
