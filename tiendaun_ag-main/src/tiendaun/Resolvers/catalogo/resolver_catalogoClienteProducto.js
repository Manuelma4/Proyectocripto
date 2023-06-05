import { generalRequest, getRequest } from '../../../utilities';
import { catalogo_url } from '../../server';

const URL = `${catalogo_url}/clientes/productos`;

const resolvers = {
	Query: {
		allProducts: (_) =>
			getRequest(URL, '')
		,
		productById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		// createCategory: (_, { category }) =>
		// 	generalRequest(`${URL}/`, 'POST', category),
		updateProductQuantity: (_, { idProduct, Quantity }) =>
		  generalRequest(`${URL}/${idProduct}`, 'PUT', Quantity),
		// deleteCategory: (_, { id }) =>
		// 	generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;