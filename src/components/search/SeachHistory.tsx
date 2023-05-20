import search from '@/components/search/Search.module.scss';
import { searchHistoryLocalStorage } from '@/models/localStorage';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const SearchHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const history = searchHistoryLocalStorage.Data;
    console.log('searchHitory', history);
    setSearchHistory(() => history);
  }, [searchParams]);

  const onSearch = () => {};

  const onDelete = () => {};

  const onReset = () => {
    setSearchHistory(() => []);
    searchHistoryLocalStorage.reset();
  };

  return (
    <section className={search['searchHistory']}>
      <header>
        <h1>최근 검색결과</h1>
        <div>
          <button onClick={onReset} type="button">
            Reset
          </button>
        </div>
      </header>
      <ol>
        {searchHistory.map((history, index) => (
          <li key={`search-hitory-${index}`}>
            <Link to={`/search?query=${history}`}>
              <button type="button" tabIndex={-1}>
                {history}
              </button>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
};
export default SearchHistory;
