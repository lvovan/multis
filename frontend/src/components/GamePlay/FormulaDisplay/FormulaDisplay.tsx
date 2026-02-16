import type { Formula } from '../../../types/game';
import styles from './FormulaDisplay.module.css';

interface FormulaDisplayProps {
  formula: Formula;
  playerAnswer?: number;
}

/**
 * Displays a multiplication formula with one value hidden as "?".
 * Shows "A × B = C" with the hidden value replaced by a placeholder.
 * When playerAnswer is provided, shows the player's answer instead of "?".
 */
export default function FormulaDisplay({ formula, playerAnswer }: FormulaDisplayProps) {
  const { factorA, factorB, product, hiddenPosition } = formula;

  const hiddenValue = playerAnswer !== undefined ? String(playerAnswer) : '?';

  const displayA = hiddenPosition === 'A' ? hiddenValue : String(factorA);
  const displayB = hiddenPosition === 'B' ? hiddenValue : String(factorB);
  const displayC = hiddenPosition === 'C' ? hiddenValue : String(product);

  const ariaLabel = playerAnswer !== undefined
    ? `Multiplication formula: ${displayA} times ${displayB} equals ${displayC}. Your answer was ${playerAnswer}.`
    : `Multiplication formula: ${displayA} times ${displayB} equals ${displayC}. Find the missing value.`;

  return (
    <div className={styles.formula} role="math" aria-label={ariaLabel}>
      <span className={hiddenPosition === 'A' ? styles.hidden : styles.value}>{displayA}</span>
      <span className={styles.operator}>×</span>
      <span className={hiddenPosition === 'B' ? styles.hidden : styles.value}>{displayB}</span>
      <span className={styles.operator}>=</span>
      <span className={hiddenPosition === 'C' ? styles.hidden : styles.value}>{displayC}</span>
    </div>
  );
}
