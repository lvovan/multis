import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerCard from '../../src/components/PlayerCard/PlayerCard';
import type { Player } from '../../src/types/player';

const mockPlayer: Player = {
  name: 'Mia',
  avatarId: 'cat',
  colorId: 'blue',
  lastActive: Date.now(),
  createdAt: Date.now(),
};

describe('PlayerCard', () => {
  it('displays the player name', () => {
    render(<PlayerCard player={mockPlayer} onSelect={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Mia')).toBeInTheDocument();
  });

  it('displays the player avatar emoji', () => {
    render(<PlayerCard player={mockPlayer} onSelect={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('🐱')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<PlayerCard player={mockPlayer} onSelect={onSelect} onDelete={vi.fn()} />);

    const button = screen.getByRole('button', { name: /play as mia/i });
    await user.click(button);

    expect(onSelect).toHaveBeenCalledWith(mockPlayer);
  });

  it('has accessible button role with aria-label', () => {
    render(<PlayerCard player={mockPlayer} onSelect={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByRole('button', { name: /play as mia/i })).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<PlayerCard player={mockPlayer} onSelect={vi.fn()} onDelete={onDelete} />);

    const deleteBtn = screen.getByRole('button', { name: /remove mia/i });
    await user.click(deleteBtn);

    expect(onDelete).toHaveBeenCalledWith(mockPlayer);
  });
});
