/** Cover for products without their own artwork: the uploaded image, or the brand gradient with the product's initials. */
export default function GenericCover({ title, image }: { title: string; image: string }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element -- admin-supplied link, any host
    return <img src={image} alt={title} loading="lazy" className="absolute inset-0 size-full object-cover" />
  }
  const initials = title.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#1b2a4a_0%,#2f4166_60%,#c4943d_140%)]">
      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <span className="relative flex size-20 items-center justify-center rounded-2xl bg-white text-3xl font-extrabold text-navy-deep shadow-[0_12px_30px_rgba(0,0,0,0.25)]">{initials}</span>
    </div>
  )
}
