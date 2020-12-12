import React, { useEffect, useState } from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import styled from 'styled-components/native';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Movies from '../components/Movies';

import {ProfileContext} from '../context/ProfileContext';
import { GetLocation, GetCountry } from '../utils/Location';
//import { filterByCountry, geoLocation, getLocation} from '../services/movieFilter';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
`;

const Home = (props) => {

  const [movies, setMovies] = useState([]);
  const [nationalMovies, setNationalMovies] = useState([]);
  const [position, setPosition] = useState([null]);
  
  useEffect(() => {
    GetLocation().then((info) => {
      setPosition(info);
    }).catch((error) => {
        console.log('Location eror: ' + error);
        setPosition(null);
    });
  }, []);

  useEffect(() => {
    const getNationalMovies = async () => {

      if (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const country = await GetCountry({ lat, lng });
        
        const filteredMovies = movies.filter((item, index) => {
          return item.Country.indexOf(country) !== -1;
        });
        
        setNationalMovies(filteredMovies);
      }
    }
    getNationalMovies();
  }, [position]);

  useEffect(() => {
    const moviesJson = require('../assets/Movies.json');
    setMovies(moviesJson);
  }, []);

  return (
    <ProfileContext.Consumer>
      {({ user, setUser }) => {
        let moviesToResume = [];
        if (user) {
          const data = require('../assets/moviesToResume.json');
          moviesToResume = data[user];
        }
        return (
          <>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
            <Container>
              <Poster source={require('../assets/poster.jpg')}>
                <Gradient
                  locations={[0, 0.2, 0.6, 0.93]}
                  colors={[
                    'rgba(0,0,0,0.5)',
                    'rgba(0,0,0,0.0)',
                    'rgba(0,0,0,0.0)',
                    'rgba(0,0,0,1)',
                  ]}>
                  <Header />
                  <Hero />
                </Gradient>
              </Poster>
              <Movies label={`Continuar Assistindo como ${user}`} item={moviesToResume} />
              <Movies label={`Nacionais`} item={nationalMovies} />
              <Movies label="Recomendados" item={movies} />
              <Movies label="Top 10" item={movies} />
            </Container>
          </>
        )
      }}
    </ProfileContext.Consumer>
  );
  
};

export default Home;
