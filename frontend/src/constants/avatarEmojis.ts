/** Emoji representations of avatars for display. */
const AVATAR_EMOJIS: Record<string, string> = {
  rocket: '🚀',
  star: '⭐',
  cat: '🐱',
  dog: '🐶',
  turtle: '🐢',
  robot: '🤖',
  dinosaur: '🦕',
  unicorn: '🦄',
  planet: '🪐',
  flower: '🌸',
  lightning: '⚡',
  crown: '👑',
};

/** Get the emoji for an avatar ID. Falls back to ⭐ if not found. */
export function getAvatarEmoji(avatarId: string): string {
  return AVATAR_EMOJIS[avatarId] ?? '⭐';
}
