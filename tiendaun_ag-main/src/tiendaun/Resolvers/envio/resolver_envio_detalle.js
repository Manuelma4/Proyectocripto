import { generalRequest, getRequest } from '../../../utilities';
//import { url, enviodetalle_port, enviodetalle_entryPoint } from '../../server';

const URL = `https://tiendaun-envios-ms-7gru2wm3bq-uc.a.run.app`;
const msName = "tiendaun_user_ag";

const resolvers = {
	Query: {
    allEnvioDetalle: (_) =>
      getRequest(`${URL}/enviodetalle`, ''),
		envioDetalleById: (_, { id }) =>
			generalRequest(`${URL}/enviodetalle/${id}`, 'GET'),
    envioDetalleByIdEnvio:(_, { idenvio }) =>
    generalRequest(`${URL}/enviodetallepornevio/${idenvio}`, 'GET'),   
	},
	Mutation: {
		createEnvioDetalle: (_, { enviodetalle }) =>
			generalRequest(`${URL}/enviodetalle/`, 'POST', enviodetalle),
		updateEnvioDetalle: (_, { id, enviodetalle }) =>
			generalRequest(`${URL}/enviodetalle/${id}`, 'PUT', enviodetalle),
		deleteEnvioDetalle: (_, { id }) =>
			generalRequest(`${URL}/enviodetalle/${id}`, 'DELETE')
	}
};

export default resolvers;

/*
-------------------- Crear enviodetalle --------------------
mutation {
  createEnvioDetalle(enviodetalle: {
		id_producto:2,
		id_envio:1,
		cantidad:2,
		subtotal:5555,
  }) {
    id
  }
}

-------------------- Update enviodetalle --------------------
mutation {
  updateEnvioDetalle(id: 1, enviodetalle: {
    id_producto:49,
    id_envio:1,
    cantidad:49,
    subtotal:494949,
  }) {
    id_producto,
    id_envio{
      id,
      id_cliente
    },
    cantidad,
    subtotal
  }
}

-------------------- Query All Envio Detalle --------------------
query {
  allEnvioDetalle {
    id_producto,
    id_envio{
      id,
      id_cliente,
      estado,
      precio_total,
      fecha_creacion,
      fecha_entrega
    },
    cantidad,
    subtotal
  }
}

-------------------- Query Envio Detalle by IdEnvio --------------------
query {
  envioDetalleByIdEnvio(idenvio: 5) {
    id,
    id_producto,
    id_envio{
      id,
      id_cliente,
      estado
    },
    cantidad,
    subtotal
  }
}

-------------------- QueryById --------------------
query {
  envioDetalleById(id: 1) {
    id,
    id_producto,
    id_envio{
      id,
      id_cliente,
      estado
    },
    cantidad,
    subtotal
  }
}
*/