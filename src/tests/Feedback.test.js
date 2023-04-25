import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithRouterAndRedux } from "../tests/helpers/renderWithRouterAndRedux";
import Feedback from "../pages/Feedback";

describe("Componente Feedback", () => {
    test('Testar a renderização do componente Feedback com acertos e pontuações corretas', () => {
        const initialState = {
          player: {
            assertions: 3,
            score: 10,
          },
        };

        const { getByTestId } = renderWithRouterAndRedux(<Feedback />, initialState);

        const feedbackText = getByTestId('feedback-text');
        const feedbackTotalScore = getByTestId('feedback-total-score');
        const feedbackTotalQuestion = getByTestId('feedback-total-question');
        expect(feedbackText).toBeInTheDocument();
        expect(feedbackText).toHaveTextContent(/Well Done!/i);
        expect(feedbackTotalQuestion).toBeInTheDocument();
        expect(feedbackTotalQuestion).toHaveTextContent('3');
        expect(feedbackTotalScore).toBeInTheDocument();
        expect(feedbackTotalScore).toHaveTextContent('10');
      });

    test("renderizar o botão da tela de login", () => {
        const historyMock = { push: jest.fn() };
        const { getByTestId } = renderWithRouterAndRedux(<Feedback history={historyMock} />);
        const Home = getByTestId("btn-play-again");
        fireEvent.click(Home);
        expect(historyMock.push).toHaveBeenCalledWith("/");
    });

    test("renderizar o botão da tela de ranking ranking", () => {
        const historyMock = { push: jest.fn() };
        const { getByTestId } = renderWithRouterAndRedux(<Feedback history={historyMock} />);
        const Home = getByTestId("btn-ranking");
        fireEvent.click(Home);
        expect(historyMock.push).toHaveBeenCalledWith("/ranking");
    });
});
