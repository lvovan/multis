import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePlayers } from '../../src/hooks/usePlayers';
import * as playerStorage from '../../src/services/playerStorage';

describe('usePlayers', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('reads player list from localStorage on mount', () => {
    vi.spyOn(Date, 'now').mockReturnValue(100);
    playerStorage.savePlayer({ name: 'Alice', avatarId: 'cat', colorId: 'blue' });
    vi.spyOn(Date, 'now').mockReturnValue(200);
    playerStorage.savePlayer({ name: 'Bob', avatarId: 'dog', colorId: 'red' });

    const { result } = renderHook(() => usePlayers());

    expect(result.current.players).toHaveLength(2);
    // Most recent first
    expect(result.current.players[0].name).toBe('Bob');
    vi.restoreAllMocks();
  });

  it('returns storageAvailable as true when localStorage works', () => {
    const { result } = renderHook(() => usePlayers());
    expect(result.current.storageAvailable).toBe(true);
  });

  it('savePlayer adds a player and refreshes the list', () => {
    const { result } = renderHook(() => usePlayers());

    act(() => {
      result.current.savePlayer({ name: 'Mia', avatarId: 'cat', colorId: 'blue' });
    });

    expect(result.current.players).toHaveLength(1);
    expect(result.current.players[0].name).toBe('Mia');
  });

  it('deletePlayer removes a player and refreshes the list', () => {
    playerStorage.savePlayer({ name: 'Mia', avatarId: 'cat', colorId: 'blue' });

    const { result } = renderHook(() => usePlayers());
    expect(result.current.players).toHaveLength(1);

    act(() => {
      result.current.deletePlayer('Mia');
    });

    expect(result.current.players).toHaveLength(0);
  });

  it('playerExists checks for existing player (case-insensitive)', () => {
    playerStorage.savePlayer({ name: 'Mia', avatarId: 'cat', colorId: 'blue' });

    const { result } = renderHook(() => usePlayers());

    expect(result.current.playerExists('mia')).toBe(true);
    expect(result.current.playerExists('MIA')).toBe(true);
    expect(result.current.playerExists('Ghost')).toBe(false);
  });
});
