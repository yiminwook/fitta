import Head from '@/components/layout/Head';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import OwnerSidebar from '@/components/owner/Sidebar';
import owner from '@/components/owner/Owner.module.scss';
import Loading from '@/components/common/Loading';
import { Suspense } from 'react';

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
      <div className={owner['ownerWapper']}>
        <OwnerSidebar />
        <section className={owner['ownerSection']}>
          <Suspense fallback={<Loading style={{ height: '30rem' }} />}>
            <Routes>
              <Route path="/" element={<Navigate to={`/owner/${ownerId}/home`} replace />} />
              <Route path="/home" element={<OwnerHome />} />
              <Route path="/detail/gym" element={<OwnerDetailGym />} />
              <Route path="/detail/staff" element={<OwnerDetailStaff />} />
              <Route path="/detail/member" element={<OwnerDetailMember />} />
              <Route path="/edit/gym" element={<OwnerEditGym />} />
              <Route path="/edit/staff" element={<OwnerEditStaff />} />
              <Route path="/edit/member" element={<OwnerEditMember />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default Owner;
