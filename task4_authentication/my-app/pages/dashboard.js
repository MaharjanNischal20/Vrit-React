import { useRouter } from 'next/router';
import styles from '../styles/dashboard.module.css';

export default function Dashboard({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  // Check if the `user` object exists before rendering the username
  return (
    <div className="container">
      <div className={styles.dashboardContainer}>
        <h1>Welcome, {user?.username || 'Guest'}</h1> {/* Safe access using optional chaining */}
        <p>This is a protected dashboard page.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
