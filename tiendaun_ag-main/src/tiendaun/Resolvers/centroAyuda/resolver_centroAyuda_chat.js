import { generalRequest, getRequest } from '../../../utilities';
import { url, port_CentroAyuda, entryPoint_Chat } from '../../server';
import userResolvers from '../auth/resolver_user';


const URL = `${port_CentroAyuda}/${entryPoint_Chat}`;

console.log(URL)
const resolvers = {
	Query: {
		allMessage: (_) =>
			getRequest(URL,''),

		allMessageByUserId: (_, { Usuario_id }) =>{
		
			return generalRequest(`${URL}/${Usuario_id}`, 'GET')},
	},  

	



	Mutation: {
		createMessage: async (_, { chat }) =>{
			console.log(chat.Usuario_id)
			const user = await userResolvers.Query.getUserById(null, { idUsuario: chat.Usuario_id });
			const admin = await userResolvers.Query.getUserById(null, { idUsuario: chat.Administrador_id });


			
			console.log(user)



			const message = {
				Usuario_id: user.idUsuario,
				Administrador_id: admin.idUsuario,
				Mensaje: chat.Mensaje,
				Remitente: chat.Remitente,

			};		

			return generalRequest(`${URL}`, 'POST', message)},
		deleteMessage: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;

