import { FormEvent, useEffect, useRef, useState } from "react"

type Route = "/" | "/about" | "/visualiser" | "/contact"

type ProcessStep = {
  number: string
  title: string
  copy: string
  imageLabel: string
}

const coffeeProcessSteps: ProcessStep[] = [
  {
    number: "01",
    title: "MATERIAL STUDY",
    copy: "Placeholder reserved for verified photography of the table's steel, leather and twine materials.",
    imageLabel: "COFFEE TABLE / MATERIAL STUDY / PROCESS PLACEHOLDER",
  },
  {
    number: "02",
    title: "COMPONENT PREPARATION",
    copy: "Placeholder reserved for verified photography of the prepared table components.",
    imageLabel: "COFFEE TABLE / COMPONENT PREPARATION / PROCESS PLACEHOLDER",
  },
  {
    number: "03",
    title: "FRAME DEVELOPMENT",
    copy: "Placeholder reserved for verified photography documenting development of the table frame.",
    imageLabel: "COFFEE TABLE / FRAME DEVELOPMENT / PROCESS PLACEHOLDER",
  },
  {
    number: "04",
    title: "SURFACE DETAIL",
    copy: "Placeholder reserved for verified close-up photography of the table's material junctions.",
    imageLabel: "COFFEE TABLE / SURFACE DETAIL / PROCESS PLACEHOLDER",
  },
  {
    number: "05",
    title: "FINAL ASSEMBLY",
    copy: "Placeholder reserved for verified photography of the Coffee Table assembly stage.",
    imageLabel: "COFFEE TABLE / FINAL ASSEMBLY / PROCESS PLACEHOLDER",
  },
  {
    number: "06",
    title: "COMPLETED OBJECT",
    copy: "Placeholder reserved for supplied photography of the completed Coffee Table.",
    imageLabel: "COFFEE TABLE / FINISHED OBJECT / PROCESS PLACEHOLDER",
  },
]

const lampProcessSteps: ProcessStep[] = [
  {
    number: "01",
    title: "MATERIAL STUDY",
    copy: "Placeholder reserved for verified photography of the materials selected for the Origami Lamp.",
    imageLabel: "ORIGAMI LAMP / MATERIAL STUDY / PROCESS PLACEHOLDER",
  },
  {
    number: "02",
    title: "FOLD STUDY",
    copy: "Placeholder reserved for verified photography of the lamp's folding studies.",
    imageLabel: "ORIGAMI LAMP / FOLD STUDY / PROCESS PLACEHOLDER",
  },
  {
    number: "03",
    title: "FORM DEVELOPMENT",
    copy: "Placeholder reserved for verified photography documenting development of the folded form.",
    imageLabel: "ORIGAMI LAMP / FORM DEVELOPMENT / PROCESS PLACEHOLDER",
  },
  {
    number: "04",
    title: "CONNECTION DETAIL",
    copy: "Placeholder reserved for verified close-up photography of the lamp's material connections.",
    imageLabel: "ORIGAMI LAMP / CONNECTION DETAIL / PROCESS PLACEHOLDER",
  },
  {
    number: "05",
    title: "LIGHT INTEGRATION",
    copy: "Placeholder reserved for verified photography of the lamp and light-source integration.",
    imageLabel: "ORIGAMI LAMP / LIGHT INTEGRATION / PROCESS PLACEHOLDER",
  },
  {
    number: "06",
    title: "COMPLETED OBJECT",
    copy: "Placeholder reserved for supplied photography of the completed Origami Lamp.",
    imageLabel: "ORIGAMI LAMP / FINISHED OBJECT / PROCESS PLACEHOLDER",
  },
]

type MaterialColour = {
  name: string
  value: string
}

const leatherColours: MaterialColour[] = [
  { name: "Tan", value: "#b98254" },
  { name: "Olive", value: "#65694a" },
  { name: "Blue", value: "#526c82" },
]

const twineColours: MaterialColour[] = [
  { name: "White", value: "#f0eee8" },
  { name: "Black", value: "#252525" },
  { name: "Natural", value: "#c8b18a" },
]

