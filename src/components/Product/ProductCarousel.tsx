import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export interface Props {
    images: string[];
}

const ProductCarousel = ({ images }: Props) => {
    return (
        <Carousel useKeyboardArrows centerMode={true}>
            {images.map((image, index) => {
                return (
                    <div className="slide">
                        <img alt="sample_file" src={image} key={index} />
                    </div>
                );
            })}
        </Carousel>
    );
};

export default ProductCarousel;
