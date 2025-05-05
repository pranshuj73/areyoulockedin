import { DetailModal } from "../details";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 text-sm h-18 w-full p-6 sm:p-8 bg-background border-t-2 border-dashed z-50">
      <div className="flex justify-between items-center set-mw-center h-full">
        <DetailModal />
        <p>areyoulockedin © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
