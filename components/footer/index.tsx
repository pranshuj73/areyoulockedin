import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center px-6 py-4 border-t border-border/40 shadow-sm z-50 transition-all duration-300">
      <div className="flex items-center gap-2 md:gap-1 mb-2 md:mb-0">
        <p className="text-sm text-muted-foreground">
          made with <span className="text-red-500 animate-pulse">♥</span> by{' '}
          <Link 
            className="text-primary hover:text-primary/80 border-b border-dashed pb-0.5 border-current transition-colors duration-200" 
            href="https://x.com/voltycodes" 
            target="_blank"
          >
            @voltycodes
          </Link>{' '}
          &{' '}
          <Link 
            className="text-primary hover:text-primary/80 border-b border-dashed pb-0.5 border-current transition-colors duration-200" 
            href="https://x.com/satyansh_mittal" 
            target="_blank"
          >
            @satyansh_mittal
          </Link>
        </p>
      </div>
      <p className="text-sm text-muted-foreground">areyoulockedin © {new Date().getFullYear()}</p>
    </footer>
  )
}
