/**
 * The 2024 wordmark is a multi-part vector in Figma with no single export, so the
 * five exported pieces are recomposed at their original insets inside a 300x242 box.
 */
export default function Mark2024() {
  return (
    <div aria-hidden className="relative aspect-[300/242] w-full">
      <div className="absolute inset-[0.89%_17.2%_0_14.43%] rotate-[10.06deg]">
        <img src="/assets/mark-2024-a.png" alt="" className="size-full" />
      </div>
      <img
        src="/assets/mark-2024-b.svg"
        alt=""
        className="absolute inset-[35.1%_0_22.32%_0] size-auto"
      />
      {/* the fifth exported piece is a 0.28px hairline — omitted, it renders as nothing */}
      <img
        src="/assets/mark-2024-d.svg"
        alt=""
        className="absolute inset-[19.99%_67.14%_66.13%_20.35%]"
      />
      <img
        src="/assets/mark-2024-c.svg"
        alt=""
        className="absolute inset-[69.03%_34.7%_20.12%_39.3%]"
      />
    </div>
  )
}
