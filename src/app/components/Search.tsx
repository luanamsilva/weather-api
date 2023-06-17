import {BiSearch} from 'react-icons/bi'
export const Search = ()=>{
  return(
    <div className="flex justify-center">
    <form className=' flex w-full items-center justify-center max-w-md bg-white shadow-md rounded px-8 pt-2 pb-2 m-4'>
    <input  className='rounded-md border-none focus:outline-none text-gray-600' type="text" placeholder='Buscar cidade'/>
    <BiSearch className='text-gray-600'/>
   </form> 
  </div>
  )
}