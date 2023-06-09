import GymCardList from '@/components/common/GymCardList';
import fetcher from '@/hooks/fetcher';
import { useUser } from '@/hooks/useAPI';
import { OwnerMyAllDataType, OwnerMyDataType } from '@/types/fittaApi';
import { useQuery } from 'react-query';

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

  return <section>{/* <GymCardList moreLink={false} gymData={ownerMydata.gymList ?? []} /> */}</section>;
};

export default GymSection;
