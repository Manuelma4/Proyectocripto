export const categoryTypeDef = `
  type Categoria{
      _id: ID!
      idCategoria: Int!
      nombre: String!
  }
  input CategoryInput {
      idCategoria: Int!
      nombre: String!
  }`;

export const categoryQueries = `
      allCategories: [Categoria]!
  `;

export const categoryMutations = `
    createCategory(category: CategoryInput!, idUser:Int!): msg
`;