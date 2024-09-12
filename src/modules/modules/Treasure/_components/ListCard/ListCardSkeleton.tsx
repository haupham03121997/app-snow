import { Skeleton } from '@components/ui/skeleton'

const ListCardSkeleton = () => {
  return (
    <>
      <Skeleton className='h-[44px] w-full rounded-md' />
      <div className='grid grid-cols-2 gap-3 mt-2'>
        {Array.from({ length: 8 }).map((_, index) => {
          return (
            <div
              key={`list-card-skeleton-${index}`}
              className='rounded-lg  bg-black px-2 py-3 overflow-hidden flex flex-col gap-3'
            >
              <div className='flex gap-2'>
                <Skeleton className='w-10 h-10 rounded-sm' />
                <div className='flex flex-col gap-2 flex-1'>
                  <Skeleton className='w-full h-5 rounded-md' />
                  <Skeleton className='w-full h-2 rounded-md' />
                  <Skeleton className='w-1/3 h-2 rounded-md' />
                  <div className='flex items-center gap-1'>
                    <Skeleton className='w-4 h-4 rounded-sm' />
                    <span className='text-gray-500 text-xs'>
                      <Skeleton className='w-8 h-4 rounded-sm' />
                    </span>
                  </div>
                </div>
              </div>
              <div className='h-[1.5px] bg-gray-700'></div>
              <div className='flex items-center gap-2'>
                <Skeleton className='w-10 h-2 rounded-md' />
                <Skeleton className='w-10 h-3 rounded-md' />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ListCardSkeleton
