import { useState, useCallback } from 'react';
import type { Player } from '../types/player';
import {
  getPlayers,
  savePlayer as storageSavePlayer,
  deletePlayer as storageDeletePlayer,
  playerExists as storagePlayerExists,
  isStorageAvailable,
} from '../services/playerStorage';
import type { SavePlayerResult } from '../services/playerStorage';

/** Shape returned by the usePlayers hook. */
export interface UsePlayersReturn {
  /** All stored players, ordered by lastActive desc. */
  players: Player[];
  /** Whether localStorage is available. */
  storageAvailable: boolean;
  /** Add a new player or overwrite existing. Returns player + evicted names. */
  savePlayer: (data: Pick<Player, 'name' | 'avatarId' | 'colorId'>) => SavePlayerResult;
  /** Remove a player by name. */
  deletePlayer: (name: string) => void;
  /** Check if a name is already taken (case-insensitive). */
  playerExists: (name: string) => boolean;
}

/** Hook for managing the player list via localStorage. */
export function usePlayers(): UsePlayersReturn {
  const [players, setPlayers] = useState<Player[]>(() => getPlayers());
  const storageAvailable = isStorageAvailable();

  const refreshPlayers = useCallback(() => {
    setPlayers(getPlayers());
  }, []);

  const savePlayer = useCallback(
    (data: Pick<Player, 'name' | 'avatarId' | 'colorId'>): SavePlayerResult => {
      const result = storageSavePlayer(data);
      refreshPlayers();
      return result;
    },
    [refreshPlayers],
  );

  const deletePlayer = useCallback(
    (name: string): void => {
      storageDeletePlayer(name);
      refreshPlayers();
    },
    [refreshPlayers],
  );

  const playerExists = useCallback((name: string): boolean => {
    return storagePlayerExists(name);
  }, []);

  return {
    players,
    storageAvailable,
    savePlayer,
    deletePlayer,
    playerExists,
  };
}
