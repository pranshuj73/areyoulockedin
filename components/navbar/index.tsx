import {
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import ThemeToggleButton from "./theme-toggle-btn";
import NavUserButton from './nav-user-button';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-xl bg-background/80 flex justify-between items-center px-6 py-4 border-b border-border/40 shadow-sm z-50 transition-all duration-300">
      <Link href="/" className="group flex items-center gap-2">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all duration-300">
          areyoulockedin<span className="animate-pulse">?</span>
        </h1>
      </Link>
      <div className="flex items-center gap-3">
        <SignedOut>
          <Button variant="outline" size="sm" className="rounded-md px-4 py-2 hover:bg-primary/10 transition-all duration-300" asChild>
            <SignInButton withSignUp />
          </Button>
        </SignedOut>
        <SignedIn>
          <NavUserButton />
        </SignedIn>
        <ThemeToggleButton />
      </div>
    </nav>
  )
}
