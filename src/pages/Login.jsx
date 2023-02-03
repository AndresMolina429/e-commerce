import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate()

  // localStorage.setItem()

  const submit = (data) => {
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        console.log('localStorage', localStorage);

        navigate('/')
      }
      )
      .catch(error => {
        console.log(error.response.status)
      }
      )
  };

  return (
    <div className="login row">
      <Form onSubmit={handleSubmit(submit)} className="col-md-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {/* <Form.Text className="text-muted"> */}
            {/* We'll never share your email with anyone else. */}
          {/* </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
      <div className="col-md-4 pt-5"><h4>Credentials</h4>
      <div>
         <h5><b>User: </b> andresm@gmail.com</h5>
      </div>
      <div>
         <h5><b>Password:</b> andres1234</h5>
      </div>
      </div>
    </div>
  );
};

export default Login;
