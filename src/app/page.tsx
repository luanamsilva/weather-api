"use client"
import {Search} from './components/Search'
import React,{ useState } from 'react'


export default function Home() {
const [data, setData] = useState({})
const [location, setLocation] = useState('')
const [error, setError] = useState('')

 const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
  
 const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>)=>{
  if(e.key === "Enter") {
    e.preventDefault()
    try{
      const response = await fetch(url)
      if(!response.ok){
        throw new Error()
      } const data = await response.json()
      setData(data)
      setLocation("")
      setError("")
         } catch(error){
      setError("Cidade não encontrada!")
      setData({})
    }

}}
 
 return (
    <div className="bg-cover bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
      
      <div className="rounded-lg flexflex-col h-full">
     <Search handleSearch={handleSearch} setLocation={setLocation}/> 
     
      </div>
      
    

    </div>
  )
}
