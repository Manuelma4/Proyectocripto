import { generalRequest, getRequest } from '../../../utilities';

const axios = require('axios');
const convert = require('xml-js');



const resolvers = {
  Query: {
    allEmails: async (_) => {
      try {
        // Construye el cuerpo de la solicitud SOAP
        const requestBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="urn:WashOutUser">
        <soapenv:Header/>
        <soapenv:Body>
          <tns:emails/>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

        // Realiza la solicitud POST al servicio web SOAP
        const response = await axios.post('http://34.69.44.55:5100/users/action', requestBody, {
          headers: {
            'Content-Type': 'text/xml',
          },
        });

        // Convierte la respuesta XML a formato JSON
        const xmlResponse = response.data;
        const jsonResponse = convert.xml2json(xmlResponse, { compact: true, spaces: 2 });
        const result = JSON.parse(jsonResponse);

        // Accede al objeto 'tns:emailsResponse'
        const emailsResponse = result['soap:Envelope']['soap:Body']['tns:emailsResponse'];
        // Declara una lista para almacenar los emails
        const emailList = [];

        // Verifica si existen emails en la respuesta
        if (emailsResponse) {
          // Accede al objeto que contiene los emails
          const emailObject = emailsResponse[Object.keys(emailsResponse)[0]];

          

          // Verifica si hay múltiples emails o un solo email
          if (Array.isArray(emailObject)) {
            // Si hay múltiples emails, recorre el array y agrega cada email a la lista
            emailObject.forEach(email => {
              emailList.push({ email: email._text });
            });
          } else {
            // Si hay un solo email, agrégalo a la lista
            emailList.push({ email: emailObject._text });
          }
        } 
        return emailList;
      } catch (error) {
        console.error('Error al obtener los emails:', error);
      }
    },
  },
};

export default resolvers;

