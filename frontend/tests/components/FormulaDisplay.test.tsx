import { describe, it, expect } from 'vitest';
import { render, screen } from '../test-utils';
import FormulaDisplay from '../../src/components/GamePlay/FormulaDisplay/FormulaDisplay';
import type { Formula } from '../../src/types/game';

describe('FormulaDisplay', () => {
  const baseFormula: Formula = {
    factorA: 3,
    factorB: 7,
    product: 21,
    hiddenPosition: 'C',
  };

  it('renders formula with product hidden (hiddenPosition C)', () => {
    render(<FormulaDisplay formula={baseFormula} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('?')).toBeInTheDocument();
    // Product (21) should not be visible
    expect(screen.queryByText('21')).not.toBeInTheDocument();
  });

  it('renders formula with factorA hidden (hiddenPosition A)', () => {
    const formula: Formula = { ...baseFormula, hiddenPosition: 'A' };
    render(<FormulaDisplay formula={formula} />);

    expect(screen.getByText('?')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('21')).toBeInTheDocument();
    // factorA (3) should not be visible
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });

  it('renders formula with factorB hidden (hiddenPosition B)', () => {
    const formula: Formula = { ...baseFormula, hiddenPosition: 'B' };
    render(<FormulaDisplay formula={formula} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('?')).toBeInTheDocument();
    expect(screen.getByText('21')).toBeInTheDocument();
    // factorB (7) should not be visible
    expect(screen.queryByText('7')).not.toBeInTheDocument();
  });

  it('renders multiplication sign and equals sign', () => {
    render(<FormulaDisplay formula={baseFormula} />);

    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  it('has accessible labeling', () => {
    render(<FormulaDisplay formula={baseFormula} />);

    // Should have an aria-label describing the formula
    const container = screen.getByRole('math') || screen.getByLabelText(/multiplication/i);
    expect(container).toBeInTheDocument();
  });

  describe('playerAnswer prop', () => {
    it('shows player answer instead of "?" when playerAnswer is provided (hiddenPosition C)', () => {
      render(<FormulaDisplay formula={baseFormula} playerAnswer={38} />);

      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();
      expect(screen.getByText('38')).toBeInTheDocument();
      // '?' should not be rendered
      expect(screen.queryByText('?')).not.toBeInTheDocument();
    });

    it('shows player answer instead of "?" when playerAnswer is provided (hiddenPosition A)', () => {
      const formula: Formula = { ...baseFormula, hiddenPosition: 'A' };
      render(<FormulaDisplay formula={formula} playerAnswer={5} />);

      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();
      expect(screen.getByText('21')).toBeInTheDocument();
      expect(screen.queryByText('?')).not.toBeInTheDocument();
    });

    it('shows player answer instead of "?" when playerAnswer is provided (hiddenPosition B)', () => {
      const formula: Formula = { ...baseFormula, hiddenPosition: 'B' };
      render(<FormulaDisplay formula={formula} playerAnswer={9} />);

      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.getByText('21')).toBeInTheDocument();
      expect(screen.queryByText('?')).not.toBeInTheDocument();
    });

    it('still shows "?" when playerAnswer is undefined', () => {
      render(<FormulaDisplay formula={baseFormula} />);

      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('aria-label includes player answer value when playerAnswer is provided', () => {
      render(<FormulaDisplay formula={baseFormula} playerAnswer={38} />);

      const math = screen.getByRole('math');
      expect(math).toHaveAttribute(
        'aria-label',
        expect.stringContaining('38'),
      );
    });
  });

  describe('typedDigits prop', () => {
    it('shows "?" when typedDigits is empty string', () => {
      render(<FormulaDisplay formula={baseFormula} typedDigits="" />);

      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('shows "?" when typedDigits is undefined', () => {
      render(<FormulaDisplay formula={baseFormula} />);

      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('renders typed digits in the hidden slot when non-empty', () => {
      render(<FormulaDisplay formula={baseFormula} typedDigits="42" />);

      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.queryByText('?')).not.toBeInTheDocument();
    });

    it('renders single typed digit', () => {
      render(<FormulaDisplay formula={baseFormula} typedDigits="8" />);

      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.queryByText('?')).not.toBeInTheDocument();
    });

    it('playerAnswer takes precedence over typedDigits during feedback', () => {
      render(
        <FormulaDisplay formula={baseFormula} playerAnswer={38} typedDigits="4" />,
      );

      expect(screen.getByText('38')).toBeInTheDocument();
      expect(screen.queryByText('4')).not.toBeInTheDocument();
      expect(screen.queryByText('?')).not.toBeInTheDocument();
    });

    it('works with hiddenPosition A', () => {
      const formula: Formula = { ...baseFormula, hiddenPosition: 'A' };
      render(<FormulaDisplay formula={formula} typedDigits="5" />);

      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.queryByText('?')).not.toBeInTheDocument();
    });

    it('works with hiddenPosition B', () => {
      const formula: Formula = { ...baseFormula, hiddenPosition: 'B' };
      render(<FormulaDisplay formula={formula} typedDigits="9" />);

      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.queryByText('?')).not.toBeInTheDocument();
    });
  });

  describe('isInputPhase prop', () => {
    it('applies pulsing class to hidden span when isInputPhase is true', () => {
      render(
        <FormulaDisplay formula={baseFormula} isInputPhase={true} />,
      );

      const hiddenSpan = screen.getByText('?');
      expect(hiddenSpan.className).toMatch(/pulsing/);
    });

    it('does not apply pulsing class when isInputPhase is false', () => {
      render(
        <FormulaDisplay formula={baseFormula} isInputPhase={false} />,
      );

      const hiddenSpan = screen.getByText('?');
      expect(hiddenSpan.className).not.toMatch(/pulsing/);
    });

    it('does not apply pulsing class when isInputPhase is undefined', () => {
      render(<FormulaDisplay formula={baseFormula} />);

      const hiddenSpan = screen.getByText('?');
      expect(hiddenSpan.className).not.toMatch(/pulsing/);
    });

    it('applies pulsing class when typedDigits are being entered', () => {
      render(
        <FormulaDisplay formula={baseFormula} typedDigits="4" isInputPhase={true} />,
      );

      const digitSpan = screen.getByText('4');
      expect(digitSpan.className).toMatch(/pulsing/);
    });

    it('removes pulsing class during feedback phase with playerAnswer', () => {
      render(
        <FormulaDisplay
          formula={baseFormula}
          playerAnswer={21}
          isInputPhase={false}
        />,
      );

      const answerSpan = screen.getByText('21');
      expect(answerSpan.className).not.toMatch(/pulsing/);
    });
  });
});
