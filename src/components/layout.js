import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  componentDidMount() {
    const form = document.body.querySelector('.formkit-sticky-bar')
    if (form == null) {
      const script = document.createElement("script")

      script.src = "https://web-dev-simplified.ck.page/23989b36d2/index.js"
      script.async = true
      script.dataset.uid = '23989b36d2'
  
      document.body.prepend(script)
    }
  }

  componentWillUnmount() {
    const script = document.querySelector('[src="https://web-dev-simplified.ck.page/23989b36d2/index.js"]')
    if (script != null) script.remove()
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        {/* TODO: Maybe put social in footer? */}
      </div>
    )
  }
}

export default Layout
