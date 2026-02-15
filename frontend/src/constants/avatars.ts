/** Definition for a predefined avatar option. */
export interface AvatarDefinition {
  /** Unique identifier (e.g., "cat", "rocket"). */
  id: string;
  /** Human-readable label for display and aria-label. */
  label: string;
  /** Short description for accessibility. */
  description: string;
}

/** The 12 predefined avatars available for player profiles. */
export const AVATARS: readonly AvatarDefinition[] = [
  { id: 'rocket', label: 'Rocket', description: 'A flying rocket ship' },
  { id: 'star', label: 'Star', description: 'A shining star' },
  { id: 'cat', label: 'Cat', description: 'A friendly cat face' },
  { id: 'dog', label: 'Dog', description: 'A happy dog face' },
  { id: 'turtle', label: 'Turtle', description: 'A smiling turtle' },
  { id: 'robot', label: 'Robot', description: 'A cute robot' },
  { id: 'dinosaur', label: 'Dinosaur', description: 'A friendly dinosaur' },
  { id: 'unicorn', label: 'Unicorn', description: 'A magical unicorn' },
  { id: 'planet', label: 'Planet', description: 'A colorful planet' },
  { id: 'flower', label: 'Flower', description: 'A blooming flower' },
  { id: 'lightning', label: 'Lightning', description: 'A lightning bolt' },
  { id: 'crown', label: 'Crown', description: 'A royal crown' },
] as const;

/** Default avatar ID (first in the list). */
export const DEFAULT_AVATAR_ID = AVATARS[0].id;
