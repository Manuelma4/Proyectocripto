export const productocarritoTypeDef = `
  type Productocarrito {
      idProducto_Carrito: Int!
      idProducto: Int!
      idCarrito: Int!
      precio: Int!
      cantProducto: Int!
  }
  input ProductocarritoInput {
      idProducto: Int!
      idCarrito: Int!
      precio: Int!
      cantProducto: Int!
  }
  input CantidadInput {
      idCarrito: Int!
  }`;
  

export const productocarritoQueries = `
      allProductosCarrito: [Productocarrito]!
      productosCarritoById(id: Int!): [Productocarrito]!
      productosCarritoByIdProducto(id: Int!): [Productocarrito]!
      productosCarritoByIdCarrito(idcarrito: Int!): [Productocarrito]!
  `;

export const productocarritoMutations = `
    createProductoCarrito(productocarrito: ProductocarritoInput!): Productocarrito 
    updateCantidadProductoCarrito(id: Int!, productocarrito: ProductocarritoInput!): Productocarrito!
    deleteProductoCarritoById(id: Int!): Productocarrito!
    deleteByIdProductoDelCarrito(id: Int!, carrito: CantidadInput!): Productocarrito!
    deleteCantidadProductoCarrito(id: Int!, cantidad: Int!, carrito: CantidadInput!): Productocarrito!
    deleteProductosCarritoByIdCarrito(idCarrito: Int!): Int!
`;