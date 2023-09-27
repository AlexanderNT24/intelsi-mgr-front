import React, { useState } from "react";
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

  const handleLogin = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (email === "admin@admin.com" && password === "admin") {
      setLoggedIn(true);
      navigate("/home");
    } else {
      setIsError(true);
      setErrorText("Usuario o contraseña incorrectos");
    }
  };

  const handleInputChange = () => {
    setIsError(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
              <form>
                <h2 className="font-weight-bold mb-4">Acceder al Sistema</h2>
                <FormGroup>
                  <Label className="font-weight-bold mb-2">Email</Label>
                  <Input
                    id="email"
                    className={`mb-3 ${isError ? "is-invalid" : ""}`}
                    type="email"
                    placeholder="Alejandro@ejemplo.com"
                    onChange={handleInputChange}
                  />
                  {isError && <FormFeedback className="error-text">{errorText}</FormFeedback>}
                  <div className="password-input">
                    <Label className="font-weight-bold mb-2">Password</Label>
                    <Input
                      id="password"
                      className={`mb-3 ${isError ? "is-invalid" : ""}`}
                      type={showPassword ? "text" : "password"}
                      placeholder="De 8 caracteres"
                      onChange={handleInputChange}
                    />
                    <span className="password-toggle" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Icono de ojo */}
                    </span>
                  </div>
                  {isError && <FormFeedback className="error-text">{errorText}</FormFeedback>}
                </FormGroup>
                <Button className="mt-3 btn" onClick={handleLogin}>
                  Ingresar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
