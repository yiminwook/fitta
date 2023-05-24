import { MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchResultSectionProps {
  closeHistory: (e: MouseEvent) => void;
}

const SearchResultSection = ({ closeHistory }: SearchResultSectionProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  return (
    <section onClick={closeHistory}>
      <div>{query}</div>
    </section>
  );
};

export default SearchResultSection;
