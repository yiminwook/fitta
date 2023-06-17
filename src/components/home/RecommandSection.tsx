import GymCardList from '@/components/common/GymCardList';
import { GYMCARD_LIST_LENGTH } from '@/consts';
import { GymType } from '@/types/fittaApi';
import { Link } from 'react-router-dom';

const DummyGym: GymType[] = Array.from({ length: GYMCARD_LIST_LENGTH }, (_, i) => ({
  id: i,
  name: `gym ${i}`,
  address: `address ${i}`,
  genderDivision: 'UNISEX',
  ownerName: 'owner',
  phoneNumber: '01012345634',
  staffs: [],
  members: [],
}));

const RecommandSection = () => {
  return (
    <section>
      <GymCardList gymData={DummyGym} linkElement={<Link to="/search">+더보기</Link>} />
    </section>
  );
};

export default RecommandSection;
