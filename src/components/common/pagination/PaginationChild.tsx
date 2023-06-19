import { PAGINATION_SIZE } from '@/consts';
import { Link, useLocation } from 'react-router-dom';
import pagination from '@/components/common/pagination/Pagination.module.scss';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { ReactNode } from 'react';

export const FirstLink = ({ currentPage }: { currentPage: number }) => {
  const disabled = currentPage === 1;
  return (
    <PaginationItem
      currentPage={0}
      nextPage={1}
      disabled={disabled}
      value={<MdKeyboardDoubleArrowLeft size="1rem" color="inherit" />}
    />
  );
};

export const BeforeLink = ({ initialPage }: { initialPage: number | null; totalPage: number }) => {
  if (initialPage === null) return null;
  const disabled = initialPage === 1;

  return (
    <PaginationItem
      currentPage={0}
      nextPage={initialPage - PAGINATION_SIZE}
      disabled={disabled}
      value={<MdKeyboardArrowLeft size="1rem" color="inherit" />}
    />
  );
};
export const AfterLink = ({ initialPage, totalPage }: { initialPage: number | null; totalPage: number }) => {
  if (initialPage === null) return null;
  const disabled = totalPage < initialPage + 1 + PAGINATION_SIZE;

  return (
    <PaginationItem
      currentPage={0}
      nextPage={initialPage + PAGINATION_SIZE}
      disabled={disabled}
      value={<MdKeyboardArrowRight size="1rem" color="inherit" />}
    />
  );
};

export const LastLink = ({ currentPage, totalPage }: { currentPage: number; totalPage: number }) => {
  const disabled = currentPage === totalPage;

  return (
    <PaginationItem
      nextPage={totalPage}
      currentPage={currentPage}
      value={<MdKeyboardDoubleArrowRight size="1rem" color="inherit" />}
      disabled={disabled}
    />
  );
};

interface PaginationChildProps {
  currentPage: number;
  nextPage: number | null;
  value: ReactNode;
  disabled?: boolean;
}

export const PaginationItem = ({ nextPage, currentPage, disabled, value }: PaginationChildProps) => {
  const { pathname } = useLocation();

  if (nextPage === undefined || nextPage === null) {
    return null;
  }

  const isActive = nextPage === currentPage;

  return (
    <li>
      <Link
        to={`${pathname}?page=${nextPage}`}
        className={[isActive ? pagination['active'] : '', disabled ? pagination['disabled'] : ''].join(' ')}
      >
        {value}
      </Link>
    </li>
  );
};
