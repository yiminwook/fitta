import Head from '@/components/layout/Head';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import member from '@/components/member/Member.module.scss';
import MemberSidebar from '@/components/member/Sidebar';

const MemberHome = loadable(() => import('@/pages/Member/Home'));
const MemberGym = loadable(() => import('@/pages/Member/Gym'));
const MemberGymDetail = loadable(() => import('@/pages/Member/Gym/Detail'));
const MemberGymEdit = loadable(() => import('@/pages/Member/Gym/Edit'));

const RedirectToGymPage = () => {
  const { gymId } = useParams();
  return <Navigate to={`/gym/${gymId}`} replace />;
};

const Member = () => {
  return (
    <>
      <Head title="Member" />
      <div className={member['wapper']}>
        <MemberSidebar />
        <section className={member['inner']}>
          <Routes>
            <Route path="/" element={<MemberHome />} />
            <Route path="/gym" element={<MemberGym />} />
            <Route path="/gym/:gymId" element={<RedirectToGymPage />} />
            <Route path="/detail" element={<MemberGymDetail />} />
            <Route path="/edit" element={<MemberGymEdit />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </section>
      </div>
    </>
  );
};

export default Member;
