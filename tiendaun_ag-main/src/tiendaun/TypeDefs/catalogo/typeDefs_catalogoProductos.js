export const catalogoTypeDef = `
    type Producto {
        idProducto: Int!
        nombre: String!
        descripcion: String
        precio: Int!
        cantidadDisponible: Int!
        imagen: String
        categoria: String
    }
    type msg {
        mensaje:String
    }
    input ProductoInput {
        nombre: String!
        descripcion: String
        precio: Int!
        cantidadDisponible: Int!
        categoria: String
    }
    input UpdateProduct {
        nombre: String
        descripcion: String
        precio: Int
        cantidadDisponible: Int
        categoria: String
    }
    input UpdateProductQuantity {
        cantidadDisponible: Int
    }
    `;

export const catalogoQueries = `
      allProducts: [Producto]!
      productById(id: Int!): Producto
  `;

export const catalogoMutations = `
    createProduct(product: ProductoInput!, idUser: Int!): msg
    updateProduct(id: Int!, product: UpdateProduct!, idUser: Int!): msg
    deleteProduct(id: Int!, idUser: Int!): msg
    updateProductQuantity(idProduct: Int!, Quantity: UpdateProductQuantity): msg
`;