import { generalRequest, getRequest } from '../../../utilities';
import { url, port_CentroAyuda, entryPoint_PQR } from '../../server';
import userResolvers from '../auth/resolver_user';

const URL = `${port_CentroAyuda}/${entryPoint_PQR}`;
console.log(URL)
const resolvers = {
	Query: {
		allPQR: (_) =>
			getRequest(URL,''),
		pqrById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createPQR: async (_, { pqr, idUser }) =>{
			const user = await userResolvers.Query.getUserById(null, { id: pqr.Usuario_id });
			
			const PQR = {
				Solicitud: pqr.Solicitud,
				Motivo: pqr.Motivo,
				Mensaje: pqr.Mensaje,
				Usuario_id: user.idUsuario
			};

			console.log(user)
		 	return generalRequest(`${URL}`, 'POST', PQR)
		},
		// createPQR: (_, { pqr }) =>
		// 	generalRequest(`${URL}`, 'POST', pqr),

		updatePQR: (_, { id, pqr }) =>
			generalRequest(`${URL}/${id}`, 'PUT', pqr),
		deletePQR: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;

