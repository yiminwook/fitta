import 'slick-carousel/slick/slick-theme.scss';
import 'slick-carousel/slick/slick.scss';
import '@/styles/Slick.scss';
import home from '@/components/home/Home.module.scss';
import Slider, { Settings } from 'react-slick';

const HomeSection = () => {
  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <section className={home['HomeSection']}>
      <Slider {...settings}>
        <img src="https://placehold.co/800x150" />
        <img src="https://placehold.co/800x150" />
        <img src="https://placehold.co/800x150" />
        <img src="https://placehold.co/800x150" />
      </Slider>
    </section>
  );
};

export default HomeSection;
