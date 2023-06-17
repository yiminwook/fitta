import { Link, useLocation, useParams } from 'react-router-dom';

const OwnerGymDetail = () => {
  const { gymId } = useParams();
  const { pathname } = useLocation();
  return (
    <section>
      <h1>헬스장 상세 id:{gymId}</h1>
      <div>
        <img src="https://placehold.co/200x200" alt={`헬스장 프로필 이미지`} />
      </div>
      <div>
        <Link to={`${pathname}/edit`}>수정하기</Link>
      </div>
    </section>
  );
};

export default OwnerGymDetail;
