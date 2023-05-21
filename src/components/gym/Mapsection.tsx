import gym from '@/components/gym/Gym.module.scss';
import RenderMapByKeyword from '@/components/common/map/RenderMapByKeyword';

const MapSection = () => {
  return (
    <section>
      hello
      {/* <RenderMap /> */}
      <RenderMapByKeyword keyword="송파구" style={{ height: '350px', width: '100%' }} />
    </section>
  );
};

export default MapSection;
