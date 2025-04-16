import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 text-sm h-18 w-full bg-background border-t-2 border-dashed z-50">
      <div className="flex justify-between items-center p-4 set-mw-center h-full">
        <Link
          className="text-blue-600 dark:text-blue-200 border-b border-dashed pb-0.5 border-current"
          href={"https://buymeacoffee.com/mittalsatyansh"}
          target="_blank"
        >
          [help pay our server costs ;-;]
        </Link>
        {/* <p className="hidden md:block text-sm"> */}
        {/*   made with {'<3'} by {' '} */}
        {/*   <Link className="text-blue-600 dark:text-blue-200 border-b border-dashed pb-0.5 border-current" href="https://x.com/voltycodes" target="_blank">@voltycodes</Link> {' '} */}
        {/*   & {' '} */}
        {/*   <Link className="text-blue-600 dark:text-blue-200 border-b border-dashed pb-0.5 border-current" href="https://x.com/satyansh_mittal" target="_blank">@satyansh_mittal</Link> */}
        {/* </p> */}
        <p>areyoulockedin © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
