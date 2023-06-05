import { generalRequest, getRequest } from '../../../utilities';
import { auth_url, role_entryPoint } from '../../server';

const URL = `${auth_url}/${role_entryPoint}`;
const msName = "tiendaun_role_ag";

const resolvers = {
    Query: {
        getAllRoles: () =>
            getRequest(URL, ''),
        getRolesById: (_, { id }) => 
            generalRequest(`${URL}/${id}`, 'GET'),
      },
      Mutation: {
        createRole: (_, { role }) => 
            generalRequest(`${URL}/`, 'POST', role),
        updateRole: (_, { id, role }) => 
            generalRequest(`${URL}/${id}`, 'PUT', role),
        deleteRole: (_, { id }) => 
            generalRequest(`${URL}/${id}`, 'DELETE')
      }
  };

export default resolvers;