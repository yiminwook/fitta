import GymCardList from '@/components/common/GymCardList';
import { useOwner } from '@/hooks/useAPI';

const OwnerGymSection = () => {
  const { ownerMyAllData, ownerMyData } = useOwner();

  if (!ownerMyData) return null;

  return (
    <section>
      <GymCardList gymData={ownerMyData.gymList ?? []} />
    </section>
  );
};

export default OwnerGymSection;
