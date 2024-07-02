"use client";
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
    <div className='bg-black-2 rounded-md p-1 relative mt-8 block'>
    <input type="text"  placeholder='Serach.. ' value={search} onChange={(e) => setSearch(e.target.value)} className='border-none p-1 px-2 outline-none w-full bg-black-2  focus-visible:ring-offset-orange-1'/>
    </div>
  )
}

export default Search