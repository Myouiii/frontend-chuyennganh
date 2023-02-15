import { Carousel } from 'antd';
import React from 'react';
import './index.scss';

// Do cả chương trình chỉ có 1 list carousel
// Nên lưu thẳng vào đây để đỡ tốn chi phí query
const list = [
  'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1609752561/saleOff/carousels/unnamed_2_d2ccjd.webp',
  'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1609752560/saleOff/carousels/unnamed_flqfng.webp',
  'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1609752560/saleOff/carousels/unnamed_1_t5luv4.webp',
];

function ProductCarousel() {
  return (
    <Carousel className="Product-Carousel my-5 rounded-lg" autoplay>
      {list.map((item, index) => (
        <img
          className="Product-Carousel-img rounded-lg"
          src={item}
          key={index}
        />
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
