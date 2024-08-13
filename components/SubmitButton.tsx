import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface SubmitButtonProps {
  isLoading: boolean
  className?: string
  children?: React.ReactNode
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, className, children }) => {
  return (
    <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
      {isLoading
        ? (
          <div className='flex items-center gap-4'>
            <Image
              src='/assets/icons/loader.svg'
              alt='loader icon'
              width={24}
              height={24}
              className='animate-spin'
            />
            <p>Loading ...</p>
          </div>
          )
        : (
            children
          )}
    </Button>
  )
}

export default SubmitButton
