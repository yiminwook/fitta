/* eslint-disable react-hooks/exhaustive-deps */
import gymCard from '@/components/common/card/GymCard.module.scss';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface GymCardProps {
  name: string;
  id: number;
  address: string;
  currentIndex: number;
  lastContentsIndex: number;
  handleInfinityScroll?: () => void;
}

const GymCard = ({ name, id, address, currentIndex, lastContentsIndex, handleInfinityScroll }: GymCardProps) => {
  const target = useRef<HTMLDivElement>(null);
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

  const onIntersect: IntersectionObserverCallback = useCallback(
    (items, observer) => {
      if (!handleInfinityScroll) return;
      const currentTarget = target.current;
      const isIntersecting = items[0].isIntersecting;
      if (!(currentTarget && isIntersecting && currentIndex === lastContentsIndex)) return;
      //마지막 요소가 관찰될때만
      handleInfinityScroll();
      observer.unobserve(currentTarget);
    },
    [target, lastContentsIndex],
  );

  useEffect(() => {
    if (!handleInfinityScroll) return;
    const currentTarget = target.current;
    if (!(currentTarget && currentIndex === lastContentsIndex)) return;
    //마지막 요소만 관찰
    const observer = new IntersectionObserver(onIntersect, { rootMargin: '100%' });
    observer.observe(currentTarget);

    return () => observer.disconnect();
  }, [target, lastContentsIndex]);

  return (
    <Link to={createLink()}>
      <div className={gymCard['card']} ref={target}>
        <div>
          <img src="https://placehold.co/200x200" alt="card_image" />
        </div>
        <div>
          <h3>{name}</h3>
          <ul>
            <li>{address}</li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default GymCard;
