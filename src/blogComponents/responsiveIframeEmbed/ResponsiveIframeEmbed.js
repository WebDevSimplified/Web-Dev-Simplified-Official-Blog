import React from "react"
import "./responsive.css"

export default function ResponsiveIframeEmbed({ url }) {
  return (
    <div className="wrapper">
      <div className="video-container">
        <iframe src={url} title="YouTube Embed"></iframe>
      </div>
    </div>
  )
}
