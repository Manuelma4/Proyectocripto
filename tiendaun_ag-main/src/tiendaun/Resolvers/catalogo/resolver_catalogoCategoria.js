import { generalRequest, getRequest } from '../../../utilities';
import { catalogo_url } from '../../server';
import userResolvers from '../auth/resolver_user';

const URL = `${catalogo_url}/admins/categorias`;

const resolvers = {
	Query: {
		allCategories: (_) =>
			getRequest(URL,''),
		// categoryById: (_, { id }) =>
		// 	generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createCategory: async (_, {category, idUser}) =>
		{
			const user = await userResolvers.Query.getUserById(null, { idUsuario: idUser });
			if (user.idRol==1){
				generalRequest(`${URL}`, 'POST', category);
			}
			else{
				return ( { message: 'No tienes permiso para crear una categoria' });
			}
		}
	}
};

export default resolvers;