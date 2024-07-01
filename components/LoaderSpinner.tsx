import { Loader } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Image
      src="/Spinner.svg"
      width={100}
      height={100}
      alt='loading'
      />
    </div>
  )
}

export default LoaderSpinner