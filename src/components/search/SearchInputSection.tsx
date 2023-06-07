import { useSearchParams } from 'react-router-dom';
import search from '@/components/search/Search.module.scss';
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import SearchHistory from '@/components/search/SeachHistory';
import { searchHistoryLocalStorage } from '@/models/localStorage';
import { BiSearch } from 'react-icons/bi';
import useStopPropagation from '@/hooks/useStopPropagation';
import useCloseEventListener from '@/hooks/useCloseEventListener';
import SearchInput from '@/components/search/SearchInput';

interface SearchInputSectionProps {}

const SearchInputSection = ({}: SearchInputSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInputValue, setSearchInputValue] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchHistoryRef = useRef<HTMLUListElement>(null);
  const { stopPropagation } = useStopPropagation();

  const resetFocus = useCallback(() => {
    setFocusIndex(() => -1);
  }, []);

  const openHistory = useCallback(() => {
    setShowHistory(() => true);
  }, [showHistory]);

  const closeHistory = useCallback(() => {
    resetFocus();
    setShowHistory(() => false);
  }, [showHistory]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      searchHistoryLocalStorage.addOneData(searchInputValue);
      setSearchParams(() => ({ query: searchInputValue }));
    },
    [searchHistoryLocalStorage, searchInputValue],
  );

  const onKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (showHistory === false) openHistory(); //입력시 최근검색창이 열림

      if (e.key === 'ArrowDown') {
        return setFocusIndex((prev) => (prev + 1) % searchHistory.length);
      }

      if (e.key === 'ArrowUp') {
        if (focusIndex === -1) return; //focus가 없을때 작동x
        if (focusIndex === 0) return resetFocus(); //0일때는 focus 해제
        return setFocusIndex((prev) => (prev - 1 + searchHistory.length) % searchHistory.length);
      }

      if (e.key === 'Escape') {
        return closeHistory();
      }

      if (
        e.key === 'Enter' &&
        showHistory && //최근검색어가 켜져있을때만
        searchHistory.length > 0 &&
        focusIndex >= 0 &&
        searchHistoryRef.current !== null
      ) {
        return setSearchInputValue(() => searchHistoryRef.current!.childNodes[focusIndex].textContent as string);
      }

      resetFocus(); //ArrowDown ArrowUp Esc Enter 외 입력시 focus 해제
    },
    [focusIndex, showHistory, searchHistoryRef, searchHistory],
  );

  useEffect(() => {
    //검색, 새로고침시 리셋
    closeHistory();
    const query = searchParams.get('query') ?? '';
    setSearchInputValue(() => query);
    const history = searchHistoryLocalStorage.Data;
    setSearchHistory(() => history);
  }, [searchParams]);

  useCloseEventListener(closeHistory);

  return (
    <section className={search['searchInputSection']}>
      <form onSubmit={onSubmit} onClick={stopPropagation}>
        <div>
          <SearchInput
            searchInputValue={searchInputValue}
            setSearchInputValue={setSearchInputValue}
            openHistory={openHistory}
            onKeydown={onKeydown}
          />
          {showHistory ? (
            <SearchHistory
              focusIndex={focusIndex}
              setFocusIndex={setFocusIndex}
              searchHistory={searchHistory}
              setSearchHistory={setSearchHistory}
              searchHistoryRef={searchHistoryRef}
            />
          ) : null}
          <button type="submit">
            <BiSearch size="1.5rem" color="inherit" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchInputSection;
