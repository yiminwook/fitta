import GymCardList from '@/components/common/card/GymCardList';
import Pagination from '@/components/common/pagination/Pagination';
import { DummyGym } from '@/components/home/RecommandSection';
import { useMember } from '@/hooks/useAPI';

const GymListSection = () => {
  const { memberMyData } = useMember();

  if (!memberMyData) return null;
  console.log(memberMyData);

  return (
    <section>
      <GymCardList gymData={DummyGym} />
      <GymCardList gymData={[]} />
      <Pagination totalPage={5} />
    </section>
  );
};

export default GymListSection;
