import { Navigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession.tsx';
import Header from '../components/Header/Header';

/** Stub main experience page. Redirects to welcome if no session is active. */
export default function MainPage() {
  const { session, isActive } = useSession();

  if (!isActive || !session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Header />
      <main style={{ padding: '24px 16px', textAlign: 'center' }}>
        <h1>Main Experience</h1>
        <p>Welcome, {session.playerName}! The game will be here soon.</p>
      </main>
    </div>
  );
}
