export const chatTypeDef = `
  type chat {
        _id: String
        Usuario_id: Int!
        Administrador_id: Int!
        Mensaje: String!
        Remitente: String!
        createdAt: String
        Update_At: String
        updatedAt: String

 
  }
  type PQRres{
    status: String
  }

  input chatInput {


    
        Usuario_id: Int!
        Administrador_id: Int!
        Mensaje: String!
        Remitente: String!

        
  }`;

  

export const chatQueries = `
    allMessage: [chat]!
    allMessageByUserId(Usuario_id: Int!): [chat]!
  `;

export const chatMutations = `
    createMessage(chat: chatInput!): PQRres
    deleteMessage(id: String!): PQRres
`;