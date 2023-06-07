import RecommandSection from '@/components/home/RecommandSection';
import TopSection from '@/components/home/TopSection';
import Head from '@/components/layout/Head';
import home from '@/components/home/Home.module.scss';

const Home = () => {
  return (
    <>
      <div className={home['home']}>
        <Head title="HOME" />
        <TopSection />
        <RecommandSection />
      </div>
    </>
  );
};

export default Home;
