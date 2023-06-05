export const cuentaTypeDef = `
  type Cuenta {
      id: Int
      idUser: Int
      lastName: String
      firstName: String
      phoneNumber: String
      address: String
      birth: String
      timeCreated: String
      city: String
  }

  type CuentaMsg{
    msg: String
  }

  type ApiStatus {
    status: String
  }
  input CuentaInput {
      userId: Int!
      firstName: String!
      lastName: String!
      address: String!
      phoneNumber: String!
  }
  
  input CuentaCreation{
    idUser: Int!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    address: String!
    birth: String
    timeCreated: String
    city: String!
  }
  
  `;


export const cuentaQueries = `
      allCuentas: [Cuenta]!
      cuentaById(id: Int!): Cuenta
      apiStatus: ApiStatus
  `;

export const cuentaMutations = `
    createCuenta(cuenta: CuentaCreation!): Cuenta!
    updateCuenta(cuenta: CuentaInput!): Cuenta!
    deleteCuenta(id: Int!): Int!
`;