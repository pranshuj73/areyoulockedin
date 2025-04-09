import {
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import ThemeToggleButton from "./theme-toggle-btn";
import NavUserButton from './nav-user-button';
import { Button } from '../ui/button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 h-18 w-full backdrop-blur-2xl flex justify-between items-center p-4 border-b-2 border-dashed z-50">
      <h1 className="text-lg font-semibold">areyoulockedin?</h1>
      <div className="flex items-center justify-center gap-2">
        <SignedOut>
          <Button variant="outline" asChild>
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
