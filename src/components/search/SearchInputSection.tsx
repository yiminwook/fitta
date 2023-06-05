import { useSearchParams } from 'react-router-dom';
import search from '@/components/search/Search.module.scss';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import SearchHistory from '@/components/search/SeachHistory';
import { searchHistoryLocalStorage } from '@/models/localStorage';
import { BiSearch } from 'react-icons/bi';

interface SearchInputSectionProps {}

const SearchInputSection = ({}: SearchInputSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const openHistory = useCallback(() => {
    setShowHistory(() => true);
  }, [showHistory]);

  const closeHistory = useCallback(() => {
    setShowHistory(() => false);
  }, [showHistory]);

  const onChangeSearchInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target) return;
      setSearchInput(() => e.target.value);
    },
    [searchInput],
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      searchHistoryLocalStorage.addOneData(searchInput);
      setSearchParams(() => ({ query: searchInput }));
    },
    [searchHistoryLocalStorage, searchInput],
  );

  useEffect(() => {
    const query = searchParams.get('query') ?? '';
    setSearchInput(() => query);
  }, [searchParams]);

  return (
    <section className={search['searchInputSection']}>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            onChange={onChangeSearchInput}
            value={searchInput}
            onFocus={openHistory}
            onBlur={closeHistory}
          />
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
