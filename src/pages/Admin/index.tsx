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
      <section>
        로딩 컴포넌트 예시
        <div style={{ border: '1px solid black', height: '10rem' }}>
          <Loading style={{ height: '10rem' }} />
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
