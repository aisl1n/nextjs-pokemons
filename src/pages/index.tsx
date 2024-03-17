import PokemonItem from '@/components/pokemonItem';
import { useEffect, useState } from 'react';

export default function Page() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<[]>([]);
  useEffect(() => {
    const getPokemons = async () => {
      const offset = page > 1 ? page * 10 : 0;
      const response = await fetch(`/api/pokemons?offset=${offset}&limit=8`);
      const data = await response.json();
      console.log(data);
      setData(data.results);
    };

    getPokemons();
  }, [page]);

  function changePage(next: boolean) {
    if (next) {
      setPage(page + 1);
    } else {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  }
  return (
    <>
      <div className='flex col items-center justify-center mt-10'>
        <h1 className='text-5xl font-black'>Pokémons!</h1>
      </div>
      <div className='flex items-center justify-center'>
        <button
          className='bg-pink-400 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => changePage(false)}
        >
          ➖
        </button>
        <button
          className='bg-pink-400 hover:bg-pink-700 text-white font-bold py-2 px-4 m-2 rounded'
          onClick={() => changePage(true)}
        >
          ➕
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
        {data?.map((pokemon: any) => {
          return <PokemonItem key={pokemon.name} name={pokemon.name} />;
        })}
      </div>
    </>
  );
}
