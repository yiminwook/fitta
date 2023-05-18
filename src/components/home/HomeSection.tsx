import home from '@/components/Home/Home.module.scss';
import Slider from 'react-slick';

// 여기 파일에서 작업해주세요
const HomeSection = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <section className={home['HomeSection']}>
      <Slider {...settings}>
        <img src="../img/fitta-cutout.png" />
        <img src="" />
        <img src="" />
      </Slider>
    </section>
  );
};

export default HomeSection;
