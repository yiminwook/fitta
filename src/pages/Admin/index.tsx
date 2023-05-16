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
      {isShow ? (
        <Modal title="테스트" onClose={() => setIsShow(false)}>
          <div>모달</div>
        </Modal>
      ) : null}
    </>
  );
};

export default Admin;
