import gymCard from '@/components/common/GymCard.module.scss';

interface GymCardProps {}

const GymCard = ({}: GymCardProps) => {
  return (
    <div className={gymCard['card']}>
      <div>
        <img src="https://placehold.co/200x200" alt="card_image" />
      </div>
      <div>
        <h3>타이틀</h3>
        <p>상세정보</p>
      </div>
    </div>
  );
};

export default GymCard;
