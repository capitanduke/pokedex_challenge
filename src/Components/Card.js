import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {UserContext, UserDispatchContext } from './Provider'

const CardItem = styled.div`
    width: 650px;
    height: 650px;
    background-color: #fff;
    color: #000;
    padding: 2rem;
    margin: 2rem;
    border-radius: 3%;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

    @media screen and (max-width: 480px) {
        width: 550px;
        height: 550px;
    }
`

const Name = styled.h2`
    font-size: 22px;
    text-transform: uppercase;
`

const Image = styled.img`
    display: flex;
    align-self: center;
    width: 50%;
    height: auto;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`

const AbilityTitle = styled.p`
    font-size: 16px;
    padding-top: 1rem;
    text-transform: uppercase;
    font-weight: 600;
`

const LineBreaker = styled.div`
    border-bottom: 1px solid #000;
    width: 50%;
    align-self: center;
    margin-bottom: 10px;
`

const HeartContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const Heart = styled.div`
    width: 100px;
    height: 100px;
    background: url("https://cssanimation.rocks/images/posts/steps/heart.png")
    no-repeat;
    background-position: 0 0;
    cursor: pointer;
    transition: background-position 1s steps(28);
    transition-duration: 0s;

    transition-duration: ${props => props.liked ? "1s" : ""};
    background-position: ${props => props.liked ? "-2800px 0" : ""};

    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:focus {
        box-shadow: none;
        outline: none !important;
    }
`

const ContainerButton = styled.div`
    display: flex;
    justify-content: center;
`

const RemoverButton = styled.button`
    width: 50%;
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
    max-width: 50%;
    padding: 0 25px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;


    &:after {
    background-color: #fb1d1d;
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
    background-color: #fb1d1d;
    outline: 0;
    }

    &:hover {
    outline: 0;
    }

    @media (min-width: 768px) {
    padding: 0 40px;
    }
` 

const P = styled.p`
    font-size: 14px;
`

const Card = ({data, remove, isFav}) => {

    const [liked, set] = useState(false)
    const userDetails = React.useContext(UserContext);
    const setUserDetails = useContext(UserDispatchContext);

    const addfavs = (pokemon) => {
        if(userDetails.length > 0){
            set(true)
            const pokeClean =  userDetails.filter(poke => poke.id !== pokemon.id);
            setUserDetails(pokeClean)
        }
        set(true)
        setUserDetails(oldPokemons => [...oldPokemons, pokemon])
    }


    return (
        <CardItem>
            <Content>
                <Name>{data.name}</Name>
                <AbilityTitle>abilities</AbilityTitle>
                <LineBreaker />
                {data.abilities.slice(0, 2).map((ability, i) => (
                    <P key={i}>{ability.ability.name}</P>
                ))}
                <AbilityTitle>moves</AbilityTitle>
                <LineBreaker />
                {data.moves.slice(0, 2).map((move, i) => (
                    <P key={i}>{move.move.name}</P>
                ))}
                <Image src={data.sprites.front_shiny} alt={data.name} />
                {isFav && <ContainerButton><RemoverButton onClick={() => remove(data.id)}>REMOVE</RemoverButton></ContainerButton>}
                {!isFav && <HeartContainer  onClick={() => addfavs(data)}><Heart liked={liked}/></HeartContainer>}
            </Content>
        </CardItem>
    );
}

export default Card;
