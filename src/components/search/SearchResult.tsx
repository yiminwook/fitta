import { useSearchParams } from 'react-router-dom';

const SearchResultSection = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  return (
    <section>
      <div>{query}</div>
    </section>
  );
};

export default SearchResultSection;
