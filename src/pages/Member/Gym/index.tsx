import GymListSection from '@/components/member/gym/GymListSection';
import { Link } from 'react-router-dom';

const MemberGym = () => {
  return (
    <>
      <section>
        <Link to="/search">헬스장 찾기</Link>
      </section>
      <GymListSection />
    </>
  );
};

export default MemberGym;
