'use client';
import { Search } from './components/Search';

export default function Home() {
  return (
    <div className="bg-cover flex items-center justify-center w-screen">
      <Search />
      <div className="flex flex-col items-center text-gray-200 h-full"></div>
    </div>
  );
}