type FurnitureObject = "table" | "lamp"

function materialFromParam(
  value: string | null,
  colours: MaterialColour[],
  fallbackIndex: number,
) {
  return (
    colours.find(
      (colour) => colour.name.toLowerCase() === value?.toLowerCase(),
    ) ?? colours[fallbackIndex]
  )
}

const tableRenderImages: Record<string, string> = {
  "Tan-White": "/assets/TAN_LEATHER_WHITE_THREAD.21.png",
  "Tan-Black": "/assets/TAN_LEATHER_BLACK_THREAD.22.png",
  "Tan-Natural": "/assets/TAN_LEATHER_NATURAL_TWINE.png",
  "Olive-White": "/assets/OLIVE_LEATHER_WHITE_THREAD.25.png",
  "Olive-Black": "/assets/OLIVE_LEATHER_BLACK_THREAD.23.png",
  "Olive-Natural": "/assets/OLIVE_LEATHER_NATURAL_THREAD.24.png",
  "Blue-White": "/assets/BLUE_LEATHER_WHITE_THREAD.26.png",
  "Blue-Black": "/assets/BLUE_LEATHER_BLACK_THREAD.28.png",
  "Blue-Natural": "/assets/BLUE_LEATHER_NATURAL_THREAD.29.png",
}

function InlineArrow() {
  return (
    <span className="inline-arrow" aria-hidden="true">
      →
    </span>
  )
}

function goTo(route: Route, hash = "") {
  window.history.pushState({}, "", `${route}${hash}`)
  window.dispatchEvent(new PopStateEvent("popstate"))
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function Navigation({ route }: { route: Route }) {
  const [open, setOpen] = useState(false)

  const navigate = (next: Route, hash = "") => {
    setOpen(false)
    if (next === route && hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
      return
    }
    goTo(next, hash)
  }

  return (
    <header className="site-header">
      <button
        className="wordmark"
        onClick={() => navigate("/")}
        aria-label="SEAM home"
      >
        SEAM
      </button>
      <button
        className="menu-button"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "CLOSE" : "MENU"}
      </button>
      <nav
        id="site-navigation"
        className={open ? "site-nav is-open" : "site-nav"}
        aria-label="Primary navigation"
      >
        <button
          className={route === "/" ? "active" : ""}
          aria-current={route === "/" ? "page" : undefined}
          onClick={() => navigate("/", "#collection")}
        >
          COLLECTION
        </button>
        <button
          className={route === "/visualiser" ? "active" : ""}
          aria-current={route === "/visualiser" ? "page" : undefined}
          onClick={() => navigate("/visualiser")}
        >
          VISUALISER
        </button>
        <button
          className={route === "/about" ? "active" : ""}
          aria-current={route === "/about" ? "page" : undefined}
          onClick={() => navigate("/about")}
        >
          ABOUT
        </button>
        <button
          className={route === "/contact" ? "active" : ""}
          aria-current={route === "/contact" ? "page" : undefined}
          onClick={() => navigate("/contact")}
        >
          CONTACT US
        </button>
      </nav>
    </header>
  )
}

function Placeholder({
  label,
  className = "",
  tone,
}: {
  label: string
  className?: string
  tone?: string
}) {
  return (
    <div
      className={`placeholder ${className}`}
      style={tone ? { backgroundColor: tone } : undefined}
    >
      <span>IMAGE / {label}</span>
    </div>
  )
}

function Footer() {
  const navigate = (route: Route, hash = "") => {
    if (window.location.pathname === route && hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
      return
    }
    goTo(route, hash)
  }

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <button
            className="footer-logo"
            onClick={() => navigate("/")}
            aria-label="SEAM home"
          >
            SEAM
          </button>
          <span>MIKO DESIGNS</span>
        </div>
        <div className="footer-group">
          <p>EXPLORE</p>
          <button onClick={() => navigate("/", "#collection")}>
            COLLECTION
          </button>
          <button onClick={() => navigate("/visualiser")}>VISUALISER</button>
          <button onClick={() => navigate("/about")}>ABOUT</button>
        </div>
        <div className="footer-group">
          <p>GET IN TOUCH</p>
          <button onClick={() => navigate("/contact")}>CONTACT US</button>
          <button onClick={() => navigate("/contact")}>MAKE AN ENQUIRY</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© SEAM — MIKO DESIGNS</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  )
}

