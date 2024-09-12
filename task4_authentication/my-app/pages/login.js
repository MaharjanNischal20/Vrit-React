import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const { message } = await res.json();
      setError(message);
    }
  };

  return (
    <div className="container">
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Login</h1> {/* Scoped title class */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="text"
            className={styles.inputField} 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className={styles.inputField} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} type="submit">Login</button> {/* Scoped button class */}
          {error && <p className={styles.error}>{error}</p>} {/* Scoped error class */}
        </form>
      </div>
    </div>
  );
}
