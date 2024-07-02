import { EmptyStateProps } from '@/types'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const EmptyState = ({ title, search, buttonLink, buttonText }: EmptyStateProps) => {
  return (
    <section className="flex size-full flex-col gap-3  items-center">
      <Image src="/emptyState.svg" width={250} height={250} alt="empty state" />
      <div className="flex  w-full  max-w-[254px] flex-col gap-3">
        <h1 className="text-xl text-center font-medium text-white-1">{title}</h1>
        {search && (
          <p className="text-xl text-center font-medium text-white-2">Try adjusting your search to find what you are looking for</p>
        )}
        {buttonLink && (
          <Button className="bg-orange-1">
            <Link href={buttonLink} className="gap-1 flex">
              <Image 
                src="/discover.svg"
                width={100}
                height={100}
                alt='discover'
              />
              <h1 className="text-16 font-extrabold text-white-1">{buttonText}</h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default EmptyState