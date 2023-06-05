import {gql} from "apollo-boost";

export const GET_USER_BY_USER = gql`
query getUserByUser($username: String!) {
  getUserByUser(username: $username) {
    username
    idRol
    idUsuario
    email
    password
  }
}
`;