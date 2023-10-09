import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("mobinhimu@gmail.com");
  const [password, setPassword] = useState("mobinhimu@gmail.com");
  const { login, isLogin } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(eve) {
    eve.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      { onSuccess: () => navigate("/dashboard", { replace: true }) }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogin}>
          {!isLogin ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
