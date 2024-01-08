import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'

const app = new Hono()

app.all(
  '*',
  jsxRenderer(({ children }) => {
    return (
      <html>
        <link href="/static/style.css" rel="stylesheet" />
        <body>
          <header>
            <a href="/">top</a> &nbsp;
            <a href="/foo">foo</a>
          </header>
          <main>{children}</main>
        </body>
      </html>
    )
  })
)

app.get('/', (c) => {
  return c.render(<h1>Hello Hono🔥</h1>)
})

app.get('/foo', (c) => {
  return c.render(<h1>Foooooo</h1>)
})

export default app
