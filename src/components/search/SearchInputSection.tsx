import { useSearchParams } from 'react-router-dom';
import search from '@/components/search/Search.module.scss';
import { ChangeEvent, FormEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import SearchHistory from '@/components/search/SeachHistory';
import { searchHistoryLocalStorage } from '@/models/localStorage';
import { BiSearch } from 'react-icons/bi';
import useStopPropagation from '@/hooks/useStopPropagation';

interface SearchInputSectionProps {}

const SearchInputSection = ({}: SearchInputSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const { stopPropagation } = useStopPropagation();

  const openHistory = useCallback(() => {
    setShowHistory(() => true);
  }, [showHistory]);

  const closeHistory = useCallback(() => {
    if (showHistory === false) return;
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
    closeHistory();
  }, [searchParams]);

  useEffect(() => {
    const body = document.querySelector('body')!;
    body.addEventListener('click', closeHistory);
    return () => body.removeEventListener('click', closeHistory);
  }, []);

  return (
    <section className={search['searchInputSection']} onClick={closeHistory}>
      <form onSubmit={onSubmit}>
        <div onClick={stopPropagation}>
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
