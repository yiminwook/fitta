import UserForm from '@/components/signup/UserForm';
import { useState } from 'react';
import { Address } from 'react-daum-postcode';
import PostModal from '@/components/signup/PostModal';

const UserSection = () => {
  const [showPostModal, setShowPostModal] = useState(false);

  const getPost = (data: Address) => {
    console.log(`
    주소: ${data.address},
    우편번호: ${data.zonecode}
    `);
    setShowPostModal(false);
  };

  const openPostModal = () => {
    setShowPostModal(() => true);
  };

  const closePostModal = () => {
    setShowPostModal(() => false);
  };

  return (
    <section>
      <button type="button" onClick={openPostModal}>
        toggle
      </button>
      <UserForm />
      {showPostModal ? <PostModal onClose={closePostModal} onComplete={getPost} /> : null}
    </section>
  );
};

export default UserSection;
