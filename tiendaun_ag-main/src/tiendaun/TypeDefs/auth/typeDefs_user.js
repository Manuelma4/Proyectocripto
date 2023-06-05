export const userTypeDef = `
  type user {
      _id: ID!
      idUsuario: Int
      username: String!
      idRol: Int
      password: String
      email: String
  }

  type login{
    idusuario: Int
    token: String
  }

  input userExtra{
    lastName: String
    firstName: String
    phoneNumber: String
    address:String
    birth: String
    city:String
  }

  input changePassword{
    username: String!
    Password: String!
    newPassword: String!
  }

  type userMsg{
    msg: String
  }

  input userInput {
    username: String
    idRol: Int
    password: String
    email: String
  }`;

export const userQueries = `
      getAllUsers: [user]!
      getUserById(idUsuario: Int!): user!
      getUserByUser(username: String!): user!     
  `;
  
export const userMutations = `
    getLoginStatus(username: String!, email: String!): userMsg!
    login(username: String!, password: String!): user!
    changePassword(username: String!, Password: String!, newPassword: String!): msg!
    logout: msg!
    createUser(user: userInput!, userExtra: userExtra): user!
    updateUser(user: userInput!): userMsg!
    deleteUser(id: String!): Int
`;