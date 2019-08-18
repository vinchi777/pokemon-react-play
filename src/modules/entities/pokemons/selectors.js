const registered = (pokemons) => {
  return pokemons.all.filter( id => !!pokemons.byId[id]['registered'] );
}

export default {
  registered
}
