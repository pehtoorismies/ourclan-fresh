import { defineRoute } from '$fresh/server.ts'
import { Navigation } from '/components/Navigation.tsx'
import { getClient } from '/utils/cms.ts'
import { AlbumDocument } from '/types.generated.ts'
import { ImageCard } from '/components/ImageCard.tsx'
import { WithSession } from '$fresh-session'
import * as uuid from 'https://deno.land/std@0.207.0/uuid/mod.ts'
import IconX from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx'
import IconChevronLeft from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/chevron-left.tsx'
import IconChevronRight from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/chevron-right.tsx'
import classnames from 'https://deno.land/x/classnames@0.1.1/index.ts'

interface Dimensions {
  height: number
  width: number
}

interface AlbumImage {
  id: string
  title: string
  image: {
    small: {
      url: string
      dimensions: Dimensions
    }
    medium: {
      url: string
      dimensions: Dimensions
      bg: string
    }
  }
  nextImageId: string | undefined
  prevImageId: string | undefined
}

interface Album {
  image: {
    url: string
  }
  title: string
  images: AlbumImage[]
}

const getBgImageStyle = (url: string) => `bg-[url('${url}')]`

const formatAlbum = (album: AlbumDocument): Album => {
  const getImageId = (index: number) => {
    const id = album.data.images[index]?.image?.id
    return id ?? undefined
  }

  return {
    title: album.data.albumtitle[0]?.text ?? '',
    image: {
      url: album.data.mainimage.small.url ?? '',
    },
    images: album.data.images.map((img, index) => {
      return {
        id: img.image.id ?? uuid.v1.generate() as string,
        title: img.imagetitle[0]?.text ?? '',
        image: {
          small: {
            dimensions: {
              height: img.image.small.dimensions?.height ?? 0,
              width: img.image.small.dimensions?.width ?? 0,
            },
            url: img.image.small.url ?? '',
          },
          medium: {
            dimensions: {
              height: img.image.medium.dimensions?.height ?? 0,
              width: img.image.medium.dimensions?.width ?? 0,
            },
            url: img.image.medium.url ?? '',
            bg: getBgImageStyle(img.image.medium.url ?? ''),
          },
        },
        nextImageId: getImageId(index + 1),
        prevImageId: getImageId(index - 1),
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
    return new Response(undefined, {
      status: 302,
      headers: { Location: '/members' },
    })
  }

  const result = await loadAlbums(ctx.params.slug)
  if (!result) {
    return ctx.renderNotFound()
  }

  const album = formatAlbum(result)

  const bgImage = getBgImageStyle(album.image.url)

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
              imageUrl={image.small.url}
              href={`#${id}`}
            />
          )
        })}
      </div>

      {album.images.map(({ title, image, id, nextImageId, prevImageId }) => {
        return (
          <div
            id={id}
            class='hidden target:block fixed inset-0 bg-black/90 z-[10]'
          >
            <a
              href='#'
              class='bg-yellow-500 p-3 text-black absolute right-0 top-0 m-3 z-[13] rounded'
            >
              <IconX class='w-6 h-6' />
            </a>
            <div
              style={`background-image: url("${image.medium.url}");`}
              class='h-[100vh] bg-center bg-no-repeat bg-contain bg-origin-content flex flex-col items-center py-5'
            >
              <div class='text-white bg-black/50 px-2 py-1 rounded-sm '>
                {title}
              </div>
              <div class='flex-1 w-full items-center justify-between flex'>
                <a
                  href={`#${prevImageId}`}
                  class={`${
                    classnames({ 'invisible': !prevImageId })
                  } py-6 pr-8 hover:text-slate-400  text-white`}
                >
                  <IconChevronLeft class='ml-1 md:w-10 md:h-10 rounded my-3' />
                </a>
                <a
                  href={`#${nextImageId}`}
                  class={`${
                    classnames({ 'invisible': !nextImageId })
                  } py-6 pl-8 hover:text-slate-400 text-white`}
                >
                  <IconChevronRight class='mr-1 md:w-10 md:h-10  rounded my-3' />
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
})
