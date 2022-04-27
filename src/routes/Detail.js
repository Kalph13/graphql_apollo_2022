import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

/* With Variables → Specify Query Name for Apollo */
const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            id
            title
            medium_cover_image
            language
            rating
            description_intro
            summary
            isLiked @client
        }
        suggestions(id: $id) {
            id
            title
            medium_cover_image
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    color: white;
`;

const Detail = styled.div`
    display: flex;
    width: 100%;
    height: 70%;
    justify-content: space-around;
    align-items: center;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 40%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 18px;
`;

const Poster = styled.div`
    background-image: url(${props => props.bg});
    width: 25%;
    height: 80%;
    background-color: transparent;
`;

const Suggestion = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    height: 30%;
    width: 80%;
`;

const SuggestionMovie = styled.div`
    height: 90%;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 7px;
    overflow: hidden;
    background-color: white;
`;

const SuggestionTitle = styled.div`
    height: 10%;
    color: black;
    font-size: 20px;
    text-align: center;
`;

const SuggestionImg = styled.div`
    background-image: url(${props => props.bg});
    width: 100%;
    height: 90%;
    background-color: transparent;
`;

export default () => {
    const { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: {id: +id} /* Convert String → Int (useParam returns String) */
    });
    return (
        <Container>
            <Detail>
                <Column>
                    <Title>{ loading ? "Loading..." : `${data.movie.title} ${data.movie.isLiked}`}</Title>
                    { /* Must use && → 'data' returns undefine at the first time due to delay */
                    !loading && data.movie && (
                        <>
                            <Subtitle>{data.movie.language} · {data.movie.rating}</Subtitle>
                            <Description>{data.movie.description_intro}</Description>
                        </>
                    )}
                </Column>
                <Poster bg={data && data.movie ? data.movie.medium_cover_image : ""} />
            </Detail>
            <Suggestion>
                { /* Used 'Optional Chain' instead of && */
                  data?.suggestions?.map((movie) =>
                    <Link to={`/${movie.id}`} key={movie.id}>
                        <SuggestionMovie>
                            <SuggestionTitle>{movie.title}</SuggestionTitle>
                            <SuggestionImg bg={movie.medium_cover_image} />
                        </SuggestionMovie>
                    </Link>
                )}
            </Suggestion>
        </Container>
    );
};