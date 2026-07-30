type Item = {
  src: string
  /** percentage of container width */
  x: number
  /** percentage of container height */
  y: number
  /** px number, or any CSS length — use a `%` string to scale with the container */
  size: number | string
  rotate?: number
  opacity?: number
}

/** Figma's canvas width — px sizes are authored against it. */
const CANVAS = 1440

/**
 * Numeric sizes are treated as px on a 1440px canvas and scale down with the
 * viewport, so decorations keep Figma's proportions on narrower screens instead
 * of dwarfing the content. The px value caps growth above 1440.
 */
function scale(size: number | string) {
  if (typeof size === 'string') return size
  return `min(${size}px, ${((size / CANVAS) * 100).toFixed(3)}vw)`
}

/**
 * Scattered food props. Purely decorative — never in the a11y tree.
 * `z-0` keeps it under section content, which sits at `z-10`.
 */
export default function Decor({ items, className = '' }: { items: Item[]; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {items.map((it, i) => (
        <img
          key={i}
          src={it.src}
          alt=""
          className="absolute"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            width: scale(it.size),
            opacity: it.opacity ?? 1,
            transform: `translate(-50%, -50%) rotate(${it.rotate ?? 0}deg)`,
          }}
        />
      ))}
    </div>
  )
}
