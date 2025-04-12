"use client"

import { UserButton, } from '@clerk/nextjs'
import { KeyRoundIcon } from 'lucide-react';
import { SessionKeyField } from './session-key-field';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import Image from 'next/image';

const extensionData = [
  { name: "Neovim", img: "/assets/logos/neovim.svg", link: "https://github.com/voltycodes/areyoulockedin.nvim" },
  { name: "VSCode", img: "/assets/logos/vscode.svg", link: "https://marketplace.visualstudio.com/items?itemName=SatyanshMittal.locked-in-vs-extension" }
]

const SessionKeyIcon = () => (
  <KeyRoundIcon className='text-current size-4' />
)

export default function NavUserButton() {
  return (
    <UserButton fallback={<Skeleton className='size-7 rounded-full' />}>
      <UserButton.MenuItems>
        <UserButton.Action label="Session Key" labelIcon={<SessionKeyIcon />} open="session-key" />
      </UserButton.MenuItems>

      <UserButton.UserProfilePage label="Session Key" labelIcon={<SessionKeyIcon />} url="session-key">
        <div>
          <h1 className='font-semibold'>Session Key</h1>
          <hr className='opacity-10 my-4' />
          <p className='mb-6'>Here you can find and copy your session key to use in your extension.</p>

          <SessionKeyField />
        </div>

        <div className='mt-18'>
          <h1 className='font-semibold'>Download Extensions</h1>
          <hr className='opacity-10 my-4' />
          <p className='mb-6'>Download extensions for VSCode / Neovim to join the leaderboard.</p>

          <div className='flex items-center gap-2'>
            {extensionData.map((extension, index) => (
              <Badge key={index} className='rounded-md text-lg' asChild>
                <Link href={extension.link} target="_blank" className='flex items-center gap-2'>
                  <Image src={extension.img} alt={extension.name} className='size-5' width={32} height={32} />
                  {extension.name}
                </Link>
              </Badge>
            ))}
          </div>
        </div>

      </UserButton.UserProfilePage>
    </UserButton>
  )
}
