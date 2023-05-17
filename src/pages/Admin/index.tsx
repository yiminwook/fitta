import DonutGraph from '@/components/common/DonutGraph';
import Loading from '@/components/common/Loading';
import Head from '@/components/layout/Head';
import Modal from '@/components/layout/Modal';
import { useState } from 'react';

const Admin = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <Head title="Admin" />
      <section>Admin</section>
      <br />
      <button onClick={() => setIsShow(true)}>모달 오픈 버튼</button>
      <br />
      {/* 로딩 컴포넌트 예시 */}
      <section>
        <div style={{ border: '1px solid black', height: '10rem' }}>
          <Loading style={{ height: '10rem' }} />
        </div>
      </section>
      {/* 도넛 컴포넌트 예시 */}
      <section style={{ margin: 'auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2)',
            justifyContent: 'center',
            gap: '1rem',
            margin: 'auto',
            padding: '1rem',
          }}
        >
          <DonutGraph data={{ percentage: 25 }} hexColor="#ee322b" />
          <DonutGraph data={{ percentage: 50 }} hexColor="#fbb871" />
          <DonutGraph data={{ percentage: 75 }} hexColor="#fae156" />
          <DonutGraph data={{ percentage: 100 }} hexColor="#5bfa56" />
        </div>
      </section>
      {isShow ? (
        <Modal title="테스트" onClose={() => setIsShow(false)}>
          <div style={{ height: '10rem' }}>모달예시</div>
          <div>
            <button style={{ margin: 'auto' }}>확인</button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Admin;
