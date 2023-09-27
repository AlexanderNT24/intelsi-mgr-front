import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { GoogleLoginButton } from "react-social-login-buttons";
import "./LoginPage.css"; // Puedes crear un archivo CSS para estilizar LoginPage si es necesario

function LoginPage() {
  return (
    <div className="background">
      <div className="login-box">
        <div className="container">
          <div className="row app-des">
            <div className="col left-background ">
              <h2>IntelsiMGR</h2>
              <p>Mine Manager</p>
            </div>
            <div className="col login-form">
              <form>
                <h2 className="font-weight-bold mb-4">Acceder al Sistema</h2>
                <FormGroup>
                  <Label className="font-weight-bold mb-2">Email</Label>
                  <Input
                    className="mb-3"
                    type="email"
                    placeholder="Alejandro@ejemplo.com"
                  />
                  <Label className="font-weight-bold mb-2">Password</Label>
                  <Input
                    className="mb-3"
                    type="password"
                    placeholder="De 8 caracteres"
                  />
                </FormGroup>
                <Button className="mt-3 btn">Ingresar</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
