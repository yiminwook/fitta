import { useOwner, useUser } from '@/hooks/useAPI';

const OwnerProfileSection = () => {
  const { myData } = useUser();
  const { ownerMyAllData, ownerMyData } = useOwner();

  return <section></section>;
};

export default OwnerProfileSection;
