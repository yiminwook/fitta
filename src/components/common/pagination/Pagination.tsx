import { PAGINATION_SIZE } from '@/consts';
import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import pagination from '@/components/common/pagination/Pagination.module.scss';
import {
  AfterLink,
  BeforeLink,
  FirstLink,
  LastLink,
  PaginationItem,
} from '@/components/common/pagination/PaginationChild';

interface PaginationProps {
  totalPage: number;
}

const Pagination = ({ totalPage }: PaginationProps) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    return Number(searchParams.get('page')) || 1;
  }, [searchParams]);

  let init = (Math.ceil(currentPage / PAGINATION_SIZE) - 1) * PAGINATION_SIZE + 1;
  if (init <= 0) init = 1;

  const pageArray = Array.from(Array(PAGINATION_SIZE), (x, i) => {
    const page = i + init;
    return page > totalPage ? null : page;
  });

  return (
    <ul className={pagination['pagination']}>
      <FirstLink currentPage={currentPage} />
      <BeforeLink initialPage={pageArray[0]} totalPage={totalPage} />
      {pageArray.map((page, index) => (
        <PaginationItem
          key={`${pathname}-pagination-list-${index}`}
          nextPage={page}
          currentPage={currentPage}
          value={page}
        />
      ))}
      <AfterLink initialPage={pageArray[0]} totalPage={totalPage} />
      <LastLink currentPage={currentPage} totalPage={totalPage} />
    </ul>
  );
};

export default Pagination;
