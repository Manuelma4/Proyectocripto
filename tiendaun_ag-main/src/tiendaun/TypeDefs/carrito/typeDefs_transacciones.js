export const transaccionesTypeDef = `
  type Transacciones {
      idTransaccion: Int!
      idCarrito: Int!
      estadoTransaccion: String!
      pagoTotal: Int!
  }
  input TransaccionesInput {
      idCarrito: Int!
      estadoTransaccion: String!
      pagoTotal: Int!
  }`;

export const transaccionesQueries = `
      allTransacciones: [Transacciones]!
      transaccionesById(id: Int!): [Transacciones]!
      transaccionesByIdCarrito(id: Int!): [Transacciones]!
  `;

export const transaccionesMutations = `
    createTransaccion(transaccion: TransaccionesInput!): Transacciones!
    deleteTransaccion(id: Int!): Transacciones!
`;