import useShareDialog from "./useShareDialog"
import Icon from "./Icon"

export default function LinkedInButton({ url, title, source }) {
  const { openShareDialog } = useShareDialog(
    "https://linkedin.com/shareArticle",
    {
      url,
      mini: true,
      title,
      source,
    }
  )

  return (
    <button
      className="share-icon"
      aria-label="Share On LinkedIn"
      onClick={() => openShareDialog({ width: 750, height: 600 })}
    >
      <Icon
        color="#007fb1"
        path="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
      />
    </button>
  )
}
