import React, { useState } from 'react';
import '../css/main.css';
import tiendaUnLogo from '../assets/images/logos/LogoMorado.png';
import {InputBox, InputImage, MyButton} from './utils';
import {GET_ALL_CATEGORIES} from "../graphql/catalogo/categories";

// import {CREATE_PRODUCT} from "../graphql/catalogo/products";
import { useMutation, useQuery } from '@apollo/react-hooks';
import {gql} from "apollo-boost";

interface ProductoInput {
  nombre: string;
  descripcion?: string;
  precio: number;
  cantidadDisponible: number;
  categoria?: string;
}

const CREATE_PRODUCT = gql`
mutation createProduct($product: ProductoInput!, $idUser: Int!) {
  createProduct
  (product: $product, idUser: $idUser) 
  {
    mensaje
  }
}
`;

type CategoriesProps = {
  onCategoryChange: (selectedCategory: string) => void;
};

const Categories: React.FC<CategoriesProps> = ({onCategoryChange}) => {
  const { loading, error, data} = useQuery(GET_ALL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryName, setSelectedCategoryName] = useState('');
  const [selected, setSelected] = useState('');

  if (loading) return <p>Loading...</p>;
  if(error) return <p>Error EN LAS CATEGORIAS:(</p>;
  const categories = data.allCategories.map((category: { _id: React.Key ; idCategoria:Number ;nombre: string; precio: Uint8Array; }) => (
    <option key={category._id} value={category._id}>{category.nombre}</option>
  )); 
  
  if (selected === "true") return ((<select id="category" value={selectedCategory} onChange={(e) => {const value = e.target.value;
    const categoryName = data.allCategories.find((category: any) => category._id === selectedCategory);
    setSelectedCategory(value);
    setSelectedCategoryName(categoryName.nombre);
    onCategoryChange(value);}}>
<option value={selectedCategory}>{categoryName}</option>
{categories}
</select>
));
else{
  
  return (( 
    <div className="selectContainer container">
      <h5 style={{color:'#4C015D'}}>Categoria del producto</h5>
      <select className="select" id="category" value={selectedCategory} onChange={(e) => {const value = e.target.value;
                                                                          const categoryName = data.allCategories.find((category: any) => category._id === selectedCategory);
                                                                          setSelectedCategory(value);
                                                                          setSelected("true");
                                                                          setSelectedCategoryName(categoryName.nombre);
                                                                          onCategoryChange(value);
                                                                          }}>
        <option value={selectedCategory}>Seleccione una categoria</option>
        {categories}
      </select>
    </div>
    ));
} 
    
};

type CreateProductProps = {
  idUser: number;
};

const CreateProduct: React.FC<CreateProductProps> = ({idUser }) => {
  
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [cantidadDisponible, setCantidadDisponible] = useState(0);
  const [category, setCategory] = useState('');

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNombre(value);
  };

  const handleDescripcionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDescripcion(value);
  };

  const handlePrecioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPrecio(parseInt(value));
  };

  const handleCantidadDisponibleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCantidadDisponible(parseInt(value));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(nombre, descripcion, precio, cantidadDisponible, category);
    const product: ProductoInput = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      cantidadDisponible: cantidadDisponible,
      categoria: category
    };
    await createProduct({variables: {product: product, idUser: idUser}});
    window.location.href = '/createProduct';
  };  


    return (
      <div className='center center-horizontal' style={{marginTop:'1rem'}}>
        <form className="row" onSubmit={handleSubmit} >
          <div className="col-10 offset-1">
            <div className="">
              <a href="/"><img src={tiendaUnLogo} alt="Logo de TiendaUn" style={{padding:"1rem"}}className="img-fluid logoLogin" /></a>
            </div>
          </div>
          <div className="col-10 createProduct">
            <label htmlFor='nombre'>
              <InputBox type="text" id= "nombre" name="nombre"value={nombre} onChange={handleNombreChange} backgroundColor="white" color="black" padding="1rem"fontSize="1.5rem" colorText="#4C015D" title="Nombre del producto" placeholder="Producto ejemplo" />
            </label>
          </div>  
          <div className="col-10 createProduct">
            <label htmlFor='cantidadDisponible'>
              <InputBox type="number" id= "cantidadDisponible" name="cantidadDisponible"value={cantidadDisponible} onChange={handleCantidadDisponibleChange}  backgroundColor="white" color="black" padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Cantidad disponible del producto" placeholder="10"  />
            </label>
          </div>
          
          <div className="col-10 createProduct">
            <label htmlFor='categoria'>
              
              <Categories onCategoryChange={handleCategoryChange}/>
            </label>
          </div>
          <div className="col-10 createProduct">
            <label htmlFor='precio'>
              <InputBox type="number" id= "precio" name="precio"value={precio} onChange={handlePrecioChange} backgroundColor="white" color="black" padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Precio del producto" placeholder="30000"  />
            </label>
          </div>
          <div className="col-10 createProduct">
            <label htmlFor='descripcion'>
              <InputBox type="text" id= "descripcion" name="descripcion"value={descripcion} onChange={handleDescripcionChange} backgroundColor="white" color="black" padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Descripción del producto" placeholder="Descripción ejemplo"  />
            </label>
          </div>
          <div className="col-10 createProduct">
            <label>
              <InputImage type='file'required={false} backgroundColor="white" color="black" padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Imagen del producto" placeholder="Imagen" className='inputFile' />
            </label>
          </div>
          
          <div className="col-10 createProduct">
            <div className="">
              <MyButton backgroundColor="#4C015D" margin="1rem" width="30rem" fontSize="1.5rem" text="Crear producto" type='submit'/>
            </div>
          </div>
          <div className="col-10 row ">
            <h4 className='col-10 col-lg-4' style={{color:"#909190"}}>¿Producto existente?</h4>
            <a href="/signUp" className='col-2 col-lg-5 no-underline'><h4>Actualizar producto</h4></a>
          </div>
        </form>
      </div>
    );
  };

export default CreateProduct;
