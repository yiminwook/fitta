import gym from '@/components/gym/Gym.module.scss';
import RenderMapByKeyword from '@/components/common/map/RenderMapByKeyword';
import RenderMapByAddress from '../common/map/RenderMapByAddress';

const MapSection = () => {
  return (
    <section>
      {/* <RenderMap /> */}
      {/* <RenderMapByKeyword keyword="강남역 헬스장" style={{ height: '350px', width: '100%' }} /> */}
      <RenderMapByAddress
        gymName="MK휘트니스"
        address="서울특별시 강남구 봉은사로 129-1"
        style={{ height: '350px', width: '100%' }}
      />
    </section>
  );
};

export default MapSection;
