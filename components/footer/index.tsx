import { DetailModal } from "../details";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 text-sm h-18 w-full bg-background border-t-2 border-dashed z-50">
      <div className="flex justify-between items-center p-4 set-mw-center h-full">
        <DetailModal />
        <p>areyoulockedin © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
