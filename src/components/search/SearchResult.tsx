/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from 'react-router-dom';
import GymCardList from '@/components/common/card/GymCardList';
import { useEffect, useState } from 'react';
import { GymType } from '@/types/fittaApi';
import { useGymList } from '@/hooks/useAPI';

interface SearchResultSectionProps {}

const SearchResultSection = ({}: SearchResultSectionProps) => {
  const [searchParams] = useSearchParams();
  const [gymList, setGymList] = useState<GymType[]>([]);
  const { gymListData, fetchNextPageGymListData, hasNextPageGymListData } = useGymList();

  const resetGymList = () => {
    setGymList(() => []);
  };

  const getGymList = () => {
    if (gymListData?.pages === undefined) return;
    if (hasNextPageGymListData === false) return;
    const pageLastIdx = gymListData.pages.length - 1;
    const nextPage = gymListData.pages[pageLastIdx];
    setGymList((pre) => [...pre, ...nextPage.content]);
  };

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    getGymList();
  }, [gymListData]);

  useEffect(() => {
    resetGymList();
    getGymList();
  }, [searchParams]);

  return (
    <section>
      <GymCardList
        gymData={gymList}
        handleInfinityScroll={fetchNextPageGymListData}
        linkElement={
          gymListData && gymListData.pages.length >= 3 ? <button onClick={scrollUp}>맨위로 이동</button> : null
        }
      />
    </section>
  );
};

export default SearchResultSection;
