import React from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logoImg} alt="Gobarber" />
      <form>
        <h1>Faça seu Cadastro</h1>
        <Input icon={FiUser} name="name" placeholder="Nome" />
        <Input icon={FiMail} name="email" placeholder="Email" />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Senha"
        />
        <Input
          icon={FiLock}
          name="confirmPassword"
          type="password"
          placeholder="Confirme a Senha"
        />
        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="signup">
        <FiArrowLeft />
        Já sou cadastrado
      </a>
    </Content>
  </Container>
);

export default SignUp;
