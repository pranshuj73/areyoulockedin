import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 h-18 w-full bg-background flex justify-between items-center p-4 border-t-2 border-dashed z-50">
      <p className="hidden md:block text-sm">
        made with {'<3'} by {' '}
        <Link className="text-blue-600 dark:text-blue-200 border-b border-dashed pb-0.5 border-current" href="https://x.com/voltycodes" target="_blank">@voltycodes</Link> {' '}
        & {' '}
        <Link className="text-blue-600 dark:text-blue-200 border-b border-dashed pb-0.5 border-current" href="https://x.com/satyansh_mittal" target="_blank">@satyansh_mittal</Link>
      </p>
      <p className="text-sm">areyoulockedin © {new Date().getFullYear()}</p>
    </footer>
  )
}
