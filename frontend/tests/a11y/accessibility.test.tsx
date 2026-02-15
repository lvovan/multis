import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { MemoryRouter } from 'react-router-dom';
import { SessionProvider } from '../../src/hooks/useSession.tsx';
import WelcomePage from '../../src/pages/WelcomePage';
import * as playerStorage from '../../src/services/playerStorage';
import NewPlayerForm from '../../src/components/WelcomeScreen/NewPlayerForm';
import AvatarPicker from '../../src/components/AvatarPicker/AvatarPicker';
import ColorPicker from '../../src/components/ColorPicker/ColorPicker';
import PlayerList from '../../src/components/WelcomeScreen/PlayerList';

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <SessionProvider>{ui}</SessionProvider>
    </MemoryRouter>,
  );
}

describe('Accessibility (axe)', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('WelcomePage (new player flow) has no a11y violations', async () => {
    const { container } = renderWithProviders(<WelcomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('WelcomePage (returning player flow) has no a11y violations', async () => {
    playerStorage.savePlayer({ name: 'Alice', avatarId: 'cat', colorId: 'blue' });
    const { container } = renderWithProviders(<WelcomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('NewPlayerForm has no a11y violations', async () => {
    const { container } = render(
      <NewPlayerForm onSubmit={() => {}} playerExists={() => false} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('AvatarPicker has no a11y violations', async () => {
    const { container } = render(
      <AvatarPicker selectedId="rocket" onSelect={() => {}} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('ColorPicker has no a11y violations', async () => {
    const { container } = render(
      <ColorPicker selectedId="blue" onSelect={() => {}} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('PlayerList has no a11y violations', async () => {
    const players = [
      { name: 'Alice', avatarId: 'cat', colorId: 'blue', lastActive: 200, createdAt: 100 },
      { name: 'Bob', avatarId: 'dog', colorId: 'red', lastActive: 100, createdAt: 50 },
    ];
    const { container } = render(
      <PlayerList
        players={players}
        onSelectPlayer={() => {}}
        onDeletePlayer={() => {}}
        onNewPlayer={() => {}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
