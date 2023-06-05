import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

//******************CUENTA**** */
import {
	cuentaMutations,
	cuentaQueries,
	cuentaTypeDef
} from './tiendaun/TypeDefs/cuenta/typeDefs_cuenta';
import cuentaResolvers from './tiendaun/Resolvers/cuenta/resolver_cuenta';			

//*************role***********/
import {
	roleMutations,
	roleQueries,
	roleTypeDef
} from './tiendaun/TypeDefs/auth/typeDefs_role';
import roleResolvers from './tiendaun/Resolvers/auth/resolver_role';

//*************user***********/
import {
	userMutations,
	userQueries,
	userTypeDef
} from './tiendaun/TypeDefs/auth/typeDefs_user';
import userResolvers from './tiendaun/Resolvers/auth/resolver_user';

//*************CUENTA *******************/

//******************CARRITO**** */
import {
	carritoTypeDef,
	carritoQueries,
	carritoMutations
} from './tiendaun/TypeDefs/carrito/typeDefs_carrito';
import carritoResolvers from './tiendaun/Resolvers/carrito/resolver_carrito';

//******************SOAP**** */
import {
	soapTypeDef,
	soapQueries
} from './tiendaun/TypeDefs/SolicitudSOAP/typeDefs_SOAP';
import soapResolvers from './tiendaun/Resolvers/SolicitudSOAP/resolver_SOAP';

import {
	productocarritoTypeDef,
	productocarritoQueries,
	productocarritoMutations
} from './tiendaun/TypeDefs/carrito/typeDefs_productocarrito';
import productocarritoResolvers from './tiendaun/Resolvers/carrito/resolver_productocarrito';

import {
	transaccionesTypeDef,
	transaccionesQueries,
	transaccionesMutations
} from './tiendaun/TypeDefs/carrito/typeDefs_transacciones';
import transaccionesResolvers from './tiendaun/Resolvers/carrito/resolver_transacciones';


//******************CATALOGO**** */
import {
	catalogoTypeDef,
	catalogoQueries,
	catalogoMutations
} from './tiendaun/TypeDefs/catalogo/typeDefs_catalogoProductos';
import catalogoAdminProdsResolvers from './tiendaun/Resolvers/catalogo/resolver_catalogoAdminProducto';
import catalogoCustomerProdsResolvers from './tiendaun/Resolvers/catalogo/resolver_catalogoClienteProducto';

import {
	categoryTypeDef,
	categoryQueries,
	categoryMutations
} from './tiendaun/TypeDefs/catalogo/typeDefs_catalogoCategorias';
import catalogoAdminCatsResolvers from './tiendaun/Resolvers/catalogo/resolver_catalogoCategoria';

import {
	CatalogoSearchTypeDef,
	CatalogoSearchQueries,
	CatalogoSearchMutations
} from './tiendaun/TypeDefs/catalogo/typeDefs_catalogoBusqueda';
import catalogoSearchResolvers from './tiendaun/Resolvers/catalogo/resolver_catalogoBusqueda';
//******************CENTRO AYUDA PQR**** */

import {
	pqrTypeDef,
	pqrQueries,
	pqrMutations
} from './tiendaun/TypeDefs/centroAyuda/typeDefs_centroAyuda_PQR';
import pqrResolvers from './tiendaun/Resolvers/centroAyuda/resolver_centroAyuda_PQR';



//******************CENTRO AYUDA CHAT**** */

import {
	chatTypeDef,
	chatQueries,
	chatMutations
} from './tiendaun/TypeDefs/centroAyuda/typeDefs_centroAyuda_chat';
import chatResolvers from './tiendaun/Resolvers/centroAyuda/resolver_centroAyuda_chat';




//envio
import {
	enviodetalleMutations,
	enviodetalleQueries,
	enviodetalleTypeDef
} from './tiendaun/TypeDefs/envio/typeDefs_envio_detalle';
import envioDetalleResolvers from './tiendaun/Resolvers/envio/resolver_envio_detalle';

import {
	envioMutations,
	envioQueries,
	envioTypeDef
} from './tiendaun/TypeDefs/envio/typeDefs_envio';
import envioResolvers from './tiendaun/Resolvers/envio/resolver_envio';



// merge the typeDefs for multiple schemas
const mergedTypeDefs = mergeSchemas(
	['scalar JSON', cuentaTypeDef, carritoTypeDef, productocarritoTypeDef, roleTypeDef,userTypeDef,pqrTypeDef,
		chatTypeDef, catalogoTypeDef, categoryTypeDef, CatalogoSearchTypeDef, envioTypeDef, enviodetalleTypeDef, transaccionesTypeDef, soapTypeDef],
	[cuentaQueries,  carritoQueries, productocarritoQueries, roleQueries, userQueries, pqrQueries,chatQueries, 
		catalogoQueries, categoryQueries, CatalogoSearchQueries, envioQueries, enviodetalleQueries, transaccionesQueries, soapQueries],
	[cuentaMutations, carritoMutations, productocarritoMutations, roleMutations, userMutations, pqrMutations,
		chatMutations, catalogoMutations, categoryMutations, CatalogoSearchMutations, envioMutations, enviodetalleMutations, transaccionesMutations],	
);

//merge the resolvers for multiple schemas
const mergedResolvers = merge(
	{ JSON: GraphQLJSON }, // allows scalar JSON
	cuentaResolvers,
	roleResolvers,
	userResolvers,
	carritoResolvers,
	soapResolvers,
	pqrResolvers,
	chatResolvers,
	productocarritoResolvers,
	catalogoAdminProdsResolvers,
	catalogoAdminCatsResolvers,
	catalogoCustomerProdsResolvers,
	catalogoSearchResolvers,
	envioResolvers,
	envioDetalleResolvers,
	transaccionesResolvers
  );

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers
});



