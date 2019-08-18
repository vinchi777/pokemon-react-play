let config = {
  POKEMON_API_URL: 'https://pokeapi.co/api/v2',
};

export default {
  NODE_PATH: 'src',
  ...process.env,
  ...config,
};
