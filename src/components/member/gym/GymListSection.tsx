import GymCardList from '@/components/common/card/GymCardList';
import Pagination from '@/components/common/pagination/Pagination';
import { useMember, useOwner } from '@/hooks/useAPI';

const GymListSection = () => {
  const { memberMyData } = useMember();

  if (!memberMyData) return null;
  console.log(memberMyData);

  return (
    <section>
      <GymCardList gymData={[]} />
      <Pagination totalPage={5} />
    </section>
  );
};

export default GymListSection;
