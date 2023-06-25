import gymCard from '@/components/common/card/GymCard.module.scss';
import GymCard from '@/components/common/card/GymCard';
import { GymType } from '@/types/fittaApi';
import { ReactNode } from 'react';

interface GymCardListProps {
  linkElement?: ReactNode;
  gymData: GymType[];
  handleInfinityScroll?: () => void;
}

const GymCardList = ({ gymData, linkElement = null, handleInfinityScroll }: GymCardListProps) => {
  return (
    <>
      <div className={gymCard['cardList']}>
        <ul>
          {gymData.map(({ name, id, address }, idx) => (
            <li key={`gymCard-${id}-${name}`}>
              <GymCard
                id={id}
                name={name}
                address={address}
                currentIndex={idx + 1}
                lastContentsIndex={gymData.length}
                handleInfinityScroll={handleInfinityScroll}
              />
            </li>
          ))}
        </ul>
        {linkElement}
      </div>
    </>
  );
};

export default GymCardList;
