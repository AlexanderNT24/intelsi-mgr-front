import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginPage.css";

function LoginPage() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    fetch("http://localhost:3001/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((users) => {
        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          setUser(foundUser.name);
          setRole(foundUser.rol);

          localStorage.setItem("user", foundUser.name);
          localStorage.setItem("role", foundUser.rol);
          if (foundUser.rol!="solicitante"){
            
          setLoggedIn(true);
          navigate("/home");
          }else{
            setLoggedIn(true);
          navigate("/request");
          }
          
        } else {
          setIsError(true);
          setErrorText("Usuario o contraseña incorrectos");
        }
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
        setIsError(true);
        setErrorText("Error al obtener usuarios");
      });
  };

  const handleLogout = () => {
    setUser("");
    setRole("");

    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setLoggedIn(false);
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="background">
      <div className="login-box">
        <div className="container">
          <div className="row app-des">
            <div className="col left-background">
              <h2>IntelsiMGR</h2>
              <p>Mine Manager</p>
            </div>
            <div className="col login-form">
              {isLoggedIn ? (
                <div>
                  <h2>Bienvenido, {user}</h2>
                  <p>Rol: {role}</p>
                  <Button className="mt-3 btn" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                  <Button className="mt-3 btn" onClick={() => navigate("/home")}>
                    Ir a la página de inicio
                  </Button>
                </div>
              ) : (
                <form>
                  <h2 className="font-weight-bold mb-4">Acceder al Sistema</h2>
                  <FormGroup>
                    <Label className="font-weight-bold mb-2">Email</Label>
                    <Input
                      id="email"
                      className={`mb-3 ${isError ? "is-invalid" : ""}`}
                      type="email"
                      placeholder="Alejandro@ejemplo.com"
                    />
                    {isError && (
                      <FormFeedback className="error-text">{errorText}</FormFeedback>
                    )}
                    <div className="password-input">
                      <Label className="font-weight-bold mb-2">Password</Label>
                      <Input
                        id="password"
                        className={`mb-3 ${isError ? "is-invalid" : ""}`}
                        type={showPassword ? "text" : "password"}
                        placeholder="De 8 caracteres"
                      />
                      <span
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />} 
                        {/* Icono de ojo */}
                      </span>
                    </div>
                    {isError && (
                      <FormFeedback className="error-text">{errorText}</FormFeedback>
                    )}
                  </FormGroup>
                  <Button className="mt-3 btn" onClick={handleLogin}>
                    Ingresar
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
