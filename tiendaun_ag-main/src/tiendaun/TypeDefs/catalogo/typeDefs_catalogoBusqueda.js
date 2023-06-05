export const CatalogoSearchTypeDef = `
    type Product {
        idProducto: Int!
        nombre: String!
        descripcion: String
        precio: Int!
        cantidadDisponible: Int!
        imagen: String
        categoria: String
    }
    input searchInput {
        nombre: String!
    }
    `;
export const CatalogoSearchQueries = `
      productByName(name: String!): [Product]!
      filterProducts(categories: String, minPrice: Int, maxPrice: Int):[Product]!
  `;

export const CatalogoSearchMutations = `

`;