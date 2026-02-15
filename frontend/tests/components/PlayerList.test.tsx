import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerList from '../../src/components/WelcomeScreen/PlayerList';
import type { Player } from '../../src/types/player';

const mockPlayers: Player[] = [
  { name: 'Alice', avatarId: 'cat', colorId: 'blue', lastActive: 200, createdAt: 100 },
  { name: 'Bob', avatarId: 'dog', colorId: 'red', lastActive: 100, createdAt: 50 },
];

describe('PlayerList', () => {
  const defaultProps = {
    players: mockPlayers,
    onSelectPlayer: vi.fn(),
    onDeletePlayer: vi.fn(),
    onNewPlayer: vi.fn(),
  };

  it('renders a card for each player', () => {
    render(<PlayerList {...defaultProps} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows a "New player" button', () => {
    render(<PlayerList {...defaultProps} />);
    expect(screen.getByRole('button', { name: /new player/i })).toBeInTheDocument();
  });

  it('calls onSelectPlayer when a player card is clicked', async () => {
    const onSelectPlayer = vi.fn();
    const user = userEvent.setup();
    render(<PlayerList {...defaultProps} onSelectPlayer={onSelectPlayer} />);

    await user.click(screen.getByRole('button', { name: /play as alice/i }));
    expect(onSelectPlayer).toHaveBeenCalledWith(mockPlayers[0]);
  });

  it('calls onNewPlayer when "New player" is clicked', async () => {
    const onNewPlayer = vi.fn();
    const user = userEvent.setup();
    render(<PlayerList {...defaultProps} onNewPlayer={onNewPlayer} />);

    await user.click(screen.getByRole('button', { name: /new player/i }));
    expect(onNewPlayer).toHaveBeenCalled();
  });

  it('shows delete confirmation when delete icon is clicked', async () => {
    const user = userEvent.setup();
    render(<PlayerList {...defaultProps} />);

    const deleteBtn = screen.getByRole('button', { name: /remove alice/i });
    await user.click(deleteBtn);

    // Confirmation dialog should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/remove alice/i)).toBeInTheDocument();
  });

  it('calls onDeletePlayer when confirmed, and hides dialog', async () => {
    const onDeletePlayer = vi.fn();
    const user = userEvent.setup();
    render(<PlayerList {...defaultProps} onDeletePlayer={onDeletePlayer} />);

    // Trigger delete
    await user.click(screen.getByRole('button', { name: /remove alice/i }));
    // Confirm
    await user.click(screen.getByRole('button', { name: /^remove$/i }));

    expect(onDeletePlayer).toHaveBeenCalledWith('Alice');
  });
});
