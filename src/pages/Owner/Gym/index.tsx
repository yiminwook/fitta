import GymListSection from '@/components/owner/gym/GymListSection';
import { useUser } from '@/hooks/useAPI';
import { Link } from 'react-router-dom';

interface OwnerGymProps {}

const OwnerGym = ({}: OwnerGymProps) => {
  const { myData } = useUser();

  if (myData === undefined) {
    return null;
  }

  return (
    <>
      <section>
        <Link to={`/owner/${myData!.id}/gym/new/edit`}>새 헬스장 추가하기!</Link>
      </section>
      <GymListSection />
    </>
  );
};

export default OwnerGym;
