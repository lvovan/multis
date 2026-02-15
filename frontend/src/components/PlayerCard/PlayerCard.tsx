import type { Player } from '../../types/player';
import { getAvatarEmoji } from '../../constants/avatarEmojis';
import { COLORS } from '../../constants/colors';
import styles from './PlayerCard.module.css';

interface PlayerCardProps {
  player: Player;
  onSelect: (player: Player) => void;
  onDelete: (player: Player) => void;
}

/**
 * Displays a player card with avatar, name, color accent, and delete button.
 * The card itself is a button for selecting the player.
 */
export default function PlayerCard({ player, onSelect, onDelete }: PlayerCardProps) {
  const color = COLORS.find((c) => c.id === player.colorId);

  return (
    <div className={styles.card} style={{ borderLeftColor: color?.hex, borderLeftWidth: 4 }}>
      <button
        className={styles.card}
        style={{ border: 'none', background: 'transparent', padding: 0, flex: 1, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        aria-label={`Play as ${player.name}`}
        onClick={() => onSelect(player)}
      >
        <span className={styles.avatar} aria-hidden="true">
          {getAvatarEmoji(player.avatarId)}
        </span>
        <div className={styles.info}>
          <span className={styles.name}>{player.name}</span>
        </div>
      </button>
      <button
        className={styles.deleteButton}
        aria-label={`Remove ${player.name}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(player);
        }}
      >
        ✕
      </button>
    </div>
  );
}
