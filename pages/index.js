import React, { useState, useEffect, useContext, useRef } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CharacterList from '../components/CharacterList';
import StatusFilter from '../components/StatusFilter';
import SpeciesFilter from '../components/SpeciesFilter';
import SortOptions from '../components/SortOptions';
import { LanguageContext } from '../context/LanguageContext';
import { Spin, Alert, Button } from 'antd';
import '../styles/globals.css'; 

const GET_CHARACTERS = gql`
  query fetchCharacters($status: String, $species: String, $page: Int!) {
    characters(filter: { status: $status, species: $species }, page: $page) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
        image
      }
      info {
        next
      }
    }
  }
`;

const filterOptions = {
  en: {
    all: "All Characters",
    alive: "Alive",
    dead: "Dead",
    unknown: "Unknown",
  },
  mk: {
    all: "Сите карактери",
    alive: "Живи",
    dead: "Мртви",
    unknown: "Непознато",
  }
};

const speciesOptions = {
  en: {
    all: "All Species",
    human: "Human",
    alien: "Alien",
    unknown: "Unknown",
  },
  mk: {
    all: "Сите видови",
    human: "Човек",
    alien: "Вонземјанин",
    unknown: "Непознато",
  }
};

const HomePage = () => {
  const [statusFilter, setStatusFilter] = useState('All Characters');
  const [speciesFilter, setSpeciesFilter] = useState('All Species');
  const [page, setPage] = useState(1);
  const [characterList, setCharacterList] = useState([]);
  const [sortBy, setSortBy] = useState('name'); 
  const { language, setLanguage } = useContext(LanguageContext);
  const bottomRef = useRef(null);

  const statusToUse = statusFilter === filterOptions[language].all ? null : statusFilter;
  const speciesToUse = speciesFilter === speciesOptions[language].all ? null : speciesFilter;

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { status: statusToUse, species: speciesToUse, page },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data && data.characters) {
      setCharacterList((prevCharacters) => [
        ...prevCharacters,
        ...data.characters.results,
      ]);
    }
  }, [data]);

  useEffect(() => {
    setCharacterList([]); 
    setPage(1);
  }, [statusFilter, speciesFilter]);

  const handleScroll = (entries) => {
    if (entries[0].isIntersecting && data && data.characters.info.next) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll);
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [bottomRef, data]);

  const handleStatusChange = (newStatus) => {
    setStatusFilter(newStatus);
  };

  const handleSpeciesChange = (newSpecies) => {
    setSpeciesFilter(newSpecies);
  };

  const handleSortChange = (sortCriteria) => {
    setSortBy(sortCriteria);
  };

  const sortedCharacters = [...characterList].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'origin') {
      return a.origin.name.localeCompare(b.origin.name);
    }
    return 0;
  });

  if (loading && page === 1) return <Spin size="large" />;
  if (error) {
    console.error('GraphQL error:', error);
    return <Alert message="Error loading characters." type="error" />;
  }

  return (
    <div className="app">
    <div className="background"></div>
      <h1>{language === 'mk' ? 'Карактери од Рик и Морти' : 'Rick and Morty Characters'}</h1>
      <StatusFilter options={filterOptions[language]} onFilterChange={handleStatusChange} />
      <SpeciesFilter options={speciesOptions[language]} onFilterChange={handleSpeciesChange} />
      <SortOptions onSortChange={handleSortChange} />
      <CharacterList characters={sortedCharacters} />
      <div ref={bottomRef} className="bottom-ref" />
      <footer>
        <Button className="language-switch-button" onClick={() => setLanguage('en')}>English</Button>
        <Button className="language-switch-button" onClick={() => setLanguage('mk')}>Македонски</Button>
      </footer>
    </div>
  );
};

export default HomePage;