import { Hono } from 'hono'
import { ssgParams } from 'hono/ssg'
import { renderer } from './renderer'
import { getShops, getShop } from './app'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>😘🍜</h1>)
})

app.get('/about', (c) => {
  return c.render(
    <div>
      <h1>これは何？</h1>
      <p>このページは🍜についてのページです</p>
    </div>
  )
})

app.get('/shops', async (c) => {
  const shops = await getShops()
  return c.render(
    <div>
      <h1>ラーメン屋さん</h1>
      <ul>
        {shops.map((shop) => {
          return (
            <li>
              <a href={`/shops/${shop.id}`}>{shop.name}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
})

app.get(
  '/shops/:id',
  ssgParams(async () => {
    const shops = await getShops()
    return shops.map((shop) => ({ id: shop.id }))
  }),
  async (c) => {
    const shop = await getShop(c.req.param('id'))
    if (!shop) {
      return c.notFound()
    }
    return c.render(
      <div>
        <h1>{shop.name}</h1>
        {shop.photos ? (
          <p>
            {shop.photos.map((photo) => {
              return (
                <p>
                  <img src={photo.url} width={photo.width / 5} height={photo.height / 5} />
                  <br />
                  <small>Photo by {photo.authorId}</small>
                </p>
              )
            })}
          </p>
        ) : (
          <></>
        )}
      </div>
    )
  }
)

app.notFound((c) => c.text('🍜 not found', 404))

app.get('/404', (c) => c.notFound())

export default app
