import MapSection from '@/components/gym/Mapsection';
import Head from '@/components/layout/Head';
import { useParams } from 'react-router-dom';

/** 공개용 헬스장 상세페이지 */
const Gym = () => {
  const { gymId } = useParams();

  return (
    <>
      <Head title="GYM" />
      {gymId ? <div>{gymId}</div> : null}
      <MapSection />
    </>
  );
};

export default Gym;
