import { defineRoute } from '$fresh/server.ts'
import { Navigation } from '/components/Navigation.tsx'
import { getClient } from '/utils/cms.ts'
import { AlbumDocument } from '/types.generated.ts'
import { ImageCard } from '/components/ImageCard.tsx'
import { WithSession } from '$fresh-session'
import * as uuid from 'https://deno.land/std@0.207.0/uuid/mod.ts'
import IconX from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx'

interface AlbumImage {
  id: string
  title: string
  image: {
    url: string
  }
}

interface Album {
  image: {
    url: string
  }
  title: string
  images: AlbumImage[]
}

const formatAlbum = (album: AlbumDocument): Album => {
  return {
    title: album.data.albumtitle[0]?.text ?? '',
    image: {
      url: album.data.mainimage.small.url ?? '',
    },
    images: album.data.images.map((img) => {
      return {
        id: img.image.id ?? uuid.v1.generate() as string,
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
    <>
      <Navigation isLoggedIn />
      <div
        class={`h-40 bg-no-repeat ${bgImage} bg-cover flex justify-center items-center`}
      >
        <h1 class='text-3xl text-center'>
          Albumi: {album.title}
        </h1>
      </div>
      <div class='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-8 items-center'>
        {album.images.map(({ title, image, id }) => {
          return (
            <ImageCard
              title={title}
              imageUrl={image.url}
              href={`#${id}`}
            />
          )
        })}
      </div>
      {album.images.map(({ title, image, id }) => {
        return (
          <div
            id={id}
            class='hidden target:block fixed inset-0 p-10 bg-black/90 overflow-auto z-[10]'
          >
            <a
              href='#'
              class='bg-white p-3 text-black absolute right-0 top-0 m-3'
            >
              <IconX class='w-6 h-6' />
            </a>
            <div class='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
              <img
                src={image.url}
                alt='Gambar Kucing'
              />
              <div class='text-white'>{title}</div>
              <a href='#'>
                <button class='flex-1 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded my-3'>
                  Sulje
                </button>
              </a>
            </div>
          </div>
        )
      })}
    </>
  )
})
