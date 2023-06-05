import React, { useState } from 'react';
import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductsList from './productsList';
import Carousel from 'react-bootstrap/Carousel';
import Filter from './filterProducts';

import { GET_PRODUCT_BY_NAME } from '.././graphql/catalogo/products';
import { useQuery } from '@apollo/react-hooks';

type CarruselProps = {
  images: string[]; // Lista de imágenes del carrusel
};


const MyCarousel: React.FC<CarruselProps> = ({ images }) => {
  const CarouselImages = images.map((image) => (
    <Carousel.Item className='carouselImages'>
        <div className='text-center'>
        <img
          className=" abs-center"
          src={image}
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
  searchParameter: string;
  onSearchParameterChange: (searchParameter: string) => void;
 };
const SearchProducts: React.FC<MainProps> = ({searchParameter, onSearchParameterChange}) => {
  const images = [
    'https://picsum.photos/id/1018/1000/600',
    'https://picsum.photos/id/1015/1000/600',
    'https://picsum.photos/id/1019/1000/600',
    'https://picsum.photos/id/1020/1000/600',
    'https://picsum.photos/id/1021/1000/600'
  ];
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000000);
  const [categories, setCategories] = useState('');
  const [searchParameter2, setSearchParameter2] = useState('');
  const {loading,error,data} = useQuery(GET_PRODUCT_BY_NAME, {variables: {name: localStorage.getItem('searchParameter')}});
  // localStorage.setItem('searchParameter', '');
  return(
    
    <div className="main">
        <div className='carrusel-container'>
          <MyCarousel images={images}/>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-10'>
              {/* <Filter onCategoryChange={setCategories} onMinPriceChange={setMinPrice} onMaxPriceChange={setMaxPrice}/> */}
              <ProductsList data={data} loading={loading} error={error} searched={true}/>
            </div>
           
          </div>
        </div>
      </div>
  );
}

export default SearchProducts;
