import { generalRequest, getRequest } from '../../../utilities';
import { catalogo_url } from '../../server';
import userResolvers from '../auth/resolver_user';
import {producer} from '../../senderMQ/send'
const URL = `${catalogo_url}/admins/productos`;
const URL2 = `${catalogo_url}/clientes/productos`;


const resolvers = {
	Query: {
		allProducts: (_) =>{
			getRequest(URL, '');
			
		}
			,
		productById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createProduct: async (_, { product, idUser }) =>{		
			const user = await userResolvers.Query.getUserById(null, { idUsuario: idUser });
			if (user.idRol==1){
				producer(product);
				//generalRequest(`${URL}/`, 'POST', product)
				return ( { mensaje: 'Producto creado' })
				
			}
			else{
				return ( { mensaje: 'No tienes permiso para crear un producto' })
			}
			}
			,
		updateProduct: async (_, { id, product, idUser }) =>{
			const user = await userResolvers.Query.getUserById(null, { id: idUser });
			if (user.idRol==1){
				const msg =generalRequest(`${URL}/${id}`, 'PUT', product);
				return msg
			}
			else{
				return ( { mensaje: 'No tienes permiso para actualizar un producto' });
			}
		}
		 	,
		deleteProduct: async (_, { id, idUser }) =>
		 	{
			const user = await userResolvers.Query.getUserById(null, { id: idUser });
			if (user.idRol==1){
				generalRequest(`${URL}/${id}`, 'DELETE')
			}
			else{
				return ( { message: 'No tienes permiso para eliminar un producto' })
			}
			}
	}
};

export default resolvers;