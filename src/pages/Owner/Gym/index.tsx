import GymListSection from '@/components/owner/gym/GymListSection';
import { useOwner, useUser } from '@/hooks/useAPI';
import { Link } from 'react-router-dom';

interface OwnerDetailGymProps {}

const OwnerDetailGym = ({}: OwnerDetailGymProps) => {
  const { myData } = useUser();

  if (myData === undefined) {
    return null;
  }

  return (
    <>
      <GymListSection />
      <div>
        <Link to={`/owner/${myData!.id}/gym/edit`}>추가</Link>
      </div>
      OwnerDetailGym
    </>
  );
};

export default OwnerDetailGym;
