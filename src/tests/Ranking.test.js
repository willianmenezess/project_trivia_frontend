import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

describe('Componente Ranking', () => {
    test('renderizar o componente sem erros', () => {
        const { getByTestId } = renderWithRouterAndRedux(<Ranking />);
        const Title = getByTestId('ranking-title');
        expect(Title).toBeInTheDocument();
    });

    test('renderizar botão para voltar à tela de login', () => {
        const { getByTestId } = renderWithRouterAndRedux(<Ranking />);
        const goHomeButton = getByTestId('btn-go-home');
        expect(goHomeButton).toBeInTheDocument();
      });

    test('renderizar o botão de login', () => {
        const { getByTestId } = renderWithRouterAndRedux(<Ranking />);
        const Home = getByTestId('btn-go-home')
        expect(Home).toBeInTheDocument;
        expect(Home).toHaveTextContent(/Play Again/i);
    });
    
    test('Ir para página de Login quando o botão é clicado', () => {
        const historyMock = { push: jest.fn() };
        const { getByTestId } = renderWithRouterAndRedux(<Ranking history={historyMock} />);
        const Home = getByTestId('btn-go-home');
        fireEvent.click(Home);
        expect(historyMock.push).toHaveBeenCalledWith('/');
    });

    test('exibir ranking de jogadores corretamente', () => {
        const mockRanking = [
          { name: 'Jogador 1', score: 10, email: 'jogador1@teste.com' },
          { name: 'Jogador 2', score: 5, email: 'jogador2@teste.com' },
        ];
        localStorage.setItem('ranking', JSON.stringify(mockRanking));
    
        const { getAllByTestId } = renderWithRouterAndRedux(<Ranking />);
        const playerNames = getAllByTestId(/player-name-/);
        const playerScores = getAllByTestId(/player-score-/);
    
        mockRanking.forEach((player, index) => {
          expect(playerNames[index]).toHaveTextContent(player.name);
          expect(playerScores[index]).toHaveTextContent(player.score);
        });
    
        localStorage.clear();
      });
});
