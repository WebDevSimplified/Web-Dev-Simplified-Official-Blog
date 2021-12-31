import Icon from "./Icon"

export default function EmailButton({ url, subject }) {
  const mailUrl = `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(url)}`
  return (
    <a href={mailUrl} className="share-icon">
      <Icon
        color="#7f7f7f"
        path="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"
      />
    </a>
  )
}
