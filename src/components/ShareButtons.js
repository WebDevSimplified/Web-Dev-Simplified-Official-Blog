import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share"
import "./shareButtons.css"

const ShareButtons = ({ title, url, twitterHandle, tags, siteUrl }) => {
  return (
    <div>
      <FacebookShareButton url={url} className="share-icon">
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <TwitterShareButton
        className="share-icon"
        url={url}
        title={title}
        via={twitterHandle}
        hashtags={tags}
      >
        <TwitterIcon size={40} round={true} className="share-icon" />
      </TwitterShareButton>

      <LinkedinShareButton
        url={url}
        title={title}
        source={siteUrl}
        className="share-icon"
      >
        <LinkedinIcon size={40} round={true} />
      </LinkedinShareButton>

      <RedditShareButton url={url} title={title} className="share-icon">
        <RedditIcon size={40} round={true} />
      </RedditShareButton>

      <WhatsappShareButton url={url} title={title} className="share-icon">
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>

      <EmailShareButton url={url} subject={title} className="share-icon">
        <EmailIcon size={40} round={true} />
      </EmailShareButton>
    </div>
  )
}
export default ShareButtons
