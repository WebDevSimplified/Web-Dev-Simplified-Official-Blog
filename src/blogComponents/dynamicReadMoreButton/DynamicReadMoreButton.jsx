import { useState } from "preact/hooks"

const EXPAND_TEXT_STYLES = {
  lineHeight: 1.5,
  overflow: "hidden",
  position: "relative",
  fontSize: ".8em",
}

const FADE_ELEMENT_STYLE = {
  position: "absolute",
  height: "100%",
  width: "100%",
  background: "linear-gradient(to bottom, transparent, var(--theme-bg))",
}

const TITLE_STYLE = {
  fontSize: "1.2em",
  marginBottom: ".5em",
}

export default function DynamicReadMoreButton({ noFade, noOverflowCheck }) {
  const [expandedOne, setExpandedOne] = useState(false)
  const [expandedTwo, setExpandedTwo] = useState(false)

  return (
    <div style={{ maxWidth: "80%", margin: "1.5rem auto" }}>
      <div>
        <div style={TITLE_STYLE}>Blog Article One</div>
        <div style={{ marginBottom: "1.5em" }}>
          <div
            style={{
              ...EXPAND_TEXT_STYLES,
              height: noOverflowCheck && !expandedOne ? "4.5em" : "initial",
            }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequatur, alias.
          </div>
          {noOverflowCheck && (
            <button onClick={() => setExpandedOne(p => !p)}>
              {expandedOne ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </div>
      <div>
        <div style={TITLE_STYLE}>Blog Article Two</div>
        <div>
          <div
            style={{
              ...EXPAND_TEXT_STYLES,
              height: expandedTwo ? "initial" : "4.5em",
            }}
          >
            {!noFade && <div style={!expandedTwo && FADE_ELEMENT_STYLE} />}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            sapiente odio earum? Sapiente odit aut excepturi nulla?
            Exercitationem tempore non est neque hic, eveniet distinctio quidem
            cum perspiciatis ipsum nihil necessitatibus rem dolorem earum. Ipsam
            tempora tempore consequuntur quia? Molestiae reiciendis incidunt
            veniam, consequatur fuga nesciunt, ipsa error quod sint nisi eius
            corrupti voluptatum id? Explicabo, repudiandae consectetur! Dolorum,
            dolor? Modi fugit corrupti harum a sunt autem incidunt. Iusto,
            dolorum vero modi repellat ratione magni dolores praesentium, esse
            quam itaque molestias quae! Deserunt reprehenderit commodi odio
            dolor porro aliquid omnis! Natus, nihil voluptas voluptates eveniet
            voluptatem quasi velit quam beatae corporis? Modi odio vel quisquam
            suscipit doloremque veritatis a adipisci minus vitae incidunt
            deserunt nisi quo facilis ducimus commodi molestias consectetur
            expedita libero illo, dicta est nam eaque eveniet quam.
            Reprehenderit atque eius quam exercitationem fuga suscipit ut quidem
            omnis mollitia, fugiat ex repellat provident quibusdam sunt minus
            voluptate temporibus quis ullam beatae, voluptatibus, esse nemo.
            Eligendi esse, nisi vitae, dignissimos consequatur molestiae
            inventore ipsam libero aliquid dolor molestias odio voluptas velit
            distinctio vero ab unde ad, sunt blanditiis minima? Aliquid
            praesentium tempora, ex qui deleniti animi aperiam, at sequi
            assumenda reprehenderit, libero nisi consequuntur sunt aut quod quos
            asperiores!
          </div>
          <button onClick={() => setExpandedTwo(p => !p)}>
            {expandedTwo ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  )
}
