import { PAGINATION_SIZE } from '@/consts';
import { Link, useLocation } from 'react-router-dom';
import pagination from '@/components/common/pagination/Pagination.module.scss';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

export const FirstLink = ({ currentPage }: { currentPage: number }) => {
  const { pathname } = useLocation();
  return (
    <li>
      <Link to={`${pathname}?page=1`} className={currentPage === 1 ? pagination['disabled'] : ''}>
        <MdKeyboardDoubleArrowLeft size="1rem" color="inherit" />
      </Link>
    </li>
  );
};

export const BeforeLink = ({ initialPage }: { initialPage: number | null; totalPage: number }) => {
  const { pathname } = useLocation();

  if (initialPage === null) return null;

  return (
    <li>
      <Link
        to={`${pathname}?page=${initialPage - PAGINATION_SIZE}`}
        className={initialPage === 1 ? pagination['disabled'] : ''}
      >
        <MdKeyboardArrowLeft size="1rem" color="inherit" />
      </Link>
    </li>
  );
};

export const AfterLink = ({ initialPage, totalPage }: { initialPage: number | null; totalPage: number }) => {
  const { pathname } = useLocation();

  if (initialPage === null) return null;

  return (
    <li>
      <Link
        to={`${pathname}?page=${initialPage + PAGINATION_SIZE}`}
        className={totalPage < initialPage + 1 + PAGINATION_SIZE ? pagination['disabled'] : ''}
      >
        <MdKeyboardArrowRight size="1rem" color="inherit" />
      </Link>
    </li>
  );
};

export const LastLink = ({ currentPage, totalPage }: { currentPage: number; totalPage: number }) => {
  const { pathname } = useLocation();
  return (
    <li>
      <Link to={`${pathname}?page=${totalPage}`} className={currentPage === totalPage ? pagination['disabled'] : ''}>
        <MdKeyboardDoubleArrowRight size="1rem" color="inherit" />
      </Link>
    </li>
  );
};

interface PaginationChildProps {
  currentPage: number;
  page: number | null;
}

export const PaginationChild = ({ page, currentPage }: PaginationChildProps) => {
  const { pathname } = useLocation();

  if (page === undefined || page === null) {
    return null;
  }

  return (
    <li>
      <Link to={`${pathname}?page=${page}`} className={page === currentPage ? pagination['disabled'] : ''}>
        {page}
      </Link>
    </li>
  );
};
