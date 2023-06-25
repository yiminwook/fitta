import Calendar from '@/components/common/calendar/Calendar';
import DonutGraph from '@/components/common/graph/DonutGraph';
import Loading from '@/components/common/loading/Loading';
import Modal from '@/components/layout/Modal';
import dayjs from '@/models/dayjs';
import { useState } from 'react';

const NotFound = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <section>
      <h1>NotFound</h1>
      <time>{dayjs().format('YY MM DD ddd A hh:mm')}</time>
      <section>
        <Calendar />
      </section>
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
            gridTemplateColumns: 'repeat(2, auto)',
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
    </section>
  );
};

export default NotFound;
