/**
 * The colour-block collage filling the right of the auth screens.
 *
 * Coordinates are percentages of Figma's 694x984 panel. Paint order matters:
 * the red block is drawn *after* the eggs so it crops them, exactly as in the design.
 * Note the exported layer names are misleading — "Background / Green" is actually
 * yellow, "Background / Red" is green and "Background / Orange" is red, so the files
 * are named after their real fills.
 */
const SHAKERS = [
  { src: '/assets/salt.png', x: 55.0, y: 61.6, size: 47.8, rotate: 12.67 },
  { src: '/assets/pepper.png', x: 76.3, y: 71.4, size: 47.7, rotate: 57.67 },
  { src: '/assets/magic-powder.png', x: 75.0, y: 83.3, size: 48.0, rotate: 102.67 },
  { src: '/assets/salt.png', x: 66.0, y: 95.7, size: 47.7, rotate: 147.67 },
  { src: '/assets/pepper.png', x: 44.0, y: 96.2, size: 47.7, rotate: -167.33 },
  { src: '/assets/magic-powder.png', x: 28.2, y: 87.5, size: 48.0, rotate: -122.33 },
  { src: '/assets/salt.png', x: 28.4, y: 74.6, size: 47.7, rotate: -77.33 },
  { src: '/assets/pepper.png', x: 36.0, y: 62.1, size: 47.7, rotate: -32.33 },
]

const EGGS = [
  { x: 86.2, y: 25.4, size: 71.5, rotate: -9.11 },
  { x: 73.3, y: 35.0, size: 46.1, rotate: -25.35 },
  { x: 102.0, y: 30.9, size: 57.8, rotate: 38.08 },
]

function Piece({
  src,
  x,
  y,
  size,
  rotate = 0,
}: {
  src: string
  x: number
  y: number
  size: number
  rotate?: number
}) {
  return (
    <img
      src={src}
      alt=""
      className="absolute max-w-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
    />
  )
}

export default function AuthBackdrop({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* keeps Figma's 694:984 proportions so the collage never skews */}
      <div className="absolute top-0 right-0 h-full min-w-full">
        <img
          src="/assets/block-yellow.svg"
          alt=""
          className="absolute top-[44.9%] left-0 w-[136%] max-w-none"
        />
        <img
          src="/assets/block-green.svg"
          alt=""
          className="absolute top-[1.4%] left-[63.1%] w-[56.2%] max-w-none"
        />

        {EGGS.map((egg, i) => (
          <Piece key={i} src="/assets/egg.png" {...egg} />
        ))}

        {/* drawn over the eggs, cropping them — matches the design */}
        <img
          src="/assets/block-red.svg"
          alt=""
          className="absolute top-[1.4%] left-0 w-[59.9%] max-w-none"
        />

        <Piece src="/assets/auth-pan.png" x={29.1} y={17.6} size={94.2} />

        {SHAKERS.map((item, i) => (
          <Piece key={i} {...item} />
        ))}
      </div>
    </div>
  )
}
