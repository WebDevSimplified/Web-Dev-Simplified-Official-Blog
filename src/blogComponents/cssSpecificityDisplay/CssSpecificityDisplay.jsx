import { useState, useEffect } from "preact/hooks"
import { calculate } from "specificity/dist/specificity.mjs"

const WRAPPER_STYLES = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const CONTAINER_STYLES = {
  display: "flex",
}

const NUMBER_WRAPPER_STYLES = {
  margin: ".6rem",
  textAlign: "center",
}

const NUMBER_STYLES = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: ".3em",
  fontSize: "2.5rem",
  width: "2.5em",
  height: "2.5em",
  color: "white",
  fontVariantNumeric: "tabular-nums lining-nums",
}

const NUMBER_DESCRIPTOR_STYLES = {
  color: "#777",
}

const INPUT_STYLES = {
  marginTop: ".5rem",
  width: "100%",
  background: "#333",
  fontSize: "1.25rem",
  border: ".05em solid #333",
  padding: ".5em",
  fontFamily: "Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace",
}

const DETAILS_STYLES = {
  padding: "1rem .5rem",
  width: "100%",
  color: "white",
}

const ID_COLOR = "#2F80ED"
const CLASS_COLOR = "#27AE60"
const ELEMENT_COLOR = "#AE3838"

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
                backgroundColor: "#9B51E0",
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
          class="token selector"
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
