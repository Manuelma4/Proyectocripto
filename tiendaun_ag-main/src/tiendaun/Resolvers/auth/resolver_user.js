import { generalRequest, getRequest } from '../../../utilities';
import { auth_url, user_port, user_entryPoint } from '../../server';
import cuentaResolvers from '../cuenta/resolver_cuenta';
import carritoResolvers from '../carrito/resolver_carrito';
import { Ldap } from '../../../ldap';

const URL = `${auth_url}/${user_entryPoint}`;
const msName = "tiendaun_user_ag";

const resolvers = {
  Query: {
    getAllUsers: () =>
      getRequest(URL, ''),
    getUserById: (_, { idUsuario }) =>
      generalRequest(`${URL}/${idUsuario}`, 'GET'),
    getUserByUser: (_, { username }) =>
      generalRequest(`${URL}/getuser/${username}`, 'GET'),

  },
  Mutation: {
    getLoginStatus: (_, { username, email }) =>
      generalRequest(`${URL}/login-verify`, 'POST', { username, email }),
    login:  (_, { username, password }) =>{ 
      return  generalRequest(`${URL}/login`, 'POST', { username, password }).then(async (response) =>{
        const ldap = new  Ldap(username, password);
        await ldap.connect(response);
        try {
          await ldap.authenticate();
          return response;
        } catch (error) {
          console.error('LDAP authentication error:', error);
          return null; //invalid credentials
        }
  });

    },
    changePassword: (_, { username, Password, newPassword }) =>
      generalRequest(`${URL}/change`, 'POST', { username, Password, newPassword }),
    logout: () => generalRequest(`${URL}/logout`, 'POST'),
    createUser: (_, { user, userExtra }) => {
      return generalRequest(`${URL}/`, 'POST', user).then(async (response) => {
        const cuenta = {
          idUser: response.user.idUsuario,
          userName: response.user.username,
          lastName: userExtra.lastName,
          firstName: userExtra.firstName,
          phoneNumber: userExtra.phoneNumber,
          address: userExtra.address,
          birth: userExtra.birth,
          timeCreated: response.user.createdAt,
          city: userExtra.city
        }
        const createdAccount = await cuentaResolvers.Mutation.createCuenta(_, { cuenta: cuenta });
        console.log("created account", createdAccount);

        const carrito = await carritoResolvers.Mutation.createCarrito(_, { carrito: { idUsuario: response.user.idUsuario } });

        return response.user;
      });
    },

    updateUser: (_, { id, user }) =>
      generalRequest(`${URL}/${id}`, 'PUT', user),
    deleteUser: (_, { id }) =>
      generalRequest(`${URL}/${id}`, 'DELETE')
  }
};

export default resolvers;



////EXAMPLE CREATE USER
/*
mutation {
        createUser(user: {
          username: "mikeperalta",
          idRol: 1,
          password: "jjjjjjjxxx",
          email: "mike1"
        }, userExtra: {
             lastName:"mylastname123",
             firstName:"myfirstname123"
             phoneNumber:"5555555",
             address:"555555",
             birth:"my birthday",
             city:"Bogota"
        }) {
          idUsuario
          username
          idRol
          password
          email
        }
      }



*/