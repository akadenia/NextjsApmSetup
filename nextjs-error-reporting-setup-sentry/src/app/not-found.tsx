import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex h-[calc(100vh-80px)] w-full items-center justify-center bg-white p-5'>
      <div className='text-center'>
        <div className='inline-flex rounded-full bg-yellow-100 p-4'>
          <div className='rounded-full bg-yellow-200 stroke-yellow-600 p-4'>
            <svg
              className='h-16 w-16'
              viewBox='0 0 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        <h1 className='mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]'>
          Page not found
        </h1>
        <p className='mt-5 text-slate-600 lg:text-lg'>
          Looks like you lost your way. No need to feel bad, it happens to the
          best of us.
        </p>
        <p className='mt-5 text-slate-600 lg:text-lg'>
          Just visit our homepage to get where you need to go.
        </p>
        <div className='my-4'>
          <Link
            className='rounded-lg bg-black px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-cyan-800'
            href='/'
          >
            Take Me There
          </Link>
        </div>
      </div>
    </div>
  )
}
