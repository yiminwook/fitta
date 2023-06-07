import gymCard from '@/components/common/GymCard.module.scss';
import GymCard from '@/components/common/GymCard';
import { Link } from 'react-router-dom';
import { GymType } from '@/types/fittaApi';

interface GymCardListProps {
  moreLink?: boolean;
  gymData: GymType[];
}

const GymCardList = ({ gymData, moreLink = false }: GymCardListProps) => {
  return (
    <>
      <div className={gymCard['cardList']}>
        <ul>
          {gymData.map(({ name, id, members, staffs, address }) => (
            <li key={`gymCard-${id}`}>
              <GymCard id={id} name={name} population={1 + members.length + staffs.length} address={address} />
            </li>
          ))}
        </ul>
        {moreLink ? <Link to="/search">+더보기</Link> : null}
      </div>
    </>
  );
};

export default GymCardList;
