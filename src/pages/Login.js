import React, { useState } from "react";
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const data={username, password};
    axios.post('https://prat051.pythonanywhere.com/attendance/login/', data)
    .then(response => {
        console.log('login successful: ', response.data);
        //works
    })
    .catch(error => {
        console.error('there was a problem with login: ', error);
    });
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
