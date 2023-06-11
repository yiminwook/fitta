import search from '@/components/search/Search.module.scss';
import { searchHistoryLocalStorage } from '@/models/localStorage';
import { Dispatch, memo, RefObject, SetStateAction, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiDelete } from 'react-icons/fi';
import { useSearchLocalStorage } from '@/hooks/useLocalStorage';

interface SearchHistoryProps {
  focusIndex: number;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  searchHistoryRef: RefObject<HTMLUListElement>;
}

const SearchHistory = ({ focusIndex, setFocusIndex, searchHistoryRef }: SearchHistoryProps) => {
  const { searchHistoryData, refetchSearchHistoryData } = useSearchLocalStorage();

  const onDelete = useCallback(
    (index: number) => {
      searchHistoryLocalStorage.deleteOneDataByIndex(index);
      refetchSearchHistoryData();
    },
    [searchHistoryLocalStorage, searchHistoryData],
  );

  const onReset = useCallback(() => {
    searchHistoryLocalStorage.reset();
    refetchSearchHistoryData();
  }, [searchHistoryLocalStorage]);

  const onHover = useCallback(
    (index: number) => {
      setFocusIndex(() => index);
    },
    [focusIndex, setFocusIndex],
  );

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
      <ul ref={searchHistoryRef}>
        {searchHistoryData.map((history, index) => (
          <li
            key={`search-hitory-${index}`}
            className={index === focusIndex ? search['focus'] : ''}
            onMouseEnter={() => onHover}
          >
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
