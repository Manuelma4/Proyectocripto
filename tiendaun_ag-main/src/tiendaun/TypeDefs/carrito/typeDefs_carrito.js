export const carritoTypeDef = `
  type Carrito {
      idCarrito: Int!
      idUsuario: Int!
      totalprecio: Int!
      totalproductos: Int!
  }
  input CarritoInput {
      idUsuario: Int!
  }`;

export const carritoQueries = `
      allCarritos: [Carrito]!
      carritoById(id: Int!): [Carrito]!
      carritoByIdUsuario(idusuario: Int!): [Carrito]!
  `;

export const carritoMutations = `
    createCarrito(carrito: CarritoInput!): Carrito!
    updateCarrito(id: Int!): Carrito!
    deleteCarrito(id: Int!): Carrito!
`;