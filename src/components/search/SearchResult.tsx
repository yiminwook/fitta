import { MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchResultSectionProps {}

const SearchResultSection = ({}: SearchResultSectionProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  return (
    <section>
      <div>{query}</div>
    </section>
  );
};

export default SearchResultSection;
