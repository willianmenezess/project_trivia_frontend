import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa a página de Login', () => {
    test('Verifica se ao inicializar a página inicial de login são renderizados os inputs e botão', () => {
      renderWithRouterAndRedux(<App />);
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const inputName = screen.getByTestId('input-player-name');
      const btnLogin = screen.getByRole('button', { name: /play/i });
			const btnSettings = screen.getByRole('button', {  name: /settings/i})
      expect(inputEmail).toBeInTheDocument();
      expect(inputName).toBeInTheDocument();
      expect(btnLogin).toBeInTheDocument();
			userEvent.click(btnSettings);
    });
  
    test('Verifica o preenchimentos dos inputs e submit do botão e se o usuário é direcionado para a página de game ao clicar em "play"', async () => {
			renderWithRouterAndRedux(<App />);
			const inputEmail = screen.getByTestId('input-gravatar-email');
      const inputName = screen.getByTestId('input-player-name');
      const btnLogin = screen.getByRole('button', { name: /play/i });
			userEvent.type(inputEmail, 'will@teste.com');
			userEvent.type(inputName, 'Willian');
			userEvent.click(btnLogin);
			const namePlayer = await screen.findByRole('heading', {  name: /willian/i});
      expect(namePlayer).toBeInTheDocument();
    });
  });