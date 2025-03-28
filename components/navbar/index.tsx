import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import ThemeToggleButton from "./theme-toggle-btn";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 h-18 w-full backdrop-blur-2xl flex justify-between items-center p-4 border-b-2 border-dashed z-50">
      <h1 className="text-lg font-semibold">areyoulockedin?</h1>
      <div className="flex items-center justify-center gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeToggleButton />
      </div>
    </nav>
  )
}