function Accordion({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="accordion">
      <button aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span>{title}</span>
        <span
  className={open ? "plus is-open" : "plus"}
  aria-hidden="true"
>
  +
</span>
      </button>
      <div className={open ? "accordion-content is-open" : "accordion-content"}>
        <div>{children}</div>
      </div>
    </div>
  )
}

function MaterialDetails({ materials }: { materials: string[] }) {
  return (
    <div className="material-details">
      {materials.map((material) => (
        <div className="material-detail" key={material}>
          <div
            className="material-detail-image"
            role="img"
            aria-label={`${material} image placeholder`}
          >
            <span>IMAGE PLACEHOLDER</span>
          </div>
          <span>{material}</span>
        </div>
      ))}
    </div>
  )
}

function ProductCarousel({
  objectName,
  slides,
}: {
  objectName: string
  slides: string[]
}) {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const showSlide = (index: number) => {
    const next = (index + slides.length) % slides.length
    setActive(next)
    trackRef.current?.scrollTo({
      left: next * trackRef.current.clientWidth,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const alignSlide = () => {
      const track = trackRef.current
      if (track) track.scrollLeft = active * track.clientWidth
    }
    window.addEventListener("resize", alignSlide)
    return () => window.removeEventListener("resize", alignSlide)
  }, [active])

  return (
    <div
      className="product-carousel product-image"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${objectName} product images`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          showSlide(active - 1)
        }
        if (event.key === "ArrowRight") {
          event.preventDefault()
          showSlide(active + 1)
        }
      }}
    >
      <div
        className="product-carousel-track"
        ref={trackRef}
        onScroll={(event) => {
          const track = event.currentTarget
          if (track.clientWidth) {
            setActive(
              Math.min(
                slides.length - 1,
                Math.max(0, Math.round(track.scrollLeft / track.clientWidth)),
              ),
            )
          }
        }}
      >
        {slides.map((slide, index) => (
          <div
            className="product-carousel-slide"
            key={slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide}`}
          >
            <Placeholder
              label={`${objectName} / ${slide} / PLACEHOLDER`}
              className="product-carousel-image"
            />
          </div>
        ))}
      </div>
      <button
        className="product-carousel-arrow previous"
        onClick={() => showSlide(active - 1)}
        aria-label={`Previous ${objectName} image`}
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        className="product-carousel-arrow next"
        onClick={() => showSlide(active + 1)}
        aria-label={`Next ${objectName} image`}
      >
        <span aria-hidden="true">→</span>
      </button>
      <span className="product-carousel-counter" aria-live="polite">
        {String(active + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </span>
    </div>
  )
}

function ProductSection({
  id,
  sectionNumber,
  title,
  reverse = false,
  description,
}: {
  id: string
  sectionNumber: string
  title: string
  reverse?: boolean
  description: string
}) {
  const materials =
    id === "coffee-table"
      ? ["ALUMINIUM", "LEATHER", "NATURAL TWINE"]
      : ["SHEET METAL", "LEATHER", "WOVEN TWINE"]
  const slides =
    id === "coffee-table"
      ? [
          "FULL PRODUCT VIEW",
          "CONSTRUCTION DETAIL",
          "MATERIAL / FINISH CLOSE-UP",
          "ALTERNATE ANGLE",
        ]
      : [
          "FULL PRODUCT VIEW",
          "FOLDED CONSTRUCTION DETAIL",
          "MATERIAL / FINISH CLOSE-UP",
          "ALTERNATE ANGLE",
        ]

  return (
    <section id={id} className={reverse ? "product reverse" : "product"}>
      <ProductCarousel objectName={title} slides={slides} />
      <div className="product-copy">
        <p className="eyebrow">{sectionNumber}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          The construction remains visible, allowing each material to retain its
          own character while becoming part of a unified form.
        </p>
        <div className="accordions">
          <Accordion title="MATERIALS">
            <MaterialDetails materials={materials} />
          </Accordion>
          <Accordion title="SPECIFICATIONS">
            {id === "coffee-table"
              ? "900 × 600 × 360 mm. Indoor use."
              : "360 × 360 × 1280 mm. Dimmable LED."}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

function ProcessCarousel({
  id,
  sectionNumber,
  objectName,
  heading,
  description,
  steps,
}: {
  id: string
  sectionNumber: string
  objectName: string
  heading: string
  description: string
  steps: ProcessStep[]
}) {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % steps.length),
      4500,
    )
    return () => window.clearInterval(timer)
  }, [steps.length])

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const travel = Math.max(1, rect.height + window.innerHeight)
      const progress = Math.min(
        0.999,
        Math.max(0, (window.innerHeight - rect.top) / travel),
      )
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setActive(Math.floor(progress * steps.length))
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [steps.length])

  return (
    <section
      ref={sectionRef}
      className={`process process--${id}`}
      id={`${id}-process`}
    >
      <div className="process-heading">
        <p className="eyebrow">
          {sectionNumber} / {objectName} MAKING PROCESS
        </p>
        <h2>{heading}</h2>
        <p>{description}</p>
      </div>
      <div className="process-stage" aria-live="polite">
        {steps.map((item, index) => (
          <div
            key={item.number}
            className={
              index === active ? "process-frame is-active" : "process-frame"
            }
          >
            <Placeholder label={item.imageLabel} className="process-visual" />
            <span className="process-step-number">
              {item.number} / {String(steps.length).padStart(2, "0")}
            </span>
            <div className="process-caption">
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </div>
          </div>
        ))}
        <div className="process-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div
          className="process-controls"
          aria-label={`${objectName} making process slides`}
        >
          {steps.map((item, index) => (
            <button
              key={item.number}
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show ${item.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-statement">
          <p>TWO OBJECTS. THREE MATERIALS.</p>
          <p>EXPLORING THE RELATIONSHIP BETWEEN CRAFT AND MANUFACTURING.</p>
        </div>
        <h1>SEAM</h1>
        <a href="#collection">SCROLL TO EXPLORE</a>
      </section>

      <main>
        <section className="collection" id="collection">
          <p className="eyebrow">01 / THE COLLECTION</p>
          <h2>
            THE
            <br />
            COLLECTION.
          </h2>
          <p className="collection-intro">
            The SEAM collection explores the relationship between material,
            structure, and form through two contemporary furniture objects. Each
            piece brings together contrasting elements to create a considered
            balance between function and expression.
          </p>
          <div className="collection-grid">
            <article>
              <Placeholder
                label="COFFEE TABLE / LANDSCAPE"
                className="landscape"
              />
              <div className="object-caption">
                <span>01 — COFFEE TABLE</span>
                <a href="#coffee-table">
                  EXPLORE <InlineArrow />
                </a>
              </div>
            </article>
            <article>
              <Placeholder
                label="ORIGAMI LAMP / PORTRAIT"
                className="portrait"
              />
              <div className="object-caption">
                <span>02 — ORIGAMI LAMP</span>
                <a href="#origami-lamp">
                  EXPLORE <InlineArrow />
                </a>
              </div>
            </article>
          </div>
        </section>
        <ProductSection
          id="coffee-table"
          sectionNumber="02 / OBJECT 01"
          title="COFFEE TABLE"
          description="A low table built around the tension between a precise steel frame and a soft, suspended leather surface."
        />
        <ProcessCarousel
          id="coffee-table"
          sectionNumber="03"
          objectName="COFFEE TABLE"
          heading="MADE WITH INTENTION."
          description="A dedicated sequence for the Coffee Table, from material preparation through construction, assembly and the finished object."
          steps={coffeeProcessSteps}
        />
        <ProductSection
          id="origami-lamp"
          sectionNumber="04 / OBJECT 02"
          title="ORIGAMI LAMP"
          reverse
          description="A sculptural reading light whose folded profile directs light while revealing its method of construction."
        />
        <ProcessCarousel
          id="origami-lamp"
          sectionNumber="05"
          objectName="ORIGAMI LAMP"
          heading="FOLDED INTO FORM."
          description="An independent sequence for the Origami Lamp, following its material selection, folded construction, assembly and finished form."
          steps={lampProcessSteps}
        />
      </main>
      <Footer />
    </>
  )
}

const principles = [
  ["MATERIAL HONESTY", "LET THE QUALITIES OF EACH MATERIAL REMAIN VISIBLE."],
  ["CONSIDERED MAKING", "MAKE CONSTRUCTION PART OF THE DESIGN."],
  ["QUESTION CONVENTION", "EXPLORE ALTERNATIVES TO FAMILIAR FORMS."],
  [
    "DESIGN WITH INTENTION",
    "MAKE DELIBERATE CHOICES ABOUT FORM, FUNCTION AND DETAIL.",
  ],
]

const team = [
  ["JOHNNY", "INDUSTRIAL DESIGNER"],
  ["OSCAR", "INDUSTRIAL DESIGNER"],
  ["GRACE", "UX/UI DESIGNER"],
]

function AboutPage() {
  return (
    <>
      <main className="about-page">
        <section className="about-story">
          <div>
            <p className="eyebrow">01 / THE PROJECT</p>
            <h1>
              OUR
              <br />
              STORY.
            </h1>
            <p className="lead">
              SEAM explores the relationship between traditional craft and
              contemporary design. Through material experimentation and
              considered construction, the project challenges conventional ways
              of making, bringing together industrial materials and the detail
              of hand-crafted processes.
            </p>
          </div>
          <Placeholder label="STUDIO STORY" />
        </section>
        <section className="philosophy">
          <Placeholder label="MATERIAL DETAIL" />
          <div>
            <p className="eyebrow">02 / WHAT GUIDES US</p>
            <h2>
              OUR
              <br />
              PHILOSOPHY
            </h2>
            <p>
              We believe design is a conversation between material, form and
              function. SEAM explores the tension between contrasting elements,
              bringing them together through considered design and a shared
              language of construction.
            </p>
          </div>
        </section>
        <section className="principles">
          {principles.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </section>
        <section className="longevity">
          <div>
            <p className="eyebrow">04 / DESIGN CONSIDERATIONS</p>
            <h2>DESIGN FOR A LONGER LIFE</h2>
            <dl>
              <dt>MATERIALS /</dt>
              <dd>
                Consider the origins, qualities and impacts of the materials
                selected.
              </dd>
              <dt>MAKING /</dt>
              <dd>
                Consider material efficiency, production waste and construction
                methods.
              </dd>
              <dt>LONGEVITY /</dt>
              <dd>
                Design with durability, maintenance and considered use in mind.
              </dd>
            </dl>
          </div>
          <Placeholder label="CONSTRUCTION DETAIL" />
        </section>
        <section className="team">
          <p className="eyebrow">05 / THE PEOPLE</p>
          <div className="team-heading">
            <h2>THE TEAM</h2>
            <p>
              THREE DESIGNERS. ONE PROJECT. A SHARED INTEREST IN MAKING
              MEANINGFUL DESIGN.
            </p>
          </div>
          <div className="team-grid">
            {team.map(([name, role], index) => (
              <article key={name} className={`team-member member-${index + 1}`}>
                <Placeholder label={`${name} PORTRAIT`} />
                <div>
                  <h3>{name}</h3>
                  <span>{role}</span>
                  <p>
                    Working across objects, materials and interaction to create
                    a clear and considered collection.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function VisualiserPage() {
  const initialParams = new URLSearchParams(window.location.search)
  const [leather, setLeather] = useState(() =>
    materialFromParam(initialParams.get("leather"), leatherColours, 0),
  )
  const [twine, setTwine] = useState(() =>
    materialFromParam(initialParams.get("twine"), twineColours, 1),
  )
  const [object, setObject] = useState<FurnitureObject>(() =>
    initialParams.get("object") === "lamp" ? "lamp" : "table",
  )
  const [shareState, setShareState] = useState<"idle" | "copied" | "manual">(
    "idle",
  )
  const [shareUrl, setShareUrl] = useState("")
  const shareInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => setShareState("idle"), [object, leather, twine])

  const createShareUrl = () => {
    const url = new URL(window.location.href)
    url.pathname = "/visualiser"
    url.hash = ""
    url.search = new URLSearchParams({
      object,
      leather: leather.name.toLowerCase(),
      twine: twine.name.toLowerCase(),
    }).toString()
    return url.toString()
  }

  const legacyCopy = (value: string) => {
    const textArea = document.createElement("textarea")
    textArea.value = value
    textArea.setAttribute("readonly", "")
    textArea.style.position = "fixed"
    textArea.style.opacity = "0"
    document.body.appendChild(textArea)
    textArea.select()
    const copied = document.execCommand("copy")
    textArea.remove()
    return copied
  }

  const shareConfiguration = async () => {
    const url = createShareUrl()
    setShareUrl(url)
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard missing")
      await navigator.clipboard.writeText(url)
      setShareState("copied")
    } catch {
      try {
        if (legacyCopy(url)) {
          setShareState("copied")
          return
        }
      } catch {
        // The selectable URL below remains available when browser copying fails.
      }
      setShareState("manual")
      window.requestAnimationFrame(() => {
        shareInputRef.current?.focus()
        shareInputRef.current?.select()
      })
    }
  }

  return (
    <>
      <main className="visualiser-page">
        <section className="visualiser-layout">
          <div className="visualiser-controls">
            <div className="visualiser-intro">
              <p className="eyebrow">01 / VISUALISER</p>
              <h1>FURNITURE VISUALISER.</h1>
              <div className="object-toggle">
                <button
                  className={object === "table" ? "active" : ""}
                  onClick={() => setObject("table")}
                  aria-pressed={object === "table"}
                >
                  COFFEE TABLE
                </button>
                <button
                  className={object === "lamp" ? "active" : ""}
                  onClick={() => setObject("lamp")}
                  aria-pressed={object === "lamp"}
                >
                  ORIGAMI LAMP
                </button>
              </div>
            </div>
            <div className="visualiser-materials">
              <Swatches
                label="LEATHER"
                colours={leatherColours}
                selected={leather.name}
                onSelect={setLeather}
              />
              <Swatches
                label="THREAD / TWINE"
                colours={twineColours}
                selected={twine.name}
                onSelect={setTwine}
              />
              <div className="visualiser-actions">
                <button className="text-link" onClick={() => goTo("/contact")}>
                  ENQUIRE <InlineArrow />
                </button>
                <button className="text-link" onClick={shareConfiguration}>
                  SHARE <InlineArrow />
                </button>
              </div>
              <div className="share-feedback" aria-live="polite">
                {shareState === "copied" && <span>LINK COPIED</span>}
                {shareState === "manual" && (
                  <div className="share-fallback">
                    <label htmlFor="share-url">
                      COPY THIS LINK
                      <input
                        id="share-url"
                        ref={shareInputRef}
                        value={shareUrl}
                        readOnly
                        onFocus={(event) => event.currentTarget.select()}
                      />
                    </label>
                    <button
                      className="text-link"
                      onClick={() => {
                        shareInputRef.current?.focus()
                        shareInputRef.current?.select()
                      }}
                    >
                      SELECT LINK
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="visualiser-canvas"
            aria-label={`${object} material preview`}
          >
            {object === "table" ? (
              <img
                className="table-render-image"
                src={tableRenderImages[`${leather.name}-${twine.name}`]}
                alt={`SEAM coffee table in ${leather.name.toLowerCase()} leather with ${twine.name.toLowerCase()} thread`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <div className="lamp-preview">
                <div
                  className="lamp-shade"
                  style={{ borderBottomColor: leather.value }}
                />
                <div
                  className="lamp-seam"
                  style={{ background: twine.value }}
                />
                <i />
              </div>
            )}
            <span className="preview-label">
              {object === "table"
                ? `COFFEE TABLE / ${leather.name.toUpperCase()} LEATHER / ${twine.name.toUpperCase()} THREAD`
                : "INTERACTIVE MATERIAL PREVIEW / RENDER IMAGES NOT YET ADDED"}
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Swatches({
  label,
  colours,
  selected,
  onSelect,
}: {
  label: string
  colours: MaterialColour[]
  selected: string
  onSelect: (colour: MaterialColour) => void
}) {
  return (
    <fieldset className="swatches">
      <legend>{label}</legend>
      <div>
        {colours.map((colour) => (
          <button
            type="button"
            key={colour.name}
            style={{ background: colour.value }}
            className={selected === colour.name ? "selected" : ""}
            onClick={() => onSelect(colour)}
            aria-label={`${label.toLowerCase()} colour: ${colour.name}`}
            aria-pressed={selected === colour.name}
          />
        ))}
      </div>
    </fieldset>
  )
}



function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("https://formspree.io/f/mppqvnao", {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError("Your enquiry could not be sent. Please try again.")
      }
    } catch {
      setError("Please check your internet connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <main className="contact-page">
        <section className="contact-layout">
          <div>
            <p className="eyebrow">GET IN TOUCH</p>
            <h1>CONTACT US.</h1>
          </div>

          {submitted ? (
            <div className="contact-success" role="status">
              <p className="eyebrow">ENQUIRY SENT</p>
              <h2>THANK YOU.</h2>
              <p>
                Thank you for contacting SEAM. Your enquiry
                has been submitted successfully.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit}>
              <h2>SEND AN ENQUIRY</h2>

              <input
                type="hidden"
                name="_subject"
                value="New SEAM website enquiry"
              />

              <div className="two-fields">
                <Field
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                />
                <Field
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </div>

              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
              />

              <Field
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
              />

              <label>
                <span className="field-label">
                  Country <b aria-hidden="true">*</b>
                </span>
                <select name="country" required defaultValue="">
                  <option value="" disabled>Select country</option>
                  <option>Australia</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Other</option>
                </select>
              </label>

              <Field
                label="City"
                name="city"
                autoComplete="address-level2"
              />

              <label>
                <span className="field-label">
                  Object of interest <b aria-hidden="true">*</b>
                </span>
                <select name="object" required defaultValue="">
                  <option value="" disabled>Select object</option>
                  <option>Coffee Table</option>
                  <option>Origami Lamp</option>
                  <option>General enquiry</option>
                </select>
              </label>

              <label>
                <span className="field-label">
                  Enquiry Description <b aria-hidden="true">*</b>
                </span>
                <textarea name="description" required rows={4} />
              </label>

              {error && (
                <p role="alert" className="form-error">
                  {error}
                </p>
              )}

              <button
                className="text-link form-submit"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "SENDING..." : "SEND ENQUIRY"}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}



function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  autoComplete?: string
}) {
  return (
    <label>
      <span className="field-label">
        {label} <b aria-hidden="true">*</b>
      </span>
      <input name={name} type={type} autoComplete={autoComplete} required />
    </label>
  )
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => {
    const path = window.location.pathname
    return ["/about", "/visualiser", "/contact"].includes(path)
      ? path as Route
      : "/"
  })

  useEffect(() => {
    const update = () =>
      setRoute(
        (["/about", "/visualiser", "/contact"].includes(
          window.location.pathname,
        )
          ? window.location.pathname
          : "/") as Route,
      )
    window.addEventListener("popstate", update)
    return () => window.removeEventListener("popstate", update)
  }, [])

  useEffect(() => {
    document.title =
      route === "/"
        ? "SEAM — Miko Designs"
        : `${route.slice(1).toUpperCase()} — SEAM`
    if (window.location.hash) {
      window.requestAnimationFrame(() =>
        document.querySelector(window.location.hash)?.scrollIntoView(),
      )
    }
  }, [route])

  return (
    <div className="app-shell">
      <Navigation route={route} />
      {route === "/" && <HomePage />}
      {route === "/about" && <AboutPage />}
      {route === "/visualiser" && <VisualiserPage />}
      {route === "/contact" && <ContactPage />}
    </div>
  )
}
