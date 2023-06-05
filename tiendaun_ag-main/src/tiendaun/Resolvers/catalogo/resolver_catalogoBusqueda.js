import { generalRequest } from '../../../utilities';
import { catalogo_url } from '../../server';

const URL = `${catalogo_url}/productos/busqueda`;
const URL2 = `${catalogo_url}/productos/filtro`;

const resolvers = {
	Query: {
		productByName: (_, { name },) =>
			generalRequest(`${URL}/?nombre=${name}`, 'GET'),
		filterProducts: (_, { categories,minPrice,maxPrice }) =>
			generalRequest(`${URL2}/?categorias=${categories}&minPrice=${minPrice}&maxPrice=${maxPrice}`, 'GET'),
	},
	Mutation: {
		// createCategory: (_, { category }) =>
		// 	generalRequest(`${URL}/`, 'POST', category),
		// updateCategory: (_, { id, category }) =>
		// 	generalRequest(`${URL}/${id}`, 'PUT', category),
		// deleteCategory: (_, { id }) =>
		// 	generalRequest(`${URL}/${id}`, 'DELETE')
	}
};
export default resolvers;