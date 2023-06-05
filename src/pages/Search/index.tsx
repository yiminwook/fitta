import Head from '@/components/layout/Head';
import SearchInputSection from '@/components/search/SearchInputSection';
import SearchResultSection from '@/components/search/SearchResult';

const Search = () => {
  return (
    <>
      <Head title="Search" />
      <SearchInputSection />
      <SearchResultSection />
    </>
  );
};

export default Search;
