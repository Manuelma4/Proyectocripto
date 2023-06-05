import { useState, useEffect  } from 'react'
import { BrowserRouter,Route, Routes, useParams} from 'react-router-dom';
import './App.css'
import Main from './components/MainComponent'
import NavbarComponent from './components/Navbar';
import Login from './components/loginSignUp/LoginComponent'
import { Dash } from './components/UserDash';
import { SignUp } from './components/loginSignUp/SignUpComponent';
import CreateProduct from './components/CreateProduct';
import ProductDetail from './components/productDetail';
import {GET_ALL_PRODUCTS} from "./graphql/catalogo/products";
import { useQuery } from '@apollo/react-hooks';
import SearchProducts from './components/SearchProducts';
import { Carrito } from './components/Carrito/CarritoComponent';
import { Cuenta } from './components/Cuenta/CuentaComponent';
import sp1 from './assets/images/spinner1.gif';
import { GET_USER_BY_USER } from './graphql/auth/users';

type ProductWithIdProps = {
  data : any;
  //productImage: string;
};
const ProductWithId: React.FC<ProductWithIdProps> = ({data}) => {
  const params = useParams<{ productId: string }>();
  if (params.productId){
    const productId = parseInt(params.productId);
    const product = data.filter((product: { idProducto: number; }) => product.idProducto === productId);
    if (product.length === 0) {
      return <h1><img src={sp1} className='spinner1'></img></h1>;
    }
    const product2 = product[0];
    return <ProductDetail productName={product2.nombre} productDescription={product2.descripcion} productPrice={product2.precio} productQuantity={product2.cantidadDisponible} productImage={product2.imagen}/>;
  }
  // Utiliza el valor de "productId" en tu componente

  return (
    <div>
      <h1>Detalles del producto {}</h1>
      {/* Resto del contenido del componente */}
    </div>
  );
};


function App() {
  const [searchParameter, setSearchParameter] = useState('');
  const { loading, error, data} = useQuery(GET_ALL_PRODUCTS);
  const{data: dataUser, loading: loadingUser, error: errorUser} = useQuery(GET_USER_BY_USER, {variables:{username: localStorage.getItem("username")}});
  let idUsuario = 0;
  if (dataUser){
    idUsuario = dataUser.getUserByUser.idUsuario;
    localStorage.setItem('UsuarioRol', dataUser.getUserByUser.idRol);
  }

  useEffect(() => {
    // Intenta obtener el valor almacenado en el localStorage al cargar el componente
    const storedVariable = localStorage.getItem('searchParameter');
    if (storedVariable) {
      setSearchParameter(storedVariable);
    }
  }, []);

  let data2 = [] ;
  if (data){
    data2 = data.allProducts;
  }
  
  console.log(process);
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent onSearchParameterChange={setSearchParameter}/>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/login'  element={<Login/>}/>
            <Route path='/dash'  element={<Dash/>}/>
            <Route path='/cuenta'  element={<Cuenta/>}/>
            <Route path='/carrito'  element={<Carrito/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/products/:productId' element={<ProductWithId data={data2}/>} />
            <Route path='/createProduct' element={<CreateProduct idUser={idUsuario}/>}/>
            <Route path='/searchProducts' element={<SearchProducts searchParameter={searchParameter} onSearchParameterChange={setSearchParameter}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
