import React from "react"
import { Link, navigate } from "gatsby"
import qs from "qs"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  componentDidMount() {
    const form = document.body.querySelector('.formkit-sticky-bar')
    const queryParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    if (queryParams.fromNewsletter === 'true') {
      navigate(this.props.location.pathname)
      localStorage.setItem('subscribed-to-newsletter', true)
    }

    if (queryParams.fromNewsletter === 'false') {
      navigate(this.props.location.pathname)
      localStorage.removeItem('subscribed-to-newsletter')
    }
      
    if (form == null && JSON.parse(localStorage.getItem('subscribed-to-newsletter')) !== true) {
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
