import {gql} from "apollo-boost";

export const GET_ALL_PRODUCTS = gql`
    {
        allProducts{
            idProducto
            nombre
            descripcion
            precio
            cantidadDisponible
            imagen
        }
    }
`;
export const FILTER_PRODUCTS = gql`
  query filterProducts($categories: String, $minPrice: Int, $maxPrice: Int) {
    filterProducts(categories: $categories, minPrice: $minPrice, maxPrice: $maxPrice) {
      idProducto
      nombre
      precio
      categoria
      cantidadDisponible
    }
  }
`;
export const GET_PRODUCT_BY_NAME = gql`
query getProductByName($name: String!) {
  productByName(name: $name) {
    idProducto
    nombre
    descripcion
    precio
    imagen
  }
}
`;
export const GET_PRODUCT_BY_NAME_NAVBAR = gql`
query getProductByNameNavBar($name: String!) {
  productByName(name: $name) {
    idProducto
    nombre
  }
}
`;
export const CREATE_PRODUCT = gql`
mutation CreateProduct($product: ProductoInput!, $idUser: String!) {
  createProduct(product: $product, idUser: $idUser) {
    msg
  }
}
`;