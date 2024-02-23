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
  uid: string
}

const formatAlbums = (albums: AlbumDocument[]): Album[] => {
  return albums.toSorted((a, b) => {
    const aNum = Number(a.data.order?.toString())
    const bNum = Number(b.data.order?.toString())

    if (aNum > bNum) {
      return 1
    } else if (aNum < bNum) {
      return -1
    } else {
      return 0
    }
  }).map((a) => {
    return {
      title: a.data.albumtitle[0]?.text ?? '',
      image: {
        url: a.data.mainimage.small.url ?? '',
      },
      uid: a.uid,
    }
  })
}

export default defineRoute<WithSession>(async (req, ctx) => {
  const { session } = ctx.state

  if (!session.get('isLoggedIn')) {
    const url = new URL(req.url)
    url.pathname = '/members'
    return Response.redirect(url)
  }

  const result = await getClient().getAllByType('album')
  const albums = formatAlbums(result)

  return (
    <div>
      <Navigation isLoggedIn />
      <h1 class='text-3xl py-4'>Albumit</h1>
      <div class='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2'>
        {albums.map(({ title, uid, image }) => (
          <ImageCard
            key={uid}
            title={title}
            imageUrl={image.url}
            href={`/members/albums/${uid}`}
          />
        ))}
      </div>
    </div>
  )
})
