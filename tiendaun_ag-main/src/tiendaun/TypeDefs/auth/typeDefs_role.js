export const roleTypeDef = `
  type role {
      idRol: Int!
      nombreRol: String!
  }

  type roleMsg{
    msg: String
  }

  input roleInput {
    idRol: Int!
    nombreRol: String!
}`;
  

export const roleQueries = `
      getAllRoles: [role]!
      getRolesById(id: String!): role!
  `;

export const roleMutations = `
    createRole(role: roleInput!): role!
    updateRole(role: roleInput!): roleMsg!
    deleteRole(id: String!): Int
`;