import { useState, useEffect } from "react"
import { calculate } from "specificity/dist/specificity.mjs"

const WRAPPER_STYLES = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const CONTAINER_STYLES = {
  display: "flex",
  margin: "auto 0",
  width: "100%",
  justifyContent: "center",
}

const NUMBER_WRAPPER_STYLES = {
  margin: ".6rem",
  textAlign: "center",
  flexGrow: "1",
  flexBasis: "2.5em",
  maxWidth: "2.5em",
  fontSize: "2.5rem",
}

const NUMBER_STYLES = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: ".3em",
  width: "100%",
  height: "2.5em",
  color: "var(--theme-text)",
  fontVariantNumeric: "tabular-nums lining-nums",
}

const NUMBER_DESCRIPTOR_STYLES = {
  color: "var(--theme-text-lighter)",
  fontSize: ".75rem",
}

const INPUT_STYLES = {
  marginTop: ".5rem",
  width: "100%",
  background: "var(--theme-code-bg)",
  fontSize: "1.25rem",
  border: ".05em solid var(--theme-code-bg)",
  padding: ".5em",
  fontFamily: "Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace",
}

const DETAILS_STYLES = {
  padding: "1rem .5rem",
  width: "100%",
  color: "var(--theme-text)",
}

const ID_COLOR = "var(--theme-blue)"
const CLASS_COLOR = "var(--theme-green)"
const ELEMENT_COLOR = "var(--theme-red)"

export default function CssSpecificityDisplay(props) {
  const {
    showInput = false,
    initialInputText = "",
    initialImportantCount = 0,
    initialIdCount = 0,
    initialClassCount = 0,
    initialElementCount = 0,
  } = props

  const [inputText, setInputText] = useState(initialInputText)
  const [selectorDetails, setSelectorDetails] = useState()
  const [importantCount, setImportantCount] = useState(initialImportantCount)
  const [idCount, setIdCount] = useState(initialIdCount)
  const [classCount, setClassCount] = useState(initialClassCount)
  const [elementCount, setElementCount] = useState(initialElementCount)

  useEffect(() => {
    if (!showInput) return
    const specificity = calculate(inputText)[0]
    let specificityArray = [0, 0, 0, 0]
    let specificityDetails
    if (specificity) {
      specificityArray = specificity.specificityArray
      specificityDetails = specificity.parts.map(part => {
        let type
        if (part.type === "a") type = 1
        if (part.type === "b") type = 2
        if (part.type === "c") type = 3
        return { selector: part.selector, type: type }
      })
    }
    setImportantCount(specificityArray[0])
    setIdCount(specificityArray[1])
    setClassCount(specificityArray[2])
    setElementCount(specificityArray[3])
    setSelectorDetails(specificityDetails)
  }, [inputText, showInput])

  function handleChange(e) {
    setInputText(e.target.value)
  }

  return (
    <div style={WRAPPER_STYLES}>
      <div style={CONTAINER_STYLES}>
        {!showInput && (
          <div style={NUMBER_WRAPPER_STYLES}>
            <div
              style={{
                ...NUMBER_STYLES,
                backgroundColor: "var(--theme-purple)",
                marginLeft: 0,
              }}
            >
              {importantCount}
            </div>
            <div style={NUMBER_DESCRIPTOR_STYLES}>!important</div>
          </div>
        )}
        <div style={NUMBER_WRAPPER_STYLES}>
          <div style={{ ...NUMBER_STYLES, backgroundColor: ID_COLOR }}>
            {idCount}
          </div>
          <div style={NUMBER_DESCRIPTOR_STYLES}>#id</div>
        </div>
        <div style={NUMBER_WRAPPER_STYLES}>
          <div style={{ ...NUMBER_STYLES, backgroundColor: CLASS_COLOR }}>
            {classCount}
          </div>
          <div style={NUMBER_DESCRIPTOR_STYLES}>.class</div>
        </div>
        <div style={NUMBER_WRAPPER_STYLES}>
          <div
            style={{
              ...NUMBER_STYLES,
              backgroundColor: ELEMENT_COLOR,
              marginRight: 0,
            }}
          >
            {elementCount}
          </div>
          <div style={NUMBER_DESCRIPTOR_STYLES}>element</div>
        </div>
      </div>
      {showInput && (
        <input
          className="token selector"
          style={INPUT_STYLES}
          type="text"
          value={inputText}
          onInput={handleChange}
        />
      )}
      {showInput && selectorDetailsDisplay(selectorDetails)}
    </div>
  )
}

function selectorDetailsDisplay(selectorDetails) {
  if (selectorDetails == null) return
  return Object.entries(
    selectorDetails.reduce((result, detail) => {
      return {
        ...result,
        [detail.type]: [...(result[detail.type] || []), detail.selector],
      }
    }, {})
  )
    .sort(([a], [b]) => a - b)
    .map(([type, parts]) => {
      let color
      if (type === "1") color = ID_COLOR
      if (type === "2") color = CLASS_COLOR
      if (type === "3") color = ELEMENT_COLOR
      return (
        <div style={{ ...DETAILS_STYLES, backgroundColor: color }} key={type}>
          {parts.map((part, index) => (
            <div key={index}>
              {index + 1}. <span style={{ paddingLeft: ".35rem" }}>{part}</span>
            </div>
          ))}
        </div>
      )
    })
}
