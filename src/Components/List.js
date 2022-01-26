import React, {useState} from 'react'
import styled from 'styled-components'
import Card from './Card'
import AllPokemon from './Queries/UseAllPokemon'
import UsePokemon from './Queries/UsePokemon'


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 10rem;
    margin-bottom: 4rem;
`

const ButtonContainer = styled.div`
    display: flex;
    display: flex;
    margin: 1rem 0 20rem 0;
    flex-direction: column;
    align-self: center;
` 

const Button = styled.button`

  align-items: center;
  background-color: transparent;
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: Inter,sans-serif;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;


&:after {
  background-color: #111;
  border-radius: 8px;
  content: "";
  display: block;
  height: 48px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  transform: translate(8px, 8px);
  transition: transform .2s ease-out;
  z-index: -1;
}

&:hover:after {
  transform: translate(0, 0);
}

&:active {
  background-color: #ffeb3b;
  outline: 0;
}

&:hover {
  outline: 0;
}

@media (min-width: 768px) {
    padding: 0 40px;
}
`

const Counting = styled.h4`
    margin-bottom: 2rem;
`

const Pokemon = ({ pokemon }) => {
    const { data } = UsePokemon(pokemon);
    if (!data) {
      return null;
    }

    return (
        <Card data={data} isFav={false} />
    );
  };

const List = () => {

    const [page, setPage] = useState(10)


    const { data, isLoading, isError, error, isPreviousData, isFetching } = AllPokemon(page);
    if (!data) {
        return null;
    }

    return (
        <MainContainer>
            <Container>
                {isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Error: {error.message}</div>
                ) : (
                <>
                    {data.results.map((item, i) => (
                        <Pokemon key={item.name} pokemon={item} />
                    ))}
                </>
                )}
            </Container>
            <ButtonContainer>
                <Counting>Pokemons showing: {page}</Counting>
                <Button
                    onClick={() => {
                    if (!isPreviousData) {
                        setPage(old => old + 20)
                    }
                    }}
                >
                    MORE POKEMONS
                </Button>
            </ButtonContainer>
            {isFetching ? <span> Loading...</span> : null}{' '}
        </MainContainer>
        
    );
}

export default List;
