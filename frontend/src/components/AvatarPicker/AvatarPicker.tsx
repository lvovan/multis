import { useRef, useCallback, type KeyboardEvent } from 'react';
import { AVATARS } from '../../constants/avatars';
import { getAvatarEmoji } from '../../constants/avatarEmojis';
import styles from './AvatarPicker.module.css';

interface AvatarPickerProps {
  /** Currently selected avatar ID. */
  selectedId: string;
  /** Called when the user selects an avatar. */
  onSelect: (avatarId: string) => void;
}

/**
 * Accessible avatar picker with role="radiogroup" and roving tabindex.
 * Renders a 3×4 (mobile) / 4×3 (desktop) grid of avatars.
 */
export default function AvatarPicker({ selectedId, onSelect }: AvatarPickerProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const currentIndex = AVATARS.findIndex((a) => a.id === selectedId);
      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % AVATARS.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (currentIndex - 1 + AVATARS.length) % AVATARS.length;
          break;
        default:
          return;
      }

      onSelect(AVATARS[nextIndex].id);

      // Focus the newly selected option
      const options = groupRef.current?.querySelectorAll<HTMLElement>('[role="radio"]');
      options?.[nextIndex]?.focus();
    },
    [selectedId, onSelect],
  );

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Choose your avatar"
      className={styles.avatarGrid}
      onKeyDown={handleKeyDown}
    >
      {AVATARS.map((avatar) => {
        const isSelected = avatar.id === selectedId;
        return (
          <div
            key={avatar.id}
            role="radio"
            aria-checked={isSelected}
            aria-label={avatar.label}
            tabIndex={isSelected ? 0 : -1}
            className={styles.avatarOption}
            onClick={() => onSelect(avatar.id)}
          >
            <span className={styles.avatarEmoji} aria-hidden="true">
              {getAvatarEmoji(avatar.id)}
            </span>
            <span className={styles.avatarLabel}>{avatar.label}</span>
          </div>
        );
      })}
    </div>
  );
}
