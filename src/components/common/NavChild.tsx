import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface NavChildProps {
  to: string;
  content: ReactNode;
}

const NavChild = ({ to, content }: NavChildProps) => {
  return (
    <li>
      <NavLink to={to}>
        <button>{content}</button>
      </NavLink>
    </li>
  );
};

export default NavChild;
