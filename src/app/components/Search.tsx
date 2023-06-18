import {BiSearch} from 'react-icons/bi'
interface InputProps{
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setLocation: React.Dispatch<React.SetStateAction<string>>
}
export const Search = ({handleSearch, setLocation}:InputProps)=>{
  return(
    <div className="flex justify-center">
    <form className=' flex w-full items-center justify-center max-w-md bg-white shadow-md rounded px-8 pt-2 pb-2 m-4'>
    <input  className='rounded-md border-none focus:outline-none text-gray-600' type="text" placeholder='Buscar cidade'
    onKeyDown={handleSearch}
    onChange={(e) => setLocation(e.target.value)}/>
    <BiSearch className='text-gray-600'/>
   </form> 
  </div>
  )
}