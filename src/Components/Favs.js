import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import {UserContext, UserDispatchContext } from './Provider'
import Card from './Card'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 10rem;
    margin-bottom: 4rem;
`


const Favs = () => {

    let userDetails = React.useContext(UserContext);
    const setUserDetails = useContext(UserDispatchContext);
    const [favsPokemos, set] = useState(userDetails)



    const remove = (id) => {
        userDetails = favsPokemos.filter(value => value.id !== id);
        set(userDetails)
        setUserDetails(userDetails)
    }
    

    return (
        <Container>
            {favsPokemos.length === 0 ? <div>Mate, don´t you have any favorite pokemon? add some!</div> : favsPokemos.map((item, i) => (
                <Card key={i} data={item} remove={remove} isFav={true} />
            ))}
            {}
        </Container>
    );
}

export default Favs;
