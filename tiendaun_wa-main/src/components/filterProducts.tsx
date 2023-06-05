import React, { Component, useState } from 'react';
import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GET_ALL_CATEGORIES} from "../graphql/catalogo/categories";
import { useQuery } from '@apollo/react-hooks';
import { CategoryFilterButton } from './utils';
type filterCategoriesProps = {
  //categories: string[]; // Lista de categorías
  onCategoryChange: (selectedCategory: string) => void;
};

const FilterCategories: React.FC<filterCategoriesProps> = ({onCategoryChange}) => {
  const { loading, error, data} = useQuery(GET_ALL_CATEGORIES);
  if (loading) return <p>Loading...</p>;
  if(error) return <p>Error EN LAS CATEGORIAS:(</p>;
  const categories = data.allCategories.map((category: { _id: string ; idCategoria:React.Key ;nombre: string; precio: Uint8Array; }) => (
    <CategoryFilterButton key={category.idCategoria} title={category.nombre} idCategory={category._id}  onCategoryChange={onCategoryChange}/>
  )); 

  return (
    <div className="categoriesFilter">
      {categories}
    </div>
  );
}

type filterPricesProps = {
    //categories: string[]; // Lista de categorías
    onMinPriceChange: (minPrice: number) => void;
    onMaxPriceChange: (maxPrice: number) => void;
  };
  
  const FilterPrices: React.FC<filterPricesProps> = ({onMinPriceChange, onMaxPriceChange}) => {
    
    const [minimumPrice, setMinimumPrice] = useState('');
    const [maximumPrice, setMaximumPrice] = useState('');
    const handleMinimumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setMinimumPrice(value);
        onMinPriceChange(parseInt(value));
      };
    const handleMaximumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setMaximumPrice(value);
        onMaxPriceChange(parseInt(value));
      };
    return (
      <div className="container">
        <div className='row'>
            <div className='col-5 inputPrice text-center'>
                <h5>Mínimo</h5>
                <input type="number" value={minimumPrice} onChange={handleMinimumChange} />  
            </div>
            <div className=' offset-1 col-5 inputPrice text-center'>
                <h5>Máximo</h5>
                <input type="number" value={maximumPrice} onChange={handleMaximumChange} />
            </div>
        </div>
      </div>
    );
  }


type filterProps = {
    //categories: string[]; // Lista de categorías
    onMinPriceChange: (minPrice: number) => void;
    onMaxPriceChange: (maxPrice: number) => void;
    onCategoryChange: (maxPrice: string) => void;
  };
  const Filter: React.FC<filterProps> = ({onCategoryChange, onMinPriceChange, onMaxPriceChange}) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(15000000);
    const [categories, setCategories] = useState('');
    const handleFilterClick = () => {
        onCategoryChange((categories));
        onMinPriceChange((minPrice));
        onMaxPriceChange((maxPrice));
    }
    return (
        <div className="filter">
            <div className='filterDiv'>
                <div><h3>Categorías</h3></div>
                <FilterCategories onCategoryChange={setCategories}/>
            </div>
            <hr />
            <div className='filterDiv text-center'>
                <div><h3>Precios</h3></div>
                <FilterPrices onMinPriceChange={setMinPrice} onMaxPriceChange={setMaxPrice}/>
            </div>
            <div className='filterButton text-center'>
                <button className='btn' onClick={handleFilterClick}>Filtrar</button>
            </div>
            
        </div>
    );
  }

export default Filter;
