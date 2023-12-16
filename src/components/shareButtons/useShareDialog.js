export default function useShareDialog(url, queryParams = {}) {
  const paramString = Object.entries(queryParams)
    .filter(([key, value]) => value != null)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join("&")

  const urlWithParams = `${url}?${paramString}`

  function openShareDialog({ width = 550, height = 400 } = {}) {
    const config = {
      height,
      width,
      resizable: "no",
      centerScreen: "yes",
      location: "no",
      toolbar: "no",
      status: "no",
      directories: "no",
      menubar: "no",
      scrollbars: "yes",
      left:
        window.outerWidth / 2 +
        (window.screenX || window.screenLeft || 0) -
        width / 2,
      top:
        window.outerHeight / 2 +
        (window.screenY || window.screenTop || 0) -
        height / 2,
    }
    const configString = Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join(", ")
    window.open(urlWithParams, "", configString)
    // navigator.share({ url })
  }

  return { openShareDialog }
}
