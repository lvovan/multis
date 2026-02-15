import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './hooks/useSession.tsx';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';

/** Root application component with routing and session context. */
export default function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/play" element={<MainPage />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
}
