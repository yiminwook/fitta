import GymCardList from '@/components/common/GymCardList';
import { useOwner, useUser } from '@/hooks/useAPI';

const GymSection = () => {
  const { myData } = useUser();
  const { ownerMyAllData, ownerMyData } = useOwner();

  console.log('AllData >> ', ownerMyAllData);
  console.log('OwnerData >> ', ownerMyData);

  if (!ownerMyData) return null;

  return (
    <section>
      <GymCardList moreLink={false} gymData={ownerMyData.gymList ?? []} />
    </section>
  );
};

export default GymSection;
