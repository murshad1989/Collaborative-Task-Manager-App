import { authApi } from './Api';

const login = (email, password) => {
  return authApi.login({ email, password });
};

const register = (name, email, password) => {
  return authApi.register({ name, email, password });
};

const logout = () => {
  return authApi.logout();
};

export { login, register, logout };
