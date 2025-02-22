import GymCardList from '@/components/common/card/GymCardList';
import Pagination from '@/components/common/pagination/Pagination';
import { GYMCARD_LIST_LENGTH } from '@/consts';
import { useOwner } from '@/hooks/useAPI';
import { GymType } from '@/types/fittaApi';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const GymListSection = () => {
  const { reverseGymList } = useOwner();
  const [searchParams] = useSearchParams();
  const [gymList, setGymList] = useState<GymType[]>([]);

  const sliceGymList = (page: number) => {
    const start = (page - 1) * GYMCARD_LIST_LENGTH;
    const end = start + GYMCARD_LIST_LENGTH;
    setGymList(() => reverseGymList.slice(start, end) ?? []);
  };

  const totalPage = useMemo(() => {
    const gymListLength = reverseGymList.length || 0;
    return Math.ceil(gymListLength / GYMCARD_LIST_LENGTH);
  }, [reverseGymList]);

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    sliceGymList(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <section>
      <GymCardList gymData={gymList} />
      <Pagination totalPage={totalPage} />
    </section>
  );
};

export default GymListSection;
