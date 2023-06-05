import { generalRequest, getRequest } from '../../../utilities';
import { url_carrito, entryPoint_carrito } from '../../server';

const URL = `https://${url_carrito}/${entryPoint_carrito}`;

const resolvers = {
	Query: {
		allCarritos: (_) =>
			 getRequest(URL,''),
		carritoById: (_, { id }) =>{
			generalRequest(`${URL}/${id}`, 'PUT')
			return generalRequest(`${URL}/${id}`, 'GET')
		}, 
		carritoByIdUsuario: (_, { idusuario }) =>{
			const carritoUsuario = generalRequest(`${URL}/usuario/${idusuario}`, 'GET')
			generalRequest(`${URL}/${carritoUsuario.idCarrito}`, 'PUT')
			return generalRequest(`${URL}/usuario/${idusuario}`, 'GET')
		}
	},
	Mutation: {
		createCarrito: (_, { carrito }) =>{
			const carritor= generalRequest(`${URL}`, 'POST', carrito)
			const id = carritor.idCarrito
			generalRequest(`${URL}/${id}`, 'PUT')
			return carritor
		},
		updateCarrito: (_, { id}) =>
			generalRequest(`${URL}/${id}`, 'PUT'),
		deleteCarrito: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};
 
export default resolvers;
/*

-------------------- Query All Carritos --------------------
query {
	allCarritos{
	 idCarrito
	 idUsuario
	 totalprecio    
	 totalproductos
   }
 }

 -------------------- Query Carritos by Id --------------------
query {
   carritoById(id:1){
    idCarrito
    idUsuario
    totalprecio    
    totalproductos
  }
}

mutation{
  deleteProductosCarritoByIdCarrito(idCarrito:6)
}

 -------------------- Query Carritos by IdUsuario --------------------
query {
   carritoByIdUsuario(idusuario:1){
    idCarrito
    idUsuario
    totalprecio    
    totalproductos
  }
}

 */