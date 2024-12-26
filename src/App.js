import React, { useState } from 'react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import client from '../apollo-client';


const GET_CHARACTERS = gql`
    query GetCharacters($page: Int, $filter: FilterCharacter) {
        characters(page: $page, filter: $filter) {
            info {
                pages
                next
            }
            results {
                id
                name
                status
                species
                gender
                origin {
                    name
                }
            }
        }
    }
`;

const App = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');

    const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
        variables: { page, filter: { status: statusFilter, species: speciesFilter } },
    });

    const loadMore = () => {
        if (data.characters.info.next) {
            fetchMore({
                variables: { page: data.characters.info.next },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        characters: {
                            info: fetchMoreResult.characters.info,
                            results: [
                                ...prev.characters.results,
                                ...fetchMoreResult.characters.results,
                            ],
                        },
                    };
                },
            });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Rick and Morty Characters</h1>
            <div>
                <label>
                    Status Filter:
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </label>
                <label>
                    Species Filter:
                    <input
                        type="text"
                        value={speciesFilter}
                        onChange={(e) => setSpeciesFilter(e.target.value)}
                        placeholder="Enter species"
                    />
                </label>
            </div>
            <div>
                {data.characters.results.map((character) => (
                    <div key={character.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
                        <h2>{character.name}</h2>
                        <p>Status: {character.status}</p>
                        <p>Species: {character.species}</p>
                        <p>Gender: {character.gender}</p>
                        <p>Origin: {character.origin.name}</p>
                    </div>
                ))}
            </div>
            {data.characters.info.next && (
                <button onClick={loadMore} style={{ marginTop: '20px' }}>
                    Load More
                </button>
            )}
        </div>
    );
};

const WrappedApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

export default WrappedApp;
