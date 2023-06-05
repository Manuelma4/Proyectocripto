import { useState } from "react";
import tiendaUnLogo from '../../assets/images/logos/LogoMorado.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useMutation, gql } from "@apollo/client";
type CuentaProp = {
    title?: string
   
}





export const Cuenta = ({ }: CuentaProp) => {

     return(
        <div className="center">
              
               <h1>Cuenta</h1>
               
               
             
                   
            
      </div>
     
)     

     }



/*import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import tiendaUnLogo from '../../assets/images/logos/LogoMorado.png';
import { InputBox, MyButton} from '../utils';

type AccountProps = {
  title?: string
};

const CHANGE_PASSWORD_MUTATION= gql`
  mutation changePassword($username: String!, $Password: String!, newPassword: String!) {
    changePassword(username: $String, Password: $String, newPassword: String!) {
      msg
    }
  }
`;

const GET_ALL_USERS= gql`
  query getAllUsers() {
    getAllUsers() {
      idUsuario
      username
      idRol
      password
      email
    }
  }
`;
     

const UPDATE_CUENTA_MUTATION= gql`
  mutation updateUser($user: userInput!) {
    updateUser(user: $userInput) {
      userMsg
    }
  }
`;

const handleClick = () => {
  console.log("Button clicked!");
};
const AccountInfo: React.FC<AccountProps> = ({ }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [loadnow, setLoading] = useState(false);

  const [login, { loading, error }] = useMutation(GET_ALL_USERS, {
    context: {
      headers: {
        "Content-Type": "application/json",
      }
    }
  });
const handleSubmit = async (e:any) => {
  alert("Hi");
 e.preventDefault();
// alert(username);
setLoading(true);
  try {
    const { data } = await login({
        variables: {
            username: {
                username: username
            },
            password:{
                password: password
            }
        }
    });

    console.log(data);
    console.log('Ingreso exitoso!');
    window.location.href = "/";

  } catch (error:any) {
    alert("Hay un error, contraseña y usuarios error");
    console.log(error.message);
    setLoading(false);
  }
};
  return (
    <form className="row">
      <div className="col-10 offset-1">
        <div className="">
          <a href="/"><img src={tiendaUnLogo} alt="Logo de TiendaUn" style={{padding:"1rem"}}className="img-fluid logoLogin" /></a>
        </div>
      </div>
      <div className="col-10">
        <div className="">
          <InputBox required={true} onChange={(e) => setUsername(e.target.value)} backgroundColor="white" color="black" padding="1rem"fontSize="1.5rem" colorText="#4C015D" title="Nombre de usuario" placeholder="Ejemplo@unal.edu.co" />
        </div>
      </div>
      <div className="col-10">
        <div className="">
          <InputBox  required={true} onChange={(e) => setPassword(e.target.value)} backgroundColor="white" color="black" padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Contraseña" placeholder="***********" type="password"/>
        </div>
      </div>
      <div className="col-10 ">
        <div className="">
          <MyButton type="submit" backgroundColor="#4C015D"  margin="1rem" width="30rem" fontSize="1.5rem" text="Iniciar sesion" />
        </div>
      </div>
      <div className="col-10 row">
        <h4 className='col-10 col-lg-5' style={{color:"#909190"}}>¿No tienes una cuenta?</h4>
        <a href="/signUp" className='col-2 col-lg-6 no-underline'><h4>Registrate</h4></a>
      </div>
    </form>
  );
}
const Account: React.FC<AccountProps> = ({ }) => {
  return (
    <div className="center center-horizontal">
      <AccountInfo />
    </div>
  );
};


export default AccountInfo;*/