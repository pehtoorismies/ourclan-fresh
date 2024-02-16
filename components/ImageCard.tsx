interface Props {
  title: string
  imageUrl: string
  href?: string
}

export const ImageCard = ({ title, imageUrl, href }: Props) => {
  const content = (
    <div class='zoom rounded overflow-hidden shadow-lg border-2 p-1 hover:border-blue-600 hover:text-blue-400'>
      <img src={imageUrl} class='w-full' />
      <div class='px-6 py-4 text-center'>
        <div class='font-semibold text-lg mb-2'>{title}</div>
      </div>
    </div>
  )

  return href ? <a href={href}>{content}</a> : content
}
