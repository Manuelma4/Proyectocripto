//import envioTypeDef from '../envio/typeDefs_envio'
export const enviodetalleTypeDef = `
  type EnvioDetalle {
      id: Int!
      id_producto: Int!
      id_envio: Envio!
      cantidad: Int!
      subtotal: Int!
  }
  input EnvioDetalleInput {      
      id_producto: Int!
      id_envio: Int!
      cantidad: Int!
      subtotal: Int!
  }`;

export const enviodetalleQueries = `
      allEnvioDetalle: [EnvioDetalle]!
      envioDetalleById(id: Int!): EnvioDetalle!
      envioDetalleByIdEnvio(idenvio:Int!):[EnvioDetalle]!
  `;

export const enviodetalleMutations = `
    createEnvioDetalle(enviodetalle: EnvioDetalleInput!): EnvioDetalle!
    updateEnvioDetalle(id: Int!, enviodetalle: EnvioDetalleInput!): EnvioDetalle!
    deleteEnvioDetalle(id: Int!): Int
`;