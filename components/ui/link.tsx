import NextJSLink from 'next/link'

interface linkProps {
  href: string
  className?: string
  target?: string
  children: React.ReactNode
  external?: boolean
}

export default function Link({href, className, target, children, external}: linkProps) {
  return (
    <NextJSLink
      className={`pb-0.5 text-blue-700 dark:text-blue-300 border-b border-transparent border-dashed hover:border-blue-700 dark:hover:border-blue-300 ${className} duration-300 transition-all ease-in-out`}
      href={href}
      target={external ? '_blank' : target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </NextJSLink>
  )
}
