'use client';
import React, { useState, FormEvent } from 'react';
import { BiSearch } from 'react-icons/bi';
import api from '../api/api';
import Image from 'next/image';

interface weatherData {
  name: string;
  main: {
    humidity: number;
    feels_like: number;
    temp: number;
  };
  description: string;
  state: string;
  localTime: string;
  weather: [
    {
      description: string;
    },
  ];
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
          language: 'pt-BR',
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
    return <div className='text-white'>Carregando...</div>;
  }

  const translatedDescription =
    weatherData?.weather[0].description === 'sunny'
      ? 'Ensolarado'
      : weatherData?.weather[0].description === 'cloudy'
      ? 'Nublado'
      : weatherData?.weather[0].description === 'overcast clouds'
      ? 'Céu nublado'
      : weatherData?.weather[0].description === 'scattered clouds'
      ? 'Núvens dispersas'
      : weatherData?.weather[0].description === 'light rain'
      ? 'Chuva leve'
      : weatherData?.weather[0].description === 'moderate rain'
      ? 'Chuva moderada'
      : weatherData?.weather[0].description === 'broken clouds'
      ? 'Núvens fragmentadas'
      : weatherData?.weather[0].description === 'clear sky'
      ? 'Céu limpo'
      : weatherData?.weather[0].description === 'few clouds'
      ? 'Poucas núvens'
      : weatherData?.weather[0].description;

  const image =
    weatherData?.weather[0].description === 'sunny' ? (
      <Image src="/sunny.png" alt="sunny" width={150} height={150} />
    ) : weatherData?.weather[0].description === 'cloudy' ? (
      <Image src="/cloud.png" alt="cloud" width={150} height={150} />
    ) : weatherData?.weather[0].description === 'overcast clouds' ? (
      <Image src="/cloud.png" alt="overcast clouds" width={150} height={150} />
    ) : weatherData?.weather[0].description === 'scattered clouds' ? (
      <Image
        src="/scattered-clouds.png"
        alt="scattered clouds"
        width={150}
        height={150}
      />
    ) : weatherData?.weather[0].description === 'light rain' ? (
      <Image src="/light-rain.png" alt="light rain" width={150} height={150} />
    ) : weatherData?.weather[0].description === 'moderate rain' ? (
      <Image src="/rain.png" alt="moderate rain" width={150} height={150} />
    ) : weatherData?.weather[0].description === 'broken clouds' ? (
      <Image
        src="/broken-clouds.png"
        alt="broken clouds"
        width={150}
        height={150}
      />
    ) : weatherData?.weather[0].description === 'clear sky' ? (
      <Image src="/clear.png" alt="clear sky" width={150} height={150} />
    ) : weatherData?.weather[0].description === 'few clouds' ? (
      <Image src="/few-clouds.png" alt="few clouds" width={150} height={150} />
    ) : (
      weatherData?.weather[0].description
    );

  let messageHumidity = '';
  if (weatherData && weatherData.main && weatherData.main.humidity) {
    if (weatherData.main.humidity <= 33) {
      messageHumidity = 'Baixas probabilidades de chuva';
    } else if (
      weatherData.main.humidity > 33 &&
      weatherData.main.humidity < 66
    ) {
      messageHumidity = 'Probabilidade média de chuva';
    } else if (weatherData.main.humidity >= 66) {
      messageHumidity = 'Altas probabilidades de chuva';
    }
  }

  return (
    <div>
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
      </div>
      {weatherData == null ? (
        <div className="flex flex-col items-center justify-center h-screen w-screen"></div>
      ) : (
        <div>
        
          <div className="flex items-center justify-center h-screen text-gray-200 text-lg flex-col ">  
            <h1 className='text-xl text-blue-950 p-3'>{weatherData.name}</h1>
          {image}
        
            <p>Previsão do tempo na cidade de {weatherData.name}</p>

            <p>
              Sensação térmica{' '}
              <span>{Math.ceil(weatherData.main.feels_like - 273.15)} </span>ºC
            </p>
            <p>
              Humidade: {weatherData.main.humidity}% : {messageHumidity}
            </p>
            <p>{translatedDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};
