import Head from '@/components/layout/Head';
import SearchInputSection from '@/components/search/SearchInputSection';
import SearchResultSection from '@/components/search/SearchResult';
import { MouseEvent, useState } from 'react';

const Search = () => {
  const [showHistory, setShowHistory] = useState(false);
  const openHistory = (e: MouseEvent) => {
    e.stopPropagation();
    setShowHistory(() => true);
  };

  const closeHistory = (e: MouseEvent) => {
    e.stopPropagation();
    if (showHistory === false) return;
    setShowHistory(() => false);
  };

  return (
    <>
      <Head title="Search" />
      <SearchInputSection showHistory={showHistory} openHistory={openHistory} closeHistory={closeHistory} />
      <SearchResultSection closeHistory={closeHistory} />
    </>
  );
};

export default Search;
