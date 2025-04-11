"use client"

import { UserButton, } from '@clerk/nextjs'
import { KeyRoundIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SessionKeyField } from './session-key-field';
import { Skeleton } from '@/components/ui/skeleton';

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
        <h1 className='font-semibold'>Session Key</h1>
        <hr className='opacity-10 my-4' />
        <p className='mb-6'>Here you can find and copy your session key to be used in your extension.</p>

        <SessionKeyField/>
      </UserButton.UserProfilePage>
    </UserButton>
  )
}
