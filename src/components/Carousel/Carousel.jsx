import Carousel from 'react-bootstrap/Carousel';
import banner from "../../Assets/img/banner.png";
import banner1 from "../../Assets/img/banner1.png";
import banner2 from "../../Assets/img/banner2.png";

function CarouselSection() {
  return (
    <>    
    <Carousel variant="dark" className="mt-5">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner}
          alt="First slide"
        />        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner1}
          alt="Second slide"
        />       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner2}
          alt="Third slide"
          />        
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default CarouselSection;