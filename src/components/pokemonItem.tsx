import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PokemonItemProps {
  name: string;
}

function PokemonItem({ name }: PokemonItemProps) {
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(`/api/pokemons/${name}`);
      const data = await res.json();
      console.log(data);
      setPokemon(data);
      setLoading(false);
    };
    getPokemon();
  }, [name]);

  if (loading) {
    return (
      <div className='flex justify-center relative p-4 sm:p-6 lg:p-8'>
        <svg style={{ width: "50px", height: "50px" }} className='animate-spin mr-3 ...' viewBox='0 0 24 24'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.009 8.009 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      </div>
    );
  }
  

  const pokemonName = pokemon?.name;

  const pokemonNameFormated =
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  const pokemonImage = pokemon?.sprites?.other?.['official-artwork'].front_default

  return (
    <>
      <div className='group relative block bg-black'>
        <Image
          alt='pokemon'
          src={pokemonImage}
          width={600}
          height={400}
        />

        <div className='relative p-10 sm:p-6 lg:p-8'>
          <p className='text-sm font-medium uppercase tracking-widest text-pink-500'>
            Pokémon
          </p>

          <p className='text-xl font-black text-white sm:text-2xl'>
            {pokemonNameFormated}
          </p>

          <div className='mt-2'>
            <div className='translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100'>
              <p>Altura: {pokemon?.height}</p>
              <p>Peso: {pokemon?.weight}</p>
              <p>Exp base: {pokemon?.base_experience}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonItem;
