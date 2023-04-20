const TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const createToken = async () => {
  const returnFetch = await fetch(TOKEN);
  const data = await returnFetch.json();
  const returnToken = await data.token;
  await localStorage.setItem('token', returnToken);
};

export const fetchQuestions = async () => {
  const getToken = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
  const data = await response.json();
  return data;
};
