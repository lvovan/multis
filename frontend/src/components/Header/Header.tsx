import { useNavigate } from 'react-router-dom';
import { useSession } from '../../hooks/useSession.tsx';
import { getAvatarEmoji } from '../../constants/avatarEmojis';
import { COLORS } from '../../constants/colors';
import styles from './Header.module.css';

/**
 * Session header component.
 * Shows current player's avatar, greeting, color accent, and "Switch player" button.
 * Renders nothing when no session is active.
 */
export default function Header() {
  const navigate = useNavigate();
  const { session, isActive, endSession } = useSession();

  if (!isActive || !session) {
    return null;
  }

  const color = COLORS.find((c) => c.id === session.colorId);

  const handleSwitchPlayer = () => {
    endSession();
    navigate('/');
  };

  return (
    <header className={styles.header} style={{ borderBottomColor: color?.hex }}>
      <div className={styles.playerInfo}>
        <span className={styles.avatar} aria-hidden="true">
          {getAvatarEmoji(session.avatarId)}
        </span>
        <span className={styles.greeting} style={{ color: color?.hex }}>
          Hi, {session.playerName}!
        </span>
      </div>
      <button className={styles.switchButton} onClick={handleSwitchPlayer}>
        Switch player
      </button>
    </header>
  );
}
