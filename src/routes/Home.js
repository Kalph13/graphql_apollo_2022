import React from "react";
import { gql, useQuery } from "@apollo/client";
import Movie from "../components/Movie";
import styled from "styled-components";

/* Without Variables → Write Query as Same as Playground */
/* const GET_MOVIES = gql`
    {
        movies {
            id
            medium_cover_image
        }
    }
`; */

/* With Variables → Specify Query Name for Apollo */
/* @client → Represents the variable exists in the client, not the server */
const GET_MOVIES = gql`
    query getMovies($rating: Float!) {
        movies(rating: $rating) {
            id
            medium_cover_image
            isLiked @client
        }
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%
`;

const Header = styled.div`
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    height: 45vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Title = styled.div`
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const Subtitle = styled.div`
    font-size: 35px;
`;

const Loading = styled.div`
    font-size: 18px;
    opacity: 0.5;
    font-weight: 500;
    margin-top: 10px;
`;

const Movies = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 60%;
    position: relative;
    top: -50px;
`;

export default () => {
    const { loading, data } = useQuery(GET_MOVIES, {
        variables: {rating: 9.0}
    });
    return (
        <Container>
            <Header>
                <Title>Apollo 2022</Title>
                <Subtitle>GraphQL, Apollo and React</Subtitle>
            </Header>
            { loading && <Loading>loading...</Loading> }
            { /* Must use && → 'data' returns undefine at the first time due to delay */
              !loading && data.movies && (
                <Movies> 
                    {data.movies.map((movie) => <Movie key={movie.id} id={movie.id} bg={movie.medium_cover_image} isLiked={movie.isLiked}/>)}
                </Movies>
            )}
        </Container>
    );
};