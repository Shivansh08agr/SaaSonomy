import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'
import { client } from '@/sanity/lib/client'
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import { Skeleton } from './ui/skeleton'

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author};

const StartupCard = async ({post} : {post: StartupTypeCard}) => {
    const {_id, _createdAt, views, author, title, description, category, image} = post;
  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='starup_card_date selection:bg-black selection:text-white'>
                {formatDate(_createdAt)}
            </p>
            <div className="flex gap-1.5">
                <EyeIcon className='size-6 text-primary'/>
                <span className='text-16-medium  selection:bg-black selection:text-white'>{views}</span>
            </div>
        </div>
        <div className='flex-between mt-5 gap-5'>
            <div className='flex-1'>
                <Link href={`/user/${author?._id}`}>
                    <p className='text-16-medium line-clamp-1  selection:bg-black selection:text-white'>{author?.name}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className='text-26-semibold line-clamp-1  selection:bg-black selection:text-white'>{title}</h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
                <Image src= {author?.image!} alt= {author?.name!} width={48} height={48} className='rounded-full  selection:bg-black selection:text-white'/>
            </Link>
        </div>
        <Link href={`/startup/${_id}`}>
            <p className='startup-card-desc  selection:bg-black selection:text-white'>
                {description}
            </p>
            <img src={image} alt="placeholder" className='startup-card_img' />
        </Link>
        <div className='flex-between gap-3 mt-5'>
            <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className="text-16-medium  selection:bg-black selection:text-white">{category}</p>
            </Link>
            <Button className='startup-card_btn' asChild>
                <Link href={`/startup/${_id}`}>
                    Details
                </Link>
            </Button>
        </div>
    </li>
  )
}
export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard