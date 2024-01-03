import { Button, TextField } from '@mui/material'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <form className="login-form" onSubmit={handleLogin}>
    <div>
      <TextField
        id="username"
        label="username"
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
    <div>
     <TextField
        id="password"
        label="password"
        value={password}
        onChange={handlePasswordChange}
      />
    </div>
    <Button variant="contained" color="primary" id="login-button" type="submit">
      login
    </Button>
  </form>
);

export default LoginForm;
