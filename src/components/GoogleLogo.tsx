/** Figma exports the mark as two pieces; both are composed at their original insets. */
export default function GoogleLogo({ className = 'size-6' }: { className?: string }) {
  return (
    <span aria-hidden className={`relative block shrink-0 ${className}`}>
      <img
        src="/assets/google-g.png"
        alt=""
        className="absolute top-0 right-[2.08%] left-0 aspect-[47/48]"
      />
      <img
        src="/assets/google-g-inner.svg"
        alt=""
        className="absolute top-[40.92%] right-[37.5%] bottom-[39.73%] left-1/2"
      />
    </span>
  )
}
