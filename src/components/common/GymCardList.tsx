import gymCard from '@/components/common/GymCard.module.scss';
import GymCard from '@/components/common/GymCard';
import { GYMCARD_LIST_LENGTH } from '@/consts';
import { Link } from 'react-router-dom';

interface GymCardListProps {}

const GymCardList = ({}: GymCardListProps) => {
  return (
    <>
      <div className={gymCard['cardList']}>
        <ul>
          {new Array(GYMCARD_LIST_LENGTH).fill(null).map((arr, index) => (
            <li key={index}>
              <GymCard />
            </li>
          ))}
        </ul>
        <Link to="/search">+더보기</Link>
      </div>
    </>
  );
};

export default GymCardList;
