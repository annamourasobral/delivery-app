import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import ErrorRegister from '../components/ErrorRegister';
import setToken from '../utils/token';
import { createUser } from '../services/user';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const history = useHistory();

  const {
    errorMsg,
    setErrorMsg,
  } = useContext(Context);

  const handleClickRegister = async () => {
    try {
      console.log('entrei no register');
      const create = await createUser({ name, email, password });
      if (!create) return setErrorMsg(true);
      setToken(create.data);
      history.push({ pathname: '/customer/products' });

      return create;
    } catch (error) {
      console.log(error);
      setErrorMsg(true);
    }
  };

  useEffect(() => {
    const isValid = () => {
      const validEmail = email.match(/^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig);
      const minLength = 5;
      const maxLength = 11;
      const validName = name.length > maxLength;
      const validPassword = password.length > minLength;

      if (validName && validEmail && validPassword) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    };

    isValid();
  }, [name, email, password, setIsDisable]);

  return (
    <form action="">
      <input
        data-testid="common_register__input-name"
        type="text"
        name="name"
        placeholder="Entre com um nome"
        onChange={ ({ target }) => setName(target.value) }
      />
      <input
        data-testid="common_register__input-email"
        type="email"
        name="email"
        placeholder="Entre com um e-mail"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        data-testid="common_register__input-password"
        type="password"
        name="password"
        placeholder="Entre com uma senha"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        data-testid="common_register__button-register"
        type="button"
        disabled={ isDisable }
        onClick={ () => handleClickRegister() }
      >
        Cadastrar
      </button>
      { errorMsg ? <ErrorRegister /> : '' }
    </form>
  );
}

export default Register;
