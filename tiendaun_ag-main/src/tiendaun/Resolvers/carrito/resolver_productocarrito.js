import { generalRequest, getRequest } from '../../../utilities';
import { url_carrito, entryPoint_productocarrito } from '../../server';


import carritoResolvers from '../carrito/resolver_carrito';
import catalogoAdminResolvers from '../catalogo/resolver_catalogoAdminProducto';
import { catalogo_url } from '../../server';

const URLCatalogo = `${catalogo_url}/clientes/productos`;

const URL = `https://${url_carrito}/${entryPoint_productocarrito}`;

const resolvers = {
	Query: {
		allProductosCarrito: (_) =>
			getRequest(URL,''),
		//id de procuto_carrito
		productosCarritoById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'), 
		productosCarritoByIdProducto: (_, { id }) =>
			 generalRequest(`${URL}/producto/${id}`, 'GET'),    
		productosCarritoByIdCarrito: (_, { idcarrito }) =>
			 generalRequest(`${URL}/carrito/${idcarrito}`, 'GET'),    
	},
	Mutation: {
		createProductoCarrito: async (_, {productocarrito}) =>{
			const producto = await catalogoAdminResolvers.Query.productById(null, { id: productocarrito.idProducto });
			const productocarrito2 = {
				idProducto: producto.idProducto,                   
				idCarrito: productocarrito.idCarrito,
				precio: producto.precio,
				cantProducto: productocarrito.cantProducto
			};
			const cantidadFinal =producto.cantidadDisponible - productocarrito.cantProducto
			if (cantidadFinal>0){
				generalRequest(`${URLCatalogo}/${producto.idProducto}`, 'PUT',  { cantidadDisponible: cantidadFinal })
				const creacion = generalRequest(`${URL}`, 'POST', productocarrito2)
				carritoResolvers.Mutation.updateCarrito(null, { id: productocarrito.idCarrito})
				return creacion
			}
			else{
				carritoResolvers.Mutation.updateCarrito(null, { id: productocarrito.idCarrito})				
				return null
			}			
			// NULLL=no ahi suficiente cantidad o no exixste ese id de oroducto en productos
			// mensaje = await catalogoResolvers.Query.updateProductQuantity(null, { idProduct: 2, Quantity: { cantidadDisponible: 4 } })
			// catalogoResolvers.Query.updateProduct(null, { id: idproducto })
		},
		//id de producto y toma el id de carrito de productocarrito ,SE SUMA A LA CANTIDAD DEL PRODUCTO
		updateCantidadProductoCarrito: (_, { id, productocarrito }) =>{
			const resultado= generalRequest(`${URL}/${id}`, 'PUT', productocarrito)
			carritoResolvers.Mutation.updateCarrito(null, { id: productocarrito.idCarrito})
			return resultado
		},
		//eliminacion de producto_carrito por su id
		deleteProductoCarritoById:  (_, { id }) =>{
			const respuesta= generalRequest(`${URL}/${id}`, 'DELETE')
			carritoResolvers.Mutation.updateCarrito(null, { id: respuesta.idCarrito})
			return respuesta
		},			
		//eliminacion de un producto de un carrito, id es id de producto
		deleteByIdProductoDelCarrito: (_, { id,carrito }) =>{
			const respuesta = generalRequest(`${URL}/producto/${id}`, 'DELETE', carrito)
			carritoResolvers.Mutation.updateCarrito(null, { id: carrito.idCarrito})
			return respuesta
		},
			
		//Restar cantridad de un producto de un carrito, id es id de producto
		deleteCantidadProductoCarrito: (_, { id, cantidad, carrito }) =>{
			const respuesta=generalRequest(`${URL}/${id}/${cantidad}`, 'DELETE', carrito)
			carritoResolvers.Mutation.updateCarrito(null, { id: carrito.idCarrito})
			return respuesta
		},
		//Restar cantridad de un producto de un carrito, id es id de producto
		deleteProductosCarritoByIdCarrito: (_, { idCarrito}) =>{
			const respuesta=generalRequest(`${URL}/carrito/${idCarrito}`, 'DELETE')
			carritoResolvers.Mutation.updateCarrito(null, { id: idCarrito})
			return respuesta
		}

			
	}
};

export default resolvers;

/*
-------------------- Query all productocarrito --------------------
query {
  allProductosCarrito {
    idCarrito
    idProducto    
    precio
    cantProducto
  }
}
mutation {
  createProductoCarrito(productocarrito:{
    idCarrito:1
    idProducto:3
    cantProducto:1
    precio:100
  }){
    idProducto
    precio
    cantProducto
  }
}
mutation {
  deleteByIdProductoDelCarrito(id:4,carrito:{idCarrito:3}) {
    idProducto
    idCarrito
    cantProducto
    precio
  }
}
mutation {
  deleteCantidadProductoCarrito(id:3,cantidad:3,carrito:{idCarrito:3}) {
    idProducto
    idCarrito
    cantProducto
    precio
  }
}
*/