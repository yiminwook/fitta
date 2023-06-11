import Head from '@/components/layout/Head';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import member from '@/components/member/Member.module.scss';
import MemberSidebar from '@/components/member/Sidebar';

const MemberHome = loadable(() => import('@/pages/Member/Home'));
const MemberDetailGym = loadable(() => import('@/pages/Member/Detail/Gym'));
const MemberEditGym = loadable(() => import('@/pages/Member/Edit/Gym'));

const Member = () => {
  const { memberId } = useParams();

  return (
    <>
      <Head title="Member" />
      <div className={member['memberWapper']}>
        <MemberSidebar />
        <section className={member['memberSection']}>
          <Routes>
            <Route path="/" element={<Navigate to={`/member/${memberId}/home`} replace />} />
            <Route path="/home" element={<MemberHome />} />
            <Route path="/detail/gym" element={<MemberDetailGym />} />
            <Route path="/edit/gym" element={<MemberEditGym />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </section>
      </div>
    </>
  );
};

export default Member;
