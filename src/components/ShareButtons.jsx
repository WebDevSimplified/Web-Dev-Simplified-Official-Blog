import FacebookButton from "./shareButtons/FacebookButton"
import TwitterButton from "./shareButtons/TwitterButton"
import LinkedInButton from "./shareButtons/LinkedInButton"
import RedditButton from "./shareButtons/RedditButton"
import WhatsappButton from "./shareButtons/WhatsappButton"
import EmailButton from "./shareButtons/EmailButton"
import NativeShareButton from "./shareButtons/NativeShareButton"
import "./shareButtons.css"

export default function ShareButtons({
  title,
  url,
  twitterHandle,
  tags,
  siteUrl,
}) {
  return (
    <div>
      <FacebookButton url={url} />
      <TwitterButton
        url={url}
        title={title}
        via={twitterHandle}
        hashtags={tags}
      />
      <LinkedInButton url={url} title={title} source={siteUrl} />
      <RedditButton url={url} title={title} />
      <WhatsappButton url={url} title={title} />
      <EmailButton url={url} subject={title} />
      <NativeShareButton url={url} title={title} />
    </div>
  )
}
