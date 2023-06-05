import React from 'react';
import { useState } from "react";
import '../../css/main.css';
import tiendaUnLogo from '../../assets/images/logos/LogoMorado.png';
import {InputBox, MyButton} from '../utils';
import { useMutation, gql } from "@apollo/client";
import sp1 from '../../assets/images/spinner1.gif';

type LoginProps = {
  title?: string
};

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      password
      email
    }
  }
`;

const LOGIN_VALIDITY = gql`
  mutation getLoginStatus($username: String!, $email: String!) {
    getLoginStatus(username: $username, email: $email) {
      msg
    }
  }
`;

    const LoginComponent: React.FC<LoginProps> = ({ }) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    const [loadnow, setLoading] = useState(false);
    const [verifyingLogin, setVerifyingLogin] = useState(true);

    const [doLogin] = useMutation(LOGIN_MUTATION);
    const [getLoginStatus] = useMutation(LOGIN_VALIDITY);

   //verify user is logged in
  const checkUserLogin = async ()=>{
    try {
      const { data } = await getLoginStatus({
          variables: {
            
                  username: localStorage.getItem("username"),
                  email: localStorage.getItem("token")
              
          }
      });
      
      
      console.log(localStorage.getItem("username"), localStorage.getItem("token"), data.getLoginStatus.msg);

      //redirect to dashboard page if the user is still logged in
      if(data.getLoginStatus.msg === "true"){
       window.location.href = "/dash";
      }else{
         setVerifyingLogin(false);
      }

    } catch (error:any) {
      //alert("ERROR VERIFICANDO LOGIN");
      console.log("ERROR VERIFYING LOGIN");
      console.log(error.message);
      setLoading(false);
      setVerifyingLogin(false);
    }
   }


 const logout = async () =>{
    //logout
    if(localStorage.getItem("logout") === "true"){
       localStorage.setItem("username", "");
       localStorage.setItem("token", "");
       localStorage.setItem("logout", "false");
       localStorage.setItem("UsuarioRol", "");
       window.location.href = "/login";
    }
    //do login for the user after creating account
    if(localStorage.getItem("login") === "true"){
        performLogin(true);  
    }

    
 }

  const handleSubmit = async (e:any) => {
     e.preventDefault();
     performLogin(false);

  };

  const performLogin = async (autoLogin:boolean)=>{
    if(autoLogin){
      username = String(localStorage.getItem("username"));
      password = String(localStorage.getItem("password"));
      localStorage.setItem("password", "");//delete stored password
      localStorage.setItem("login", "false"); //do not attempt auto login again
    }
    // alert(username);
     setLoading(true);
       try {
         const { data } = await doLogin({
             variables: {
               
                     username: username,
                     password: password
                 
             }
         });
   
         console.log(data);
         console.log(data.login.email);
         //SAVE IN THE BROWSER LOCAL STORAGE FOR FURTHER USAGE
         localStorage.setItem("token", data.login.email);
         localStorage.setItem("username", data.login.username);
   
         //verify token was stored
         console.log("token stored:", localStorage.getItem("token"));
         console.log('Ingreso exitoso!');
         //redirect to main page
         window.location.href = "/";
   
       } catch (error:any) {
         alert("VERIFIQUE LA CONTRASEÑA Y EL USUARIO POR FAVOR");
         console.log(error.message);
         setLoading(false);
       }

  }
    return (
      <div>
         <img src={sp1} className='spinner1' hidden={!verifyingLogin}></img>
      <div className="center center-horizontal" onLoad={logout}>
      <form hidden={verifyingLogin} className="row " onSubmit={handleSubmit} onLoad={checkUserLogin}>
        <div className="col-10 offset-1">
          <div className="">
            <a href="/"><img src={tiendaUnLogo} alt="Logo de TiendaUn" style={{padding:"1rem"}}className="img-fluid logoLogin" /></a>
          </div>
        </div>
        <div className="col-10">
          <div className="LoginInput">
            <InputBox required={true} onChange={(e) => setUsername(e.target.value)} backgroundColor="white" color="black" padding="1rem"fontSize="1.5rem" colorText="#4C015D" title="Nombre de usuario" placeholder="Ejemplo@unal.edu.co" />
          </div>
        </div>
        <div className="col-10">
          <div className="LoginInput" >
            <InputBox  required={true} onChange={(e) => setPassword(e.target.value)} backgroundColor="white" color="black" padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Contraseña" placeholder="***********" type="password"/>
          </div>
        </div>
        <div className="col-10 ">
          <div className="">
            <MyButton type="submit" hidden={loadnow} disabled={loadnow} backgroundColor="#4C015D"  margin="1rem" width="30rem" fontSize="1.5rem" text="Iniciar sesion" />
            {loadnow ? <img src={sp1} className='smallSpinner'/> : ""}
          </div>
        </div>
        <div className="col-10 row">
          <h4 className='col-10 col-lg-5' style={{color:"#909190"}}>¿No tienes una cuenta?</h4>
          <a href="/signUp" className='col-2 col-lg-6 no-underline'><h4>Registrate</h4></a>
        </div>
      </form>
      </div>
      </div>
    );
}
const Login: React.FC<LoginProps> = ({ }) => {
    return (
      <div className="">
        <LoginComponent/>
      </div>
    );
  };

export default Login;
