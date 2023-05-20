import { useInput } from '@/hooks/useInput';
import { useSearchParams } from 'react-router-dom';
import search from '@/components/search/Search.module.scss';
import { FormEvent, useCallback, useEffect } from 'react';
import SearchHistory from '@/components/search/SeachHistory';
import { searchHistoryLocalStorage } from '@/models/localStorage';

const SearchInputSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput, onChangeSearchInput] = useInput('');

  useEffect(() => {
    const query = searchParams.get('query') ?? '';
    setSearchInput(() => query);
  }, [searchParams]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      console.log(e);
      e.preventDefault();
      console.log('submit', searchInput);
      searchHistoryLocalStorage.addOneData(searchInput);
      setSearchParams(() => ({ query: searchInput }));
    },
    [searchInput, searchHistoryLocalStorage],
  );

  return (
    <section className={search['searchInputSection']}>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" onChange={onChangeSearchInput} value={searchInput} />
          <SearchHistory />
        </div>
        <button type="submit">검색</button>
      </form>
    </section>
  );
};

export default SearchInputSection;
