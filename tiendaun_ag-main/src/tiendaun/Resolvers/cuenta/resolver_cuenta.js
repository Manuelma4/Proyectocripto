
import { generalRequest } from '../../../utilities';
import { cuenta_url, port_cuenta, entryPoint_cuenta } from '../../server';
import {RabbitSender} from '../../../rabbitSender';


const URL = `http://${cuenta_url}:${port_cuenta}/${entryPoint_cuenta}`;
const queue = "cuenta_ms";

const cuentaResolvers = {
	Query: {
		allCuentas: (_) =>
			generalRequest(URL,'GET'),
		cuentaById: (_, { id }) => 
	   	    generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createCuenta: (_, { cuenta }) =>{
		   return generalRequest(`${URL}`, 'POST', cuenta).then((response)=>{
			  console.log("id of created account:" + response.id);
			  //if the account was created successfully data to RabbitMQ
			  if(response.id !== 0){
				console.log("Sending message to RabbitMQ. Queue name:" + queue);
                const rabbitSender = new RabbitSender(queue, formatLoggingInfo(response));
			    rabbitSender.send();
				rabbitSender.close();
			  }else{
				console.log("The account was not created because it already exists.");
			  }
			  return response;
		   }).catch((e) => {
			console.error("ERROR:" + e.message);
		  });
			 
		},
		updateCuenta: (_, { cuenta }) =>
			generalRequest(`${URL}`, 'PUT', cuenta),
		deleteCuenta: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

// for use in logging(spring boot app)
function formatLoggingInfo(response){
   return "Account created with acid=" + response.id + " userid=" + response.idUser + " creation time=" + response.timeCreated + "-" + response.city;
}

export default cuentaResolvers;


//-----------------Query cuenta by ID----------------------
/*query{
	cuentaById(id: 1) {
		  id
		  idUser
		  lastName
		  firstName
		  phoneNumber
		  address
		  birth
		  timeCreated
		  city
	  }  
	}*/
