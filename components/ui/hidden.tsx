import { VisuallyHidden } from '@radix-ui/react-visually-hidden';


export default function Hidden({ ...props }: React.ComponentProps<typeof VisuallyHidden>) {
  return (
    <VisuallyHidden {...props} />
  )
}
