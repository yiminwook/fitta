import gymCard from '@/components/common/card/GymCard.module.scss';
import { Link, useLocation } from 'react-router-dom';

interface GymCardProps {
  name: string;
  id: number;
  population: number;
  address: string;
}

const GymCard = ({ name, id, population, address }: GymCardProps) => {
  const { pathname } = useLocation();

  const createLink = () => {
    switch (pathname) {
      case '/':
        return `/gym/${id}`;
      case '/search':
        return `/gym/${id}`;
      default:
        return /\/gym/i.test(pathname) === true ? `${pathname}/${id}` : `${pathname}/gym/${id}`;
    }
  };

  return (
    <Link to={createLink()}>
      <div className={gymCard['card']}>
        <div>
          <img src="https://placehold.co/200x200" alt="card_image" />
        </div>
        <div>
          <h3>{name}</h3>
          <ul>
            <li>인원수: {population}</li>
            <li>{address}</li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default GymCard;
