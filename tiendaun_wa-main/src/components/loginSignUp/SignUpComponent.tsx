import { useState } from "react";
import { InputBox, MyButton } from '../utils';
import tiendaUnLogo from '../../assets/images/logos/LogoMorado.png';
import '../../css/main.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sp1 from '../../assets/images/spinner1.gif';
import { useMutation, gql } from "@apollo/client";

type SignUpProps = {
  title?: string
}

const CREATE_USER_MUTATION = gql`
  mutation createUser($userInput: userInput!, $userExtra: userExtra) {
    createUser(user: $userInput, userExtra: $userExtra) {
      idUsuario
      username
      idRol
      password
      email
    }
  }
`;

export const SignUp = ({ }: SignUpProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [loadnow, setLoading] = useState(false);
  const [passwordOk, setPasswordOk] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    context: {
      headers: {
        "Content-Type": "application/json",
      }
    }
  });

  const handleKeyPress = (e: any) => {
    setIsPressing(true);
    if (password === password2) {
      setPasswordOk(true);
    } else {
      setPasswordOk(false);
    }
  }

  const handleSubmit = async (e: any) => {
    if (password !== password2) {
      //passwords do not match
      e.preventDefault();
      setPasswordOk(false);
    } else {
      //do sign-up
      e.preventDefault();
      setLoading(true);
      try {
        const { data } = await createUser({
          variables: {
            userInput: {
              username: username,
              idRol: 2,
              password: password,
              email: username
            },
            userExtra: {
              lastName: lastName,
              firstName: firstName,
              phoneNumber: phoneNumber,
              address: address,
              birth: "Sin llenar",
              city: city
            }
          }
        });

        console.log(data);
        console.log('User created successfully!');

        //save user and password to do the login for the user
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("login", "true");
        window.location.href = "/login";

      } catch (error: any) {
        alert("ESTE NOMBRE DE USUARIO YA EXISTE!!");
        console.log(error.message);
        setLoading(false);
      }
    }
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={6}>
          <form method="POST" onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} className="text-center">
                <a href="/"><img src={tiendaUnLogo} alt="Logo de TiendaUn" style={{ padding: "1rem" }} className="img-fluid signUpCenterLogo" /></a>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <InputBox className='SignUpInput' required={true} onChange={(e) => setUsername(e.target.value)} backgroundColor="white" color="black" padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Nombre de usuario" placeholder="Usuario1" />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={5}>
                <InputBox className='SignUpInput2' required={true} onChange={(e) => setFirstName(e.target.value)} backgroundColor="white" color="black" width='14rem' padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Nombre" placeholder="Pepito" />
              </Col>
              <Col xs={12} sm={6} className="SignUpInput3">
                <InputBox className='SignUpInput2' required={true} onChange={(e) => setLastName(e.target.value)} backgroundColor="white" color="black" width='14rem' padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Apellido" placeholder="Perez" />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={5}>
                <InputBox className='SignUpInput2' required={true} onChange={(e) => setPhoneNumber(e.target.value)} backgroundColor="white" color="black" width='14rem' padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Número" placeholder="123456789" />
              </Col>
              <Col xs={12} sm={6} className="SignUpInput3">
                <InputBox className='SignUpInput2' required={true} onChange={(e) => setCity(e.target.value)} backgroundColor="white" color="black" width='14rem' padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Ciudad" placeholder="Bogotá" />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <InputBox className='SignUpInput'required={true} onChange={(e) => setAddress(e.target.value)} backgroundColor="white" color="black" width='30rem' padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Direccion de envios" placeholder="Carrera 45 N° 26-85" />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={5}>
                <InputBox className='SignUpInput2' required={true} onChange={(e) => setPassword(e.target.value)} backgroundColor="white" color="black" width='14rem' padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Contraseña" placeholder="Contraseña" type="password" />
              </Col>
              <Col xs={12} sm={6} md={6} className="SignUpInput3">
                <InputBox className='SignUpInput2' required={true} onKeyUp={handleKeyPress} onChange={(e) => setPassword2(e.target.value)} backgroundColor="white" color="black" width='14rem' padding="1rem" fontSize="1.5rem" colorText="#4C015D" title="Confirmar contraseña" placeholder="confirmar contraseña" type="password" />
                {passwordOk ? <span>✅</span> : isPressing ? <b>❌</b> : ""}
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="text-center">
                <div className="" style={{marginRight:'2.4rem',marginTop:'1rem'}}>
                  <MyButton hidden={false} disabled={loadnow} type="submit" backgroundColor="#4C015D" width="80%" fontSize="1.5rem" text="Crear cuenta" />
                  {loadnow ? <img src={sp1} className='smallSpinner' /> : ""}
                </div>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  )
}
