import React from "react"
import "./CSSFloat.css"

export default function CSSFloat({
  float,
  clearfix,
  border,
  height = 200,
  text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit in libero odit, dignissimos corrupti dolore voluptatibus praesentium sapiente corporis nam aspernatur consequuntur reprehenderit dolorem voluptate! Soluta, perferendis nam quibusdam sunt culpa eius id voluptate iste dolor eaque odio, recusandae velit nemo corrupti reprehenderit? Ex deleniti deserunt fugiat velit repellat corporis. Ex deleniti deserunt fugiat velit repellat corporis.",
}) {
  return (
    <div class={`wrapper ${border && "border"} ${clearfix && "clearfix"}`}>
      <img
        className="img"
        style={{ float: float }}
        src={`https://dummyimage.com/200x${height}`}
        alt="Dummy Image"
      />
      <p className="p">{text}</p>
    </div>
  )
}
