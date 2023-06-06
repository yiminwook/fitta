import search from '@/components/search/Search.module.scss';
import { searchHistoryLocalStorage } from '@/models/localStorage';
import { memo, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiDelete } from 'react-icons/fi';

interface SearchHistoryProps {}

const SearchHistory = ({}: SearchHistoryProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const onDelete = (index: number) => {
    searchHistoryLocalStorage.deleteOneDataByIndex(index);
    setSearchHistory((pre) => pre.filter((_history, idx) => idx !== index));
  };

  const onReset = () => {
    searchHistoryLocalStorage.reset();
    setSearchHistory(() => []);
  };

  useEffect(() => {
    const history = searchHistoryLocalStorage.Data;
    setSearchHistory(() => history);
  }, [searchParams]);

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
      <ul>
        {searchHistory.map((history, index) => (
          <li key={`search-hitory-${index}`}>
            <div>
              <Link to={`/search?query=${history}`}>{history}</Link>
              <button type="button" onClick={() => onDelete(index)}>
                <FiDelete size="1rem" color="inherit" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default memo(SearchHistory);
