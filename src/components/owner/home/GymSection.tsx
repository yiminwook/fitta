import GymCardList from '@/components/common/card/GymCardList';
import ownerHome from '@/components/owner/home/Home.module.scss';
import { useOwner } from '@/hooks/useAPI';

const OwnerGymSection = () => {
  const { ownerMyAllData, ownerMyData } = useOwner();

  if (!ownerMyData) return null;

  return (
    <section className={ownerHome['gymSection']}>
      <GymCardList gymData={ownerMyData.gymList.slice(0, 6) ?? []} />
    </section>
  );
};

export default OwnerGymSection;
