import {gql} from "apollo-boost";

export const GET_ALL_CATEGORIES = gql`
    {
        allCategories{
        _id
        idCategoria
        nombre
        }
    }
`;
