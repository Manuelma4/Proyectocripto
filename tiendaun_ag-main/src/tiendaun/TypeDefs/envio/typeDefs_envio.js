export const envioTypeDef = `
  type Envio {
      id: Int!
      id_cliente: Int!
      precio_total: Int!
      estado: String!
      fecha_creacion: String!
      fecha_entrega: String!
  }
  input EnvioInput {      
      id_cliente: Int!      
  }
  input SecondEnvioInput {      
    id_cliente: Int!
    precio_total: Int!
    estado: String!
    fecha_creacion: String!
    fecha_entrega: String!
  }`;

export const envioQueries = `
      allEnvios: [Envio]!
      envioById(id: Int!): Envio!
      envioByIdCliente(idcliente: Int!): [Envio]!
  `;

export const envioMutations = `
    createEnvio(id_cliente: Int!): Envio!
    updateEnvio(id: Int!, envio: SecondEnvioInput!): Envio!
    deleteEnvio(id: Int!): Int
`;
