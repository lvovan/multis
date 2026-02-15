import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AvatarPicker from '../../src/components/AvatarPicker/AvatarPicker';
import { AVATARS } from '../../src/constants/avatars';

describe('AvatarPicker', () => {
  const defaultProps = {
    selectedId: AVATARS[0].id,
    onSelect: vi.fn(),
  };

  it('renders all 12 avatars', () => {
    render(<AvatarPicker {...defaultProps} />);
    const options = screen.getAllByRole('radio');
    expect(options).toHaveLength(12);
  });

  it('has role="radiogroup" with accessible label', () => {
    render(<AvatarPicker {...defaultProps} />);
    const group = screen.getByRole('radiogroup', { name: /choose your avatar/i });
    expect(group).toBeInTheDocument();
  });

  it('marks the selected avatar as checked', () => {
    render(<AvatarPicker {...defaultProps} selectedId="cat" />);
    const catOption = screen.getByRole('radio', { name: /cat/i });
    expect(catOption).toBeChecked();
  });

  it('calls onSelect when an avatar is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<AvatarPicker {...defaultProps} onSelect={onSelect} />);

    const dogOption = screen.getByRole('radio', { name: /dog/i });
    await user.click(dogOption);

    expect(onSelect).toHaveBeenCalledWith('dog');
  });

  it('supports arrow key navigation', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<AvatarPicker {...defaultProps} selectedId="rocket" onSelect={onSelect} />);

    const rocketOption = screen.getByRole('radio', { name: /rocket/i });
    rocketOption.focus();

    await user.keyboard('{ArrowRight}');
    expect(onSelect).toHaveBeenCalledWith('star');
  });

  it('wraps around from last to first on ArrowRight', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<AvatarPicker {...defaultProps} selectedId="crown" onSelect={onSelect} />);

    const crownOption = screen.getByRole('radio', { name: /crown/i });
    crownOption.focus();

    await user.keyboard('{ArrowRight}');
    expect(onSelect).toHaveBeenCalledWith('rocket');
  });

  it('each avatar has an aria-label with its name', () => {
    render(<AvatarPicker {...defaultProps} />);
    for (const avatar of AVATARS) {
      expect(screen.getByRole('radio', { name: avatar.label })).toBeInTheDocument();
    }
  });
});
