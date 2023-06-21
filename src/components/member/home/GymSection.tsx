import GymCardList from '@/components/common/card/GymCardList';
import { DummyGym } from '@/components/home/RecommandSection';
import fetcher from '@/hooks/fetcher';
import { useUser } from '@/hooks/useAPI';
import { OwnerMyAllDataType, OwnerMyDataType } from '@/types/fittaApi';

const GymSection = () => {
  const { myData } = useUser();
  // const { data: ownerMyAllData } = useQuery<OwnerMyAllDataType>(`/owners/${myData?.id}/all-view`, fetcher, {
  //   enabled: !!myData,
  // });

  // const { data: ownerMydata } = useQuery<OwnerMyDataType>(`/owners/${myData?.id}`, fetcher, {
  //   enabled: !!myData,
  // });

  // console.log('AllData >> ', ownerMyAllData);
  // console.log('OwnerData >> ', ownerMydata);

  // if (!ownerMydata) return null;

  return (
    <section>
      <GymCardList gymData={DummyGym} />
    </section>
  );
};

export default GymSection;
