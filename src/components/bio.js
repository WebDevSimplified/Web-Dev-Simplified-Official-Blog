/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Image from "gatsby-image"
import { rhythm } from "../utils/typography"

const Bio = ({ name, image }) => {
  return (
    <div
      style={{
        display: `flex`,
        alignItems: "center",
        marginBottom: rhythm(1),
      }}
    >
      <Image
        fixed={image.childImageSharp.fixed}
        alt={name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div>{name}</div>
    </div>
  )
}

export default Bio
