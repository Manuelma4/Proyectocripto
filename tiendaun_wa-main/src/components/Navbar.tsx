import React, { useState } from 'react';
import '../css/main.css';
import tiendaUnLogo from '../assets/images/logos/logo.png';
import home from '../assets/images/home.png';
import logOut from '../assets/images/logOut.png';
import uploadProduct from '../assets/images/uploadProduct.png';
import cart from '../assets/images/cart.png';
import user from '../assets/images/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { GET_PRODUCT_BY_NAME_NAVBAR } from '../graphql/catalogo/products';
import { useQuery } from '@apollo/react-hooks';
import { ProductButtonNavbar } from './utils';


type NavbarProps = {
  onSearchParameterChange: (searchParameter: string) => void;
};
const Navbar: React.FC<NavbarProps> = ({ onSearchParameterChange }) => {
  const [searchParameter, setSearchParameter] = useState('');
  const { loading, error, data} = useQuery(GET_PRODUCT_BY_NAME_NAVBAR, {variables: {name: searchParameter}});
  let productSearch = [];
  let username = localStorage.getItem("username");
  if (data!=undefined){
    productSearch = data.productByName.map((product: { idProducto: Number; nombre: string}) => {
    return (
        <div>
            <ProductButtonNavbar title = {product.nombre} idProducto={product.idProducto} className='productSuggestion'/>
        </div>
    );
  });
  }

  type LogOutButtonProps = {
    username?: string;
  }
  const LogOutButton = ()=>{
    if (username==''){
      return <div></div>
    }
    return <span><a title="Finalizar sesión" onClick={logout} className='navLogoutLink' href='/login'><img src={logOut} alt="" /></a></span>
  }

  const CreateProductButton = ()=>{
    if (localStorage.getItem('UsuarioRol')){
      if (localStorage.getItem('UsuarioRol')==='1'){
        return <span><a title="Crear producto" className='navLogoutLink' href='/createProduct'><img src={uploadProduct} alt="" /></a></span>
      }
    }
    return <div></div>
  }
  
  
  if (searchParameter.length===0){
    productSearch = [];
  }
  else if (productSearch.length>=5){
    productSearch = productSearch.slice(0,5);
  }
  const handleParameterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearchParameterChange(value);
    localStorage.setItem('searchParameter', value);
    setSearchParameter(value);
  };
  const handleClickSearchButton = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchParameter(value);
  };

  const logout = ()=>{
      localStorage.setItem("logout", "true");
  }
  return (
    <nav className="navbar navBar navbar-expand-lg">
      <div className='row'>
      <div className="logoNav col-3">
        <a href="/" title="Inicio"><img src={tiendaUnLogo} alt="Logo de TiendaUn" className="img-fluid logoNav offset-1" /></a>
      </div>
      <div className="=col-12 col-lg-6" style={{marginLeft:'1.1rem'}}>
          <div className="product-search">
              <input type="text" placeholder="Buscar productos" value={searchParameter} onChange={handleParameterChange} className='catalogueInput'/>
              <button type="button" onClick={() => window.location.href = "/searchProducts"}><FontAwesomeIcon icon={faSearch} /></button>
          </div> 
          <div className='productsSearchNavbar'>
          {productSearch} 
          </div>  
      </div>
      <div className="col-12 col-lg-1" style={{marginLeft:'0.2rem'}}>
        <div className="d-flex">
            <div className='navButton'>
            <a href="/" title="Inicio">
                  <img src={home} alt="Home" className="navBarLink" />
              </a>
            </div> 
            <div className='navButton CreateProductButton'>
                <CreateProductButton />
            </div>
            <div className='navButton'>
              <a href="/carrito" title="Carrtio">
                  <img src={cart} alt="Home" className="navBarLink" />
              </a>
            </div> 
            <div className='navButton'>
              <a href="/login" title="Iniciar sesión">
                  <img src={user} alt="Home" className="navBarLinkUser" />
              </a>
            </div> 
            <div className='navButton LogOutButton'>
                <LogOutButton />
            </div>
            
        </div>  
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
