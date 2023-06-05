import { generalRequest, getRequest } from '../../../utilities';
import { url_carrito, entryPoint_transacciones } from '../../server';

const URL = `https://${url_carrito}/${entryPoint_transacciones}`;

const resolvers = {
	Query: {
		allTransacciones: (_) =>
			getRequest(URL,''),
		transaccionesById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		transaccionesByIdCarrito: (_, { id }) =>
			generalRequest(`${URL}/carrito/${id}`, 'GET'),  
	},
	Mutation: {	
		createTransaccion: (_, { transaccion }) =>
			generalRequest(`${URL}`, 'POST', transaccion),
		deleteTransaccion: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;

/*

query {
  allTransacciones{
    idTransaccion
    idCarrito
    pagoTotal
    estadoTransaccion
  }
}
 -------------------- 
mutation {
  deleteTransaccion(id:5) {
    idTransaccion
    idCarrito
    estadoTransaccion
    pagoTotal
  }
}
 --------------------
mutation {
  createTransaccion(transaccion:{idCarrito:3,estadoTransaccion:"Aceptada",pagoTotal:3}) {
    idTransaccion
    idCarrito
    estadoTransaccion
    pagoTotal
  }
}

 */

