'use client';
import React, { useState, FormEvent } from 'react';
import { BiSearch } from 'react-icons/bi';
import api from '../api/api';

interface weatherData {
  name: string;
  main: {
    humidity: number,
    feels_like: number
    temp: number};
  description: string;
  state: string;
  localTime: string;

}

export const Search = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const showDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get('/weather', {
        params: {
          q: city,
          appid: process.env.NEXT_PUBLIC_KEY,
        },
      });
      setWeatherData(response.data);
      setCity('');
      setError('');
      setLoading(false);
    } catch (error) {
      setError('Erro ao buscar os dados.');
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showDetails();
  };
  if (loading === true) {
    return <div>Carregando...</div>;
  }
  
  let messageHumidity = '';
  if (weatherData && weatherData.main && weatherData.main.humidity) {
      if (weatherData.main.humidity <= 33) {
          messageHumidity = 'Baixas probabilidades de chuva';
      } else if (weatherData.main.humidity > 33 && weatherData.main.humidity < 66) {
          messageHumidity = 'Probabilidade média de chuva';
      } else if (weatherData.main.humidity >= 66) {
          messageHumidity = 'Altas probabilidades de chuva';
      }
  }

  return (<div>
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className=" flex w-full items-center justify-center max-w-md bg-white shadow-md rounded px-8 pt-2 pb-2 m-4"
      >
        <input
          className="rounded-md border-none focus:outline-none text-gray-600"
          type="text"
          placeholder="Buscar cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <BiSearch className="text-gray-600" />
      </form>

 
    </div>     {weatherData && (
        <div>
          <span className="span">
      
  <p>Previsão do tempo na cidade de {weatherData.name}</p>
  <p>Temperatura: { Math.ceil(weatherData.main.temp - 273.15)} ºC</p>
  <span>A sensação térmica em {weatherData.name} é de { Math.ceil(weatherData.main.feels_like - 273.15)} ºC</span>
  <p><span>Humidade: {weatherData.main.humidity}% | {messageHumidity}</span></p>
  
          
            
          </span>
        </div>
      )}
</div>  );
};
