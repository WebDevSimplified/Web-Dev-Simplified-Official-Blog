import React from "react"
import "./CSSFloat.css"

export default function CSSClear({
  clear,
  heightLeft = 200,
  heightRight = 100,
}) {
  return (
    <div class={`wrapper clearfix`}>
      <img
        className="img"
        style={{ float: "left" }}
        src={`https://dummyimage.com/100x${heightLeft}`}
        alt="Dummy"
      />
      <img
        className="img"
        style={{ float: "right" }}
        src={`https://dummyimage.com/100x${heightRight}`}
        alt="Dummy"
      />
      <p className="p" style={{ clear: clear }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit in
        libero odit, dignissimos corrupti dolore voluptatibus praesentium
        sapiente corporis nam aspernatur consequuntur reprehenderit dolorem
        voluptate! Soluta, perferendis nam quibusdam sunt culpa eius id
        voluptate iste dolor eaque odio, recusandae velit nemo corrupti
        reprehenderit? Ex deleniti deserunt fugiat velit repellat corporis. Ex
        deleniti deserunt fugiat velit repellat corporis.
      </p>
    </div>
  )
}
