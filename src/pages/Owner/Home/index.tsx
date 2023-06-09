import OwnerGymSection from '@/components/owner/home/GymSection';
import OwnerProfileSection from '@/components/owner/home/ProfileSection';
import OwnerSummarySection from '@/components/owner/home/SummarySection';

const OwnerHome = () => {
  return (
    <>
      <OwnerProfileSection />
      <OwnerSummarySection />
      <OwnerGymSection />
    </>
  );
};

export default OwnerHome;
