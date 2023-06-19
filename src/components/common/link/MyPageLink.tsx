import { useUser } from '@/hooks/useAPI';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MyPageLinkProps {
  children: ReactNode;
}

const MyPageLink = ({ children }: MyPageLinkProps) => {
  const { myData } = useUser();
  if (!myData) return null;
  const { role, id } = myData;
  return <Link to={`${role.toLocaleLowerCase()}/${id}/home`}>{children}</Link>;
};

export default MyPageLink;
