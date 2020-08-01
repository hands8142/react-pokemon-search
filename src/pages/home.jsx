import React from 'react';
import Search from '../components/Search';
import { fetchPokemon } from '../services/getPokemon';
import PokemonData from '../components/PokemonData';
import { Spinner, Alert } from 'react-bootstrap';
import './home.scss'

export default function HomePage() {

  const [pokemon, setPokemon] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg , setErrorMsg] = React.useState('');

  const getPokemon = async (query) => {
    if (!query) {
      setErrorMsg('포켓몬을 입력해야합니다.')
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetchPokemon(query);
        const resultes = await response.json();
        setPokemon(resultes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        setErrorMsg('포켓몬을 찾을 수 없습니다.')
      }
    }, 1500);
  }

  return (
    <div>
      {error ? (
        <Alert variant='danger'>
          {errorMsg}
        </Alert>
      ): null}
      <Search getPokemon={getPokemon} />
      {loading ? (
        <div className="spin">
          <Spinner className="spinner" animation="border" />
        </div>
      ): null}
      {!loading && pokemon ? (
        <PokemonData 
          name={pokemon.name}
          sprite={pokemon.sprites.front_default}
          abilities={pokemon.abilities}
          stats={pokemon.stats}
          types={pokemon.types} />
      ): null}
    </div>
  )
}