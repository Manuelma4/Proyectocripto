import { generalRequest, getRequest } from '../../../utilities';
//import { url, envio_port, envio_entryPoint } from '../../server';

import carritoResolvers from '../carrito/resolver_carrito';
import productocarritoResolvers from '../carrito/resolver_productocarrito';
import envioDetalleResolvers  from '../envio/resolver_envio_detalle';

const URL = `https://tiendaun-envios-ms-7gru2wm3bq-uc.a.run.app`;
const msName = "tiendaun_user_ag";

const resolvers = {
	Query: {
		allEnvios: (_) =>
			getRequest(`${URL}/envios`, ''),
		envioById: (_, { id }) =>
			generalRequest(`${URL}/envios/${id}`, 'GET'),
		envioByIdCliente: (_, { idcliente }) =>
			generalRequest(`${URL}/enviosporcliente/${idcliente}`,'GET')

	},
	Mutation: {
		createEnvio: async (_, { id_cliente},) =>{
      //Obtener el carrito del usuario
      console.log("----------------------------------------------Traer carrito list:----------------------------------------------------");
      const carritoList = await carritoResolvers.Query.carritoByIdUsuario(_, {idusuario:id_cliente});
      console.log("----------------------------------------------carrito list:----------------------------------------------------");
      console.log("carritoList");
      console.log(carritoList);
      const carrito=carritoList[0]
      console.log("----------------------------------------------carrito:----------------------------------------------------");      
      console.log(carrito);
      
      //------------------------------Current Date------------------------------
      const currentDate = new Date();

      // Obtener año, mes y día de currentDate
      const currentyear = currentDate.getFullYear();
      const currentmonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      const currentday = String(currentDate.getDate()).padStart(2, '0');

      //------------------------------Next Date------------------------------
      const nextDate = new Date();

      //+10 días
      nextDate.setDate(nextDate.getDate() + 10);

      //Obtener año, mes y día de currentDate
      const nextyear = nextDate.getFullYear();
      const nextmonth = String(nextDate.getMonth() + 1).padStart(2, '0');
      const nextday = String(nextDate.getDate()).padStart(2, '0');      

      //Crear el envio
      const envio = {
        id_cliente: id_cliente, 
        precio_total: carrito.totalprecio,
        estado: "En proceso",
        fecha_creacion: `${currentyear}-${currentmonth}-${currentday}`,
        fecha_entrega: `${nextyear}-${nextmonth}-${nextday}`
      };
      console.log("envio");
      console.log(envio);
      return(generalRequest(`${URL}/envios/`, 'POST', envio)).then( async(response)=>{
        //ProductoCarrito del 
        console.log("-----------------------------------Response-----------------------------------");
        console.log(response);

        const productocarritoList= await productocarritoResolvers.Query.productosCarritoByIdCarrito(_,{idcarrito:carrito.idCarrito});
        console.log("-----------------------------------Producto Carrito List-----------------------------------");
        console.log(productocarritoList);
                
        //Se filtran los producto carrito correspondientes al carrito del usuario
        //const carrito1List = productocarritoList.filter(elemento => elemento.idCarrito === carrito.idCarrito);
        
        productocarritoList.forEach(productocarrito => {
          const enviodetalle={
            id_envio:response.id,
            id_producto:productocarrito.idProducto,
            cantidad:productocarrito.cantProducto,
            subtotal:(productocarrito.cantProducto*productocarrito.precio)
          }
          const createdEnvioDetalle = envioDetalleResolvers.Mutation.createEnvioDetalle(_, {enviodetalle}).
          then((createdEnvioDetalle) => {
            //console.log("--------------------------------------------------enviodetalle creado:--------------------------------------------------");
            //console.log(createdEnvioDetalle);
          });
          
        });
        return response;
      });
    },
		updateEnvio: (_, { id, envio }) =>
			generalRequest(`${URL}/envios/${id}`, 'PUT', envio),
		deleteEnvio: (_, { id }) =>
			generalRequest(`${URL}/envios/${id}`, 'DELETE')
	}
};

export default resolvers;


/*
-------------------- Crear envío --------------------
-----------------------Crear un envio-----------------------
mutation createEnvio($id_cliente: Int!) {
  createEnvio(id_cliente: $id_cliente) {
    id
    id_cliente
    precio_total
    estado    
    fecha_creacion
    fecha_entrega    
  }
}
Query Variables:
{
  "id_cliente": 1
}

-------------------- Update Envío --------------------
mutation {
	updateEnvio(id: 1, envio: {
	  id_cliente: 1,
	  precio_total: 2222,
	  estado:"Terminado",
	  fecha_creacion:"2023-04-18",
	  fecha_entrega:"2023-04-18"
	}) {
	  id
	  id_cliente
	  precio_total,
	  estado,
	  fecha_creacion,
	  fecha_entrega
	}
  }

-------------------- Query All Envios --------------------
query {
  allEnvios {
    id,
    id_cliente,
    precio_total
  }
}

-------------------- QueryByIdEnvio --------------------
query {
  envioById(id: 1) {
    id,
    id_cliente,
    precio_total
  }
}

-------------------- QueryByIdCliente --------------------
query {
  envioByIdCliente(idcliente:1) {
    id,
    id_cliente,
    precio_total,
    estado,
    fecha_creacion,
    fecha_entrega
  }
}

-------------------- DeleteEnvio --------------------
mutation {
  deleteEnvio(id: 4)
}
*/