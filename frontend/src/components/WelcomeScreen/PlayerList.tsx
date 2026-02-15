import { useState } from 'react';
import type { Player } from '../../types/player';
import PlayerCard from '../PlayerCard/PlayerCard';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import styles from './PlayerList.module.css';

interface PlayerListProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
  onDeletePlayer: (name: string) => void;
  onNewPlayer: () => void;
}

/**
 * Displays the list of existing players with a "New player" button.
 * Shows a delete confirmation dialog when the delete icon is clicked.
 */
export default function PlayerList({
  players,
  onSelectPlayer,
  onDeletePlayer,
  onNewPlayer,
}: PlayerListProps) {
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);

  const handleDeleteConfirm = () => {
    if (playerToDelete) {
      onDeletePlayer(playerToDelete.name);
      setPlayerToDelete(null);
    }
  };

  return (
    <>
      <div className={styles.playerList}>
        {players.map((player) => (
          <PlayerCard
            key={player.name}
            player={player}
            onSelect={onSelectPlayer}
            onDelete={setPlayerToDelete}
          />
        ))}
        <button className={styles.newPlayerButton} onClick={onNewPlayer}>
          ➕ New player
        </button>
      </div>

      {playerToDelete && (
        <DeleteConfirmation
          playerName={playerToDelete.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPlayerToDelete(null)}
        />
      )}
    </>
  );
}
