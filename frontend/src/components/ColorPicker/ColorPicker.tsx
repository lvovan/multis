import { useRef, useCallback, type KeyboardEvent } from 'react';
import { COLORS } from '../../constants/colors';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  /** Currently selected color ID. */
  selectedId: string;
  /** Called when the user selects a color. */
  onSelect: (colorId: string) => void;
}

/**
 * Accessible color picker with role="radiogroup" and roving tabindex.
 * Renders a 4×2 grid of color swatches.
 */
export default function ColorPicker({ selectedId, onSelect }: ColorPickerProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const currentIndex = COLORS.findIndex((c) => c.id === selectedId);
      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % COLORS.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (currentIndex - 1 + COLORS.length) % COLORS.length;
          break;
        default:
          return;
      }

      onSelect(COLORS[nextIndex].id);

      const options = groupRef.current?.querySelectorAll<HTMLElement>('[role="radio"]');
      options?.[nextIndex]?.focus();
    },
    [selectedId, onSelect],
  );

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Choose your color"
      className={styles.colorGrid}
      onKeyDown={handleKeyDown}
    >
      {COLORS.map((color) => {
        const isSelected = color.id === selectedId;
        return (
          <div
            key={color.id}
            role="radio"
            aria-checked={isSelected}
            aria-label={color.label}
            tabIndex={isSelected ? 0 : -1}
            className={styles.colorOption}
            style={{ backgroundColor: color.hex }}
            onClick={() => onSelect(color.id)}
          >
            {isSelected && (
              <span className={styles.checkmark} style={{ color: color.textColor }} aria-hidden="true">
                ✓
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
