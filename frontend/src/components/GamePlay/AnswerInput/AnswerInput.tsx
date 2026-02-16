import { useState, useRef, useEffect, type FormEvent } from 'react';
import styles from './AnswerInput.module.css';

interface AnswerInputProps {
  onSubmit: (answer: number) => void;
  disabled: boolean;
}

/**
 * Numeric input field + submit button for answering a round.
 * Accepts digits only (FR-017), strips leading zeros, disables submit when empty.
 *
 * Re-focuses the input whenever it transitions from disabled → enabled so the
 * virtual keyboard stays visible on touch devices between rounds.
 */
export default function AnswerInput({ onSubmit, disabled }: AnswerInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Re-focus input when it becomes enabled (e.g. after feedback phase)
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === '' || disabled) return;

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      onSubmit(parsed);
      setValue('');
    }
  };

  const handleChange = (inputValue: string) => {
    // Accept only digits
    const digitsOnly = inputValue.replace(/[^0-9]/g, '');
    setValue(digitsOnly);
  };

  const isEmpty = value.trim() === '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        placeholder="?"
        aria-label="Your answer"
        autoFocus
        inputMode="numeric"
        pattern="[0-9]*"
        enterKeyHint="go"
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={disabled || isEmpty}
        aria-label="Submit answer"
      >
        Submit
      </button>
    </form>
  );
}
