import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/owner.actions'

const Registration = async ({ params: { userId } }: SearchParamProps): Promise<React.ReactNode> => {
  const user = await getUser(userId)

  return (
    <div className='flex h-screen max-h-screen'>
      {/* To do: OTP VERF */}
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[496px] '>
          <div className='flex !flex-row gap-2'>
            <Image
              src='/assets/icons/logo-vet.svg'
              width={1000}
              height={1000}
              alt='Vet Logo'
              className='mb-12 h-10 w-fit'
            />
            <h1 className='text-xl font-bold text-white mb-4 relative top-1'>
              VetApp
            </h1>
          </div>

          <RegisterForm user={user} />

          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>© 2024 VetApp.</p>
            <Link href='/?admin=true' className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/register-img.png'
        height={1000}
        width={1000}
        alt='patient'
        className='side-img max-w-[390px]'
      />
    </div>
  )
}

export default Registration
