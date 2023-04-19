const TOKEN = 'https://opentdb.com/api_token.php?command=request';

const createToken = async () => {
  const returnFetch = await fetch(TOKEN);
  const data = await returnFetch.json();
  const returnToken = await data.token;
  await localStorage.setItem('token', returnToken);
};

export default createToken;
