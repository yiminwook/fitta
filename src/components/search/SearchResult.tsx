import { useSearchParams } from 'react-router-dom';
import GymCardList from '@/components/common/card/GymCardList';
import { DummyGym } from '@/components/home/RecommandSection';

interface SearchResultSectionProps {}

const SearchResultSection = ({}: SearchResultSectionProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  return (
    <section>
      <div>{query}</div>
      <GymCardList gymData={DummyGym} />
    </section>
  );
};

export default SearchResultSection;
