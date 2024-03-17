export async function getPokemons() {
  const res = await fetch('http://localhost:3000/api/pokemons');
  const repo = await res.json();

  return { props: { repo } };
}
