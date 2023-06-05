export const pqrTypeDef = `
  type pqr {
        _id: String
        Solicitud: String!
        Motivo: String!
        Mensaje: String!
        Usuario_id: Int!
        createdAt: String
        updatedAt: String
        status: String 

  }

  type PQRmsg{
      status: String
    }

  input pqrInput {
        Solicitud: String!
        Motivo: String!
        Mensaje: String!
        Usuario_id: String!
        _id: String
        createdAt: String
        updatedAt: String

  }`;

  

export const pqrQueries = `
      allPQR: [pqr]!
      pqrById(id: String!): pqr!
  `;

export const pqrMutations = `
    createPQR(pqr: pqrInput!): PQRmsg
    updatePQR(id: String!, pqr: pqrInput!): PQRmsg
    deletePQR(id: String!): PQRmsg
`;