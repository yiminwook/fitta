import { useOwner } from '@/hooks/useAPI';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const OwnerGymDetail = () => {
  const { gymId } = useParams();
  const { pathname } = useLocation();
  const { ownerMyData } = useOwner();

  console.log(ownerMyData);

  const getData = async () => {
    const response = await axios.get('http://localhost:8081/gyms/1');
    console.log(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
