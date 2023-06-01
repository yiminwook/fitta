import { MouseEvent, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface NavChildProps {
  to: string;
  content: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const NavChild = ({ to, content, className = '', onClick }: NavChildProps) => {
  return (
    <li onClick={onClick}>
      <NavLink to={to}>
        <button tabIndex={-1} className={className}>
          {content}
        </button>
      </NavLink>
    </li>
  );
};

export default NavChild;
