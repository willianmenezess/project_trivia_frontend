import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const initialState = {
	player: {
		email: 'will@teste.com',
		playerName: 'will',
		score: 0,
		assertions: 0,
	},
	questions: {
		questions: [
			{
				category: 'Entertainment: Music',
				type: 'multiple',
				difficulty: 'hard',
				question: 'Which member of the English band &quot;The xx&quot; released their solo album &quot;In Colour&quot; in 2015?',
				correct_answer: 'Jamie xx',
				incorrect_answers: [
					'Romy Madley Croft',
					'Oliver Sim',
					'Baria Qureshi'
				]
			},
			{
				category: 'Science: Computers',
				type: 'boolean',
				difficulty: 'medium',
				question: 'The open source program Redis is a relational database server.',
				correct_answer: 'False',
				incorrect_answers: [
					'True'
				]
			},
			{
				category: 'History',
				type: 'multiple',
				difficulty: 'medium',
				question: 'How many times was Albert Einstein married in his lifetime?',
				correct_answer: 'Twice',
				incorrect_answers: [
					'Five',
					'Thrice',
					'Once'
				]
			},
			{
				category: 'Science: Computers',
				type: 'boolean',
				difficulty: 'medium',
				question: 'A Boolean value of &quot;0&quot; represents which of these words?',
				correct_answer: 'False',
				incorrect_answers: [
					'True'
				]
			},
			{
				category: 'General Knowledge',
				type: 'multiple',
				difficulty: 'easy',
				question: 'The &ldquo;fairy&rdquo; type made it&rsquo;s debut in which generation of the Pokemon core series games?',
				correct_answer: '6th',
				incorrect_answers: [
					'2nd',
					'7th',
					'4th'
				]
			}
		],
		difficulty: '',
		category: '',
		timeLeft: 30,
		answered: false
	}
};

const expiredToken = {
  "response_code":3,
  "results":[]
}

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(expiredToken),
});


describe('Testa a página de Game', () => {
  test('Verifica se ao inicializar a página de Game são renderizados o nome e score zero', async() => {
    const initialEntries = '/game';
    renderWithRouterAndRedux(<App />, initialState, initialEntries );
		const playerName = await screen.findByRole('heading', {  name: /will/i});
		const initialScore = screen.getByRole('heading', {  name: /0/i});
		expect(playerName).toBeInTheDocument();
		expect(initialScore).toBeInTheDocument();
  });

  test('Verifica são renderizados a primeira pergunta, as alternativas e a categoria', async() => {
    const initialEntries = '/game';
    renderWithRouterAndRedux(<App />, initialState, initialEntries );
		const questionCategory = await screen.findByText(/entertainment: music/i);
		const question = screen.getByText(  /which member of the english band &quot;the xx&quot; released their solo album &quot;in colour&quot; in 2015\?/i  );
		const alternative1 = screen.getByRole('button', {  name: /romy madley croft/i})
		const alternative2 = screen.getByRole('button', {  name: /oliver sim/i})
		const alternative3 = screen.getByRole('button', {  name: /baria qureshi/i})
		const alternative4 = screen.getByRole('button', {  name: /jamie xx/i})
		expect(questionCategory).toBeInTheDocument();
		expect(question).toBeInTheDocument();
		expect(alternative1).toBeInTheDocument();
		expect(alternative2).toBeInTheDocument();
		expect(alternative3).toBeInTheDocument();
		expect(alternative4).toBeInTheDocument();
  });

  test('Verifica se o jogador é mandado para página de login se o token expirar', async() => {
		const initialState = {};
		global.fetch = jest.fn(mockFetch);
    const initialEntries = '/game';
    renderWithRouterAndRedux(<App />, initialState, initialEntries );
		const inputName = await screen.findByTestId('input-player-name');
		expect(inputName).toBeInTheDocument();
	
  });
})