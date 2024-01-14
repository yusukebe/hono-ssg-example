import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(
  ({ children }) => {
    return (
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="/static/style.css" rel="stylesheet" />
        </head>
        <body>
          <header>
            <a href="/">top</a> &nbsp;
            <a href="/about">about</a> &nbsp;
            <a href="/shops">shops</a> &nbsp;
          </header>
          <main>{children}</main>
          <footer>
            <address>
              <a href="https://github.com/yusukebe/ramen-api">powered by Ramen API</a>
            </address>
          </footer>
        </body>
      </html>
    )
  },
  { stream: true }
)
