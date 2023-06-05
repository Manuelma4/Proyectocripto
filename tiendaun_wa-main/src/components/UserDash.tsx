import React from "react";
import { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import '../css/main.css';
import user from '../assets/images/Perfil.png';
import {GET_USER_BY_USER} from '../graphql/auth/users';
import { BsPersonFill, BsCalendarFill, BsPhoneFill, BsHouseFill, BsPersonRolodex } from 'react-icons/bs';
import {CgNametag} from'react-icons/cg';
import {MdDateRange} from 'react-icons/md';
import {FaCity, FaUserCircle, FaCriticalRole} from 'react-icons/fa';
import {HiIdentification} from 'react-icons/hi';
import logOut from '../assets/images/logOut.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import tiendaUnLogo from '../assets/images/tiendauncuenta.png';

type UserDash = {
  title?: string;
};



const CUENTA_BY_ID = gql`
  query cuentaById($id: Int!) {
    cuentaById(id: $id) {
      city
      timeCreated
      birth
      id
      idUser
      firstName
      lastName
      phoneNumber
      address
    }
  }
`;
const userDataTypes = {
  idUsuario: 0,
  username: "",
  idRol: 0,
  email: "",
  password: ""
};
const cuentaDataTypes = {
  idUser:0,
  city: "",
  timeCreated: "",
  birth: "",
  id: 0,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: ""
};
export const Dash = ({}: UserDash) => {
  const [userData, setUserData] = useState(userDataTypes);
  const [cuentaData, setCuentaData] = useState(cuentaDataTypes);
  const [getUserByUser, { loading: userLoading, error: userError, data: userDataResult }] = useLazyQuery(
    GET_USER_BY_USER
  );
  const [getCuentaById, { loading: cuentaLoading, error: cuentaError, data: cuentaDataResult }] = useLazyQuery(
    CUENTA_BY_ID
  );
  let username = localStorage.getItem("username");

  const logout = ()=>{
    localStorage.setItem("logout", "true");
  }
  type LogOutButtonProps = {
    username?: string;
  }
  const LogOutButton = ()=>{
    if (username==''){
      return <div></div>
    }
    return <span><a title="Finalizar sesión" onClick={logout} className='navLogoutLink' href='/login'><img src={logOut} alt="" /></a></span>
  }

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      getUserByUser({ variables: { username } });
    }
  }, [getUserByUser]);

  useEffect(() => {
    if (userDataResult) {
      const userData = userDataResult.getUserByUser;
      setUserData(userData);

      if (userData && userData.idUsuario) {
        getCuentaById({ variables: { id: userData.idUsuario } });
      }
    }
  }, [userDataResult, getCuentaById]);

  useEffect(() => {
    if (cuentaDataResult) {
      const cuentaData = cuentaDataResult.cuentaById;
      setCuentaData(cuentaData);
    }
  }, [cuentaDataResult]);

  if (userLoading || cuentaLoading) {
    return <div>Loading...</div>;
  }

  if (cuentaError) {
    return <div>Error: {cuentaError.message}</div>;
  }
  if (userError) {
    return <div>Error: {userError.message}</div>;
  }
  function RolUsuario(){
    if (userData.idRol==1){
      return<p>
            <BsPersonRolodex/><strong>Rol: </strong> Administrador
            </p>
    }
    else{
      return<p>
            <BsPersonRolodex/><strong>Rol: </strong> Usuario
            </p>
    }
  }
  if (userData && cuentaData && userData.idUsuario === cuentaData.idUser) {
    return (
      <div className="center">
              <Col className="text-center">
                <a href="/"><img src={tiendaUnLogo} alt="Logo de TiendaUn" style={{ padding: "1rem" }}/></a>
              </Col>
        <div className="profile-container">
          <div className="photo-container">
              <a href="/login" title="Iniciar sesión">
                  <img src={user} alt="Home" className="photo" />
              </a>

              
              <div className="box">

                  <BsPersonFill />  {cuentaData.firstName}  {cuentaData.lastName}

              </div>
          </div>
          <div className="info-container">
          <div className="info-container">
            <div className="box">
              <p>
                <FaUserCircle/><strong>Username:</strong> {userData.username}
              </p>
            </div>
          </div>
          <div className="info-container">
            <div className="box">
              <RolUsuario/>
            </div>
          </div>
          <div className="info-container">
            <div className="box">
              <p>
                <HiIdentification/><strong>Id del usuario:</strong> {userData.idUsuario}
              </p>
            </div>
          </div>
          <div className="info-container">
            <div className="box">
              <p>
                <FaCity/><strong>Ciudad:</strong> {cuentaData.city}
              </p>
            </div>
          </div>
          </div>
          <div className="info-container">
          <div className="info-container">
            <div className="box">
              <p>
                <MdDateRange/><strong>Hora de creación de la cuenta:</strong> {cuentaData.timeCreated}
              </p>
            </div>
          </div>
          <div className="info-container">
            <div className="box">
              <p>
                <BsCalendarFill/> <strong>Cumpleaños:</strong> {cuentaData.birth} 
              </p>
            </div>
          </div>
          <div className="info-container">
            <div className="box">
                <p>
                  <BsPersonFill /><strong>Número de usuario:</strong> {cuentaData.idUser}
                </p>
            </div>
          </div>
          <div className="info-container">
            <div className="box">
                <p>
                    <CgNametag/><strong>Nombre:</strong> {cuentaData.firstName}
                </p>
            </div>
          </div>
            </div>
            <div className="info-container">
            <div className="info-container">
            <div className="box">
                <p>
                    <CgNametag/><strong>Apellido:</strong> {cuentaData.lastName}
                </p>
            </div>
            </div>
            <div className="info-container">
            <div className="box">
                <p>
                    <BsPhoneFill /><strong>Teléfono:</strong> {cuentaData.phoneNumber} 
                </p>
            </div>
            </div>
            <div className="info-container">
            <div className="box">
                <p>
                    <BsHouseFill /> <strong>Dirección:</strong> {cuentaData.address} 
                </p>
            </div>
            </div>
            <div className='box1 LogOutButton1'>
              <p><strong>Cierre sesion</strong><LogOutButton/></p>
            </div>   
        </div>
        </div>
      
      </div>
      
    );
  }

  return null;
};