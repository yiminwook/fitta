import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface NavChildProps {
  to: string;
  content: ReactNode;
  className?: string;
}

const NavChild = ({ to, content, className = '' }: NavChildProps) => {
  return (
    <li>
      <NavLink to={to}>
        <button tabIndex={-1} className={className}>
          {content}
        </button>
      </NavLink>
    </li>
  );
};

export default NavChild;
