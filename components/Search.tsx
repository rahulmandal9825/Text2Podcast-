"use client";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';

const Search = () => {
    const [search, setSearch] = useState<string>("");
    const router = useRouter(); 
    const pathname = usePathname();

    const [debouncedValue] = useDebounce(search , 500);

    useEffect(() => {
      if(debouncedValue){
        router.push(`/discover?search=${debouncedValue}`);
      } else if (!debouncedValue && pathname === '/discover') router.push('/discover');
    
    }, [router, pathname, debouncedValue])
    



  return (
    <div className='bg-black-2 rounded-md px-2 py-1  mt-8 flex items-center'>
    <input type="text"  placeholder='Serach.. ' value={search} onChange={(e) => setSearch(e.target.value)} className='border-none p-1 px-2 outline-none w-full bg-black-2  focus-visible:ring-offset-orange-1'/>
    {search && (<Image
    src="/cross.svg"
    width={20}
    height={20}
    alt='cross'
    className= "aspect-square rounded-full bg-black-3 h-[70%] cursor-pointer  "
    onClick={() => setSearch("")}
    />)}

    </div>
  )
}

export default Search