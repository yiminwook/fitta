import Head from '@/components/layout/Head';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import NavChild from '@/components/common/NavChild';

const OwnerHome = loadable(() => import('@/pages/Owner/Home'));
const OwnerDetailGym = loadable(() => import('@/pages/Owner/Detail/Gym'));
const OwnerDetailStaff = loadable(() => import('@/pages/Owner/Detail/Staff'));
const OwnerDetailMember = loadable(() => import('@/pages/Owner/Detail/Member'));
const OwnerEditGym = loadable(() => import('@/pages/Owner/Edit/Gym'));
const OwnerEditStaff = loadable(() => import('@/pages/Owner/Edit/Staff'));
const OwnerEditMember = loadable(() => import('@/pages/Owner/Edit/Member'));

const Owner = () => {
  const { ownerId } = useParams();

  return (
    <>
      <Head title="Owner" />
      <div>Owner {ownerId}</div>
      <aside>
        <ul>
          <NavChild to={`/owner/${ownerId}`} content="마이페이지" />
          <NavChild to={`/owner/${ownerId}/detail/gym`} content="헬스장 현황" />
          <NavChild to={`/owner/${ownerId}/detail/staff`} content="스태프 현황" />
          <NavChild to={`/owner/${ownerId}/detail/member`} content="멤버 현황" />
          <NavChild to={`/owner/${ownerId}/edit/gym`} content="헬스장 관리" />
          <NavChild to={`/owner/${ownerId}/edit/staff`} content="스태프 관리" />
          <NavChild to={`/owner/${ownerId}/edit/member`} content="멤버 관리" />
        </ul>
      </aside>
      <section>
        <Routes>
          <Route path="/" element={<OwnerHome />} />
          <Route path="/detail/gym" element={<OwnerDetailGym />} />
          <Route path="/detail/staff" element={<OwnerDetailStaff />} />
          <Route path="/detail/member" element={<OwnerDetailMember />} />
          <Route path="/edit/gym" element={<OwnerEditGym />} />
          <Route path="/edit/staff" element={<OwnerEditStaff />} />
          <Route path="/edit/member" element={<OwnerEditMember />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </section>
    </>
  );
};

export default Owner;
