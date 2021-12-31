export default function Icon({ path, color }) {
  return (
    <svg viewBox="0 0 64 64" width="40" height="40">
      <circle cx="32" cy="32" r="31" fill={color} />
      <path d={path} fill="white" />
    </svg>
  )
}
