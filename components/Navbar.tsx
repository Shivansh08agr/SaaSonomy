import { auth, signOut, signIn } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = async () => {
    const session = await auth();
  return (
    <header className='px-5 py-2 font-work-sans bg-white shadow-sm'>
        <nav className='flex justify-between items-center'>
            <Link href="/">
                <Image src="/logo.png" alt="Logo" height={20} width={150} draggable= "false"/>
            </Link>
            <div className='flex items-center gap-5 text-black'>
                {session && session?.user ? (
                    <>
                        <Link href='/startup/create'>
                            <span className='max-sm:hidden cursor-pointer text-primary font-medium hover:underline underline-offset-1 selection:bg-black selection:text-white'>Create</span>
                            <BadgePlus className='size-6 sm:hidden'/>
                        </Link>

                        <form action={async () => {
                            "use server";
                            await signOut({redirectTo: '/'});
                        }}>
                            <button type='submit' className='cursor-pointer max-sm:hidden font-medium hover:underline underline-offset-1 selection:bg-black selection:text-white'>Logout</button>
                            <LogOut className='size-6 sm:hidden text-red-500'/>
                        </form>

                        <Link href={`/user/${session?.id}`}>
                            <Avatar className = 'size-10 hover:shadow-xl select-none'>
                                <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} className = "select-none"/>
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                        </Link>
                    </>
                ) : (
                    <form action={async () => {
                        "use server";
                        await signIn('github');
                    }}>
                    <button type='submit' className='cursor-pointer'>
                        Login
                    </button>
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar