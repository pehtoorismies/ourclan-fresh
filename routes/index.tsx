import { defineRoute, Handlers, PageProps } from '$fresh/server.ts'
import { asHTML, Content, createClient } from '@prismicio/client'
import { Navigation } from '/components/Navigation.tsx'
import { getCookies } from '$std/http/cookie.ts'
import { client } from '/utils/cms.ts'
import { CtxState } from '/types/ctx-state.ts'
import { WithSession } from '$fresh-session'

interface Displayable {
  image: {
    url: string
    dimensions: { width: number; height: number }
  }
  title: string
  descriptionHMTL: string
}

interface Content {
  blocks: Displayable[]
  isLoggedIn: boolean
}

const mapToBlock = (
  { contentblock }: Content.FrontPageDocumentData,
): Displayable[] => {
  return contentblock.map((c) => {
    return {
      title: c.title[0]?.text ?? '',
      descriptionHMTL: asHTML(c.description),
      image: {
        url: c.image.url ?? '',
        dimensions: c.image.dimensions ?? { height: 0, width: 0 },
      },
    }
  })
}

export const handler: Handlers<Content, CtxState> = {
  async GET(req, ctx) {
    const [front] = await client.getAllByType('front-page')
    const displayable = mapToBlock(front.data)
    const cookies = getCookies(req.headers)

    return ctx.render({
      blocks: displayable,
      isLoggedIn: ctx.state.isLoggedIn,
    })
  },
}

const FrontPageBlock = ({ title, descriptionHMTL, image }: Displayable) => {
  return (
    <div className='my-4'>
      <div className='flex flex-wrap justify-center items-center'>
        <div className='grow w-96'>
          <h2 className='font-playfair text-2xl my-4'>{title}</h2>
          <div
            className='bg-white mr-4 cms'
            dangerouslySetInnerHTML={{ __html: descriptionHMTL }}
          />
        </div>
        <img
          className='my-4 flex-none w-96 border-2 p-2'
          src={image.url}
          alt='Vaakuna'
        />
      </div>
    </div>
  )
}

export default defineRoute<WithSession>(async (req, ctx) => {
  const { session } = ctx.state
  const [front] = await client.getAllByType('front-page')
  const blocks = mapToBlock(front.data)

  return (
    <>
      <Navigation isLoggedIn={!!session.get('isLoggedIn')} />
      <main>
        <div className='bg-gradient-to-r from-slate-200 to-slate-400 dark:bg-zinc-800 p-4'>
          <div className='container mx-auto'>
            <div className='flex justify-between items-center h-50 flex-wrap'>
              <img
                className='w-20'
                src='images/vaakuna_small.png'
                alt='Vaakuna'
              />
              <h1 className='font-playfair text-3xl'>Suvun historiaa</h1>
              <img
                className='w-20'
                src='/images/vaakuna.png'
                alt='Vaakuna'
              />
            </div>
          </div>
        </div>
        <div className='bg-white my-3'>
          <div className='container mx-auto p-4 '>
            {blocks.map((b) => {
              return <FrontPageBlock key={b.title} {...b} />
            })}
          </div>
        </div>
      </main>
    </>
  )
})