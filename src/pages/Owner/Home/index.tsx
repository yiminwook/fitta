import GymSection from '@/components/owner/home/GymSection';
import { useOwner, useUser } from '@/hooks/useAPI';

const OwnerHome = () => {
  const { myData } = useUser();
  const { ownerMyAllData, ownerMyData } = useOwner();

  return (
    <>
      <GymSection />
    </>
  );
};

export default OwnerHome;
