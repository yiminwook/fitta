import gymCard from '@/components/common/GymCard.module.scss';
import GymCard from '@/components/common/GymCard';
import { GymType } from '@/types/fittaApi';
import { ReactNode } from 'react';

interface GymCardListProps {
  linkElement?: ReactNode;
  gymData: GymType[];
}

const GymCardList = ({ gymData, linkElement = null }: GymCardListProps) => {
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
        {linkElement}
      </div>
    </>
  );
};

export default GymCardList;
