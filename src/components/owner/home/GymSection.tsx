import GymCardList from '@/components/common/card/GymCardList';
import ownerHome from '@/components/owner/home/Home.module.scss';
import { useOwner, useUser } from '@/hooks/useAPI';
import { Link } from 'react-router-dom';

const OwnerGymSection = () => {
  const { myData } = useUser();
  const { ownerMyAllData, ownerMyData, reverseGymList } = useOwner();

  if (!(myData && ownerMyData)) return null;

  return (
    <section className={ownerHome['gymSection']}>
      <GymCardList
        gymData={reverseGymList.slice(0, 6) ?? []}
        linkElement={<Link to={`/${myData.role}/${myData.id}/gym`}>+더보기</Link>}
      />
    </section>
  );
};

export default OwnerGymSection;
