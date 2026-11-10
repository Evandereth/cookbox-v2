export default function Header({ tag, name, subName }) {
  return (
    <header className="mx-auto max-w-5xl px-4 pb-10 pt-8 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
        {tag}
      </p>
      <h1 className="font-head text-3xl text-stone-900 sm:text-4xl">
        {name}
      </h1>
      <p className="mx-auto mt-4 max-w-3xl text-sm text-stone-600 sm:text-base">
        {subName}
      </p>
    </header>
  )
}