import "./tag.css"

export default function Tag({
  tag,
  onTagSelect,
  marginTop = ".875em",
  transitionId,
}) {
  return (
    <>
      {onTagSelect && (
        <input
          type="checkbox"
          checked={tag.selected}
          onChange={onTagSelect}
          className={onTagSelect && "tag"}
          id={`tag-${tag.name}`}
          value={tag.name}
        />
      )}
      <label
        className="tag-label"
        htmlFor={onTagSelect && `tag-${tag.name}`}
        style={{
          marginTop,
          viewTransitionName: transitionId
            ? `blog-tag-${tag.name
                .replace(" ", "_")
                .replace(".", "_")}-${transitionId}`
            : undefined,
        }}
      >
        <span
          className="tag-name"
          style={{
            borderRadius: tag.count != null ? ".25em 0 0 .25em" : ".25em",
          }}
        >
          {tag.name}
        </span>
        {tag.count && <div className="tag-count">{tag.count}</div>}
      </label>
    </>
  )
}
