import Head from '@/components/layout/Head';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import OwnerSidebar from '@/components/owner/Sidebar';
import owner from '@/components/owner/Owner.module.scss';
import Loading from '@/components/common/loading/Loading';
import { Suspense, useEffect } from 'react';
import { useUser } from '@/hooks/useAPI';

const OwnerHome = loadable(() => import('@/pages/Owner/Home'));
const OwnerGym = loadable(() => import('@/pages/Owner/Gym'));
const OwnerGymDetail = loadable(() => import('@/pages/Owner/Gym/Detail'));
const OwnerGymEdit = loadable(() => import('@/pages/Owner/Gym/Edit'));
const OwnerEditSchedule = loadable(() => import('@/pages/Owner/Gym/EditSchedule'));
const OwnerDetailStaff = loadable(() => import('@/pages/Owner/Staff'));
const OwnerDetailMember = loadable(() => import('@/pages/Owner/Member'));
const OwnerEditStaff = loadable(() => import('@/pages/Owner/Staff/Edit'));
const OwnerEditMember = loadable(() => import('@/pages/Owner/Member/Edit'));

const Owner = () => {
  const { pathname } = useLocation();
  const { ownerId } = useParams<{ ownerId: string }>();
  const { myData } = useUser();

  useEffect(() => {
    // console.log(ownerId === myData?.id.toString());
  }, [pathname]);

  return (
    <>
      <Head title="Owner" />
      <div className={owner['wapper']}>
        <OwnerSidebar />
        <section className={owner['inner']}>
          <Suspense fallback={<Loading style={{ height: '30rem' }} />}>
            <Routes>
              <Route path="/" element={<OwnerHome />} />
              <Route path="/gym" element={<OwnerGym />} />
              <Route path="/gym/:gymId" element={<OwnerGymDetail />} />
              <Route path="/gym/:gymId/edit" element={<OwnerGymEdit />} />
              <Route path="/gym/:gymId/edit/schedule" element={<OwnerEditSchedule />} />
              <Route path="/staff" element={<OwnerDetailStaff />} />
              <Route path="/member" element={<OwnerDetailMember />} />
              <Route path="/staff/:staffId/edit" element={<OwnerEditStaff />} />
              <Route path="/member/edit" element={<OwnerEditMember />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default Owner;
