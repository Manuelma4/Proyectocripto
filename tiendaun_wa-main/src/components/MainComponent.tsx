import React, { useState } from 'react';
import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductsList from './productsList';
import Carousel from 'react-bootstrap/Carousel';
import sp1 from '../assets/images/spinner1.gif';

import { useQuery } from '@apollo/react-hooks';
import Filter from './filterProducts';
import {FILTER_PRODUCTS} from "../graphql/catalogo/products";

type CarruselProps = {
  images: any[]; // Lista de imágenes del carrusel
};

const MyCarousel: React.FC<CarruselProps> = ({ images }) => {
  const CarouselImages = images.map((image) => (
    <Carousel.Item key={image.id} className='carouselImages'>
        <div className='text-center'>
        <img
          className=" abs-center"
          src={image.src}
          alt="promociones"
        />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
  )); 
  return (
    <Carousel fade>
      {CarouselImages}
    </Carousel>
  );
};

type MainProps = {
 };
function Main(props: MainProps) {
  const images = [
    {id:1, src:'https://picsum.photos/id/1018/1000/600'},
    {id:2, src:'https://picsum.photos/id/1015/1000/600'},
    {id:3, src:'https://picsum.photos/id/1019/1000/600'},
    {id:4, src:'https://picsum.photos/id/1020/1000/600'},
    {id:5, src:'https://picsum.photos/id/1021/1000/600'}
  ];
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000000);
  const [categories, setCategories] = useState('');
  const { loading, error, data} = useQuery(FILTER_PRODUCTS, {variables: {
                                                              categories: categories,
                                                              minPrice: minPrice,
                                                              maxPrice: maxPrice
                                                            }
  });
  if (!data){
    return <div><img src={sp1} className='spinner1'></img></div>
  }
  return(
    <div className="main">
          <div className='carrusel-container'>
            <MyCarousel images={images}/>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              <Filter onCategoryChange={setCategories} onMinPriceChange={setMinPrice} onMaxPriceChange={setMaxPrice}/>
                
            </div>
            <div className='col-9'>
              <ProductsList data={data.filterProducts} loading={loading} error={error} searched={false}/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Main;
