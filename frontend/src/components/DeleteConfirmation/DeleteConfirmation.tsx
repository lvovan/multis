import { useEffect, useRef } from 'react';
import styles from './DeleteConfirmation.module.css';

interface DeleteConfirmationProps {
  playerName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Accessible modal dialog confirming player deletion.
 * Focus-trapped, dismissible via Escape key.
 */
export default function DeleteConfirmation({
  playerName,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Focus the dialog on mount
    dialogRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Remove ${playerName}`}
        className={styles.dialog}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.title}>Remove {playerName}?</p>
        <p className={styles.message}>Their scores will be lost.</p>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.removeButton} onClick={onConfirm}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
