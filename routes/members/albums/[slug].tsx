import { defineRoute } from '$fresh/server.ts'
import { Navigation } from '/components/Navigation.tsx'
import { getClient } from '/utils/cms.ts'
import { AlbumDocument } from '/types.generated.ts'
import { ImageCard } from '/components/ImageCard.tsx'
import { WithSession } from '$fresh-session'

interface Album {
  image: {
    url: string
  }
  title: string
  images: {
    title: string
    image: {
      url: string
    }
  }[]
}

const formatAlbum = (album: AlbumDocument): Album => {
  return {
    title: album.data.albumtitle[0]?.text ?? '',
    image: {
      url: album.data.mainimage.small.url ?? '',
    },
    images: album.data.images.map((img) => {
      return {
        title: img.imagetitle[0]?.text ?? '',
        image: {
          url: img.image.small.url ?? '',
        },
      }
    }),
  }
}

const loadAlbums = async (slug: string) => {
  try {
    const result = await getClient().getByUID('album', slug)
    return result
  } catch (e) {
    return undefined
  }
}

export default defineRoute<WithSession>(async (req, ctx) => {
  const { session } = ctx.state

  if (!session.get('isLoggedIn')) {
    const url = new URL(req.url)
    url.pathname = '/album'
    return Response.redirect(url)
  }

  const result = await loadAlbums(ctx.params.slug)
  if (!result) {
    return ctx.renderNotFound()
  }

  const album = formatAlbum(result)

  const bgImage = `bg-[url('${album.image.url}')]`

  return (
    <div>
      <Navigation isLoggedIn />
      <div
        className={`h-40 bg-no-repeat ${bgImage} bg-cover flex justify-center items-center`}
      >
        <h1 className='text-3xl text-center'>
          Albumi: {album.title}
        </h1>
      </div>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-8 items-center'>
        {album.images.map(({ title, image }) => {
          return (
            <ImageCard
              title={title}
              imageUrl={image.url}
              href='#'
            />
          )
        })}
      </div>
    </div>
  )
})
