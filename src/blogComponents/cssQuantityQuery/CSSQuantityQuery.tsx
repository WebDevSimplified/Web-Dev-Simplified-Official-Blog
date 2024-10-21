import { useState } from "react"
import styles from "./cssQuantityQuery.module.css"

const queryTypes = ["≥", "≤", "Between"] as const
type QueryType = (typeof queryTypes)[number]

export default function CSSQuantityQuery({
  hideForm = false,
  showQuery = false,
  initialQueryType = "≥",
  initialAmount = 3,
  initialAmount2 = 5,
  initialBoxCount = 2,
}: {
  hideForm?: boolean
  showQuery?: boolean
  initialQueryType?: QueryType
  initialAmount?: number
  initialAmount2?: number
  initialBoxCount?: number
}) {
  const [queryType, setQueryType] = useState<QueryType>(initialQueryType)
  const [amount, setAmount] = useState(initialAmount)
  const [amount2, setAmount2] = useState(initialAmount2)
  const [boxCount, setBoxCount] = useState(initialBoxCount)

  return (
    <div
      style={{
        margin: "1rem",
        padding: "1rem",
        border: "1px dashed var(--theme-text-lighter)",
      }}
    >
      <div
        style={{
          display: hideForm ? "none" : "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: showQuery ? "0.5rem" : "1.5rem",
        }}
      >
        <FormGroup label="Query Type" htmlFor="queryType">
          <select
            id="queryType"
            value={queryType}
            onChange={e => setQueryType(e.target.value as QueryType)}
            style={{ width: "100%", fontSize: "1em" }}
          >
            {queryTypes.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </FormGroup>
        <FormGroup
          htmlFor="amount"
          label={queryType === "Between" ? "Min" : "Amount"}
        >
          <input
            id="amount"
            type="number"
            min="0"
            step="1"
            value={amount}
            style={{ width: "100%", fontSize: "1em" }}
            onChange={e => setAmount(e.target.valueAsNumber)}
          />
        </FormGroup>
        {queryType === "Between" && (
          <FormGroup htmlFor="amount2" label="Max">
            <input
              id="amount2"
              type="number"
              min="0"
              step="1"
              value={amount2}
              style={{ width: "100%", fontSize: "1em" }}
              onChange={e => setAmount2(e.target.valueAsNumber)}
            />
          </FormGroup>
        )}
      </div>
      {showQuery && (
        <pre style={{ marginBottom: "1.5rem" }}>
          <code>{getCode({ amount, amount2, queryType })}</code>
        </pre>
      )}
      <div>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <button
            className={styles.btn}
            onClick={() => setBoxCount(b => b + 1)}
          >
            Add Box
          </button>
          <button
            className={styles.btn}
            onClick={() => setBoxCount(b => b - 1)}
          >
            Remove Box
          </button>
        </div>
        <p
          style={{
            fontSize: ".8em",
            color: "var(--theme-text-lighter)",
            marginBottom: "1rem",
          }}
        >
          If the quantity query is satisfied the boxes will be orange while if
          the query is not satisfied they will be blue.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gridGap: "1rem",
            gridAutoRows: "100px",
            alignItems: "stretch",
            justifyItems: "stretch",
          }}
        >
          {Array.from({ length: boxCount }, (_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: getBoxColor({
                  amount,
                  amount2,
                  queryType,
                  boxCount,
                }),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function getCode({
  queryType,
  amount,
  amount2,
}: {
  queryType: QueryType
  amount: number
  amount2: number
}) {
  switch (queryType) {
    case "≥":
      return `/* Elements */
ul li:nth-last-child(n + ${amount}),
ul li:nth-last-child(n + ${amount}) ~ li {}

/* Container */
ul:has(li:nth-last-child(n + ${amount})) {}`
    case "≤":
      return `/* Elements */
ul li:nth-last-child(-n + ${amount}):first-child,
ul li:nth-last-child(-n + ${amount}):first-child ~ li {}

/* Container */
ul:has(li:nth-last-child(-n + ${amount}):first-child) {}`
    case "Between":
      return `/* Elements */
ul li:nth-last-child(n + ${amount}):nth-last-child(-n + ${amount2}):first-child,
ul li:nth-last-child(n + ${amount}):nth-last-child(-n + ${amount2}):first-child ~ li {}

/* Container */
ul:has(li:nth-last-child(n + ${amount}):nth-last-child(-n + ${amount2}):first-child) {}`
  }
}

function FormGroup({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth: "100px",
      }}
    >
      <label
        htmlFor={htmlFor}
        style={{
          fontWeight: "semibold",
          fontSize: ".8em",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function getBoxColor({
  amount,
  amount2,
  queryType,
  boxCount,
}: {
  amount: number
  amount2: number
  queryType: QueryType
  boxCount: number
}) {
  switch (queryType) {
    case "≥":
      return boxCount >= amount ? "var(--theme-orange)" : "var(--theme-blue)"
    case "≤":
      return boxCount <= amount ? "var(--theme-orange)" : "var(--theme-blue)"
    case "Between":
      return boxCount >= amount && boxCount <= amount2
        ? "var(--theme-orange)"
        : "var(--theme-blue)"
  }
}
