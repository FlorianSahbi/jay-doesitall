// @path: src/app/styleguide/page.tsx
export default function StyleguidePage() {
  return (
    <main className="space-y-10 p-10">
      <section>
        <h1 className="text-display-xl">Display XL</h1>
        <h2 className="text-display-s">Display S</h2>
        <h3 className="text-title-01">Title 01</h3>
        <h4 className="text-title-02">Title 02</h4>
        <p className="text-body-l-regular">Body Large Regular</p>
        <p className="text-body-l-bold">Body Large Bold</p>
        <p className="text-body-s-regular">Body Small Regular</p>
      </section>

      <section>
        <div className="flex gap-4">
          <div className="bg-yellow h-20 w-20 border" />
          <div className="h-20 w-20 border bg-white" />
          <div className="bg-light-grey h-20 w-20 border" />
          <div className="bg-dark-grey h-20 w-20 border" />
          <div className="h-20 w-20 border bg-black" />
        </div>
      </section>

      <section className="rounded-2xl border border-purple-500/60 bg-[#1d1d1d] p-6 md:p-10">
        <h3 className="text-title-2 mb-6 text-white">CTA</h3>

        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="space-y-6">
            <button className="btn btn-lg btn-yellow-fill">PRIMARY CTA</button>
            <button className="btn btn-lg btn-yellow-outline">
              SECONDARY CTA
            </button>
            <p className="link-yellow">LINK</p>
            <button className="btn btn-sm btn-yellow-fill">PRIMARY CTA</button>
            <button className="btn btn-sm btn-yellow-outline">
              SECONDARY CTA
            </button>
            <p className="link-yellow">LINK</p>
          </div>

          <div className="space-y-6">
            <button className="btn btn-lg btn-white-fill">PRIMARY CTA</button>
            <button className="btn btn-lg btn-white-outline">
              SECONDARY CTA
            </button>
            <p className="link-white">LINK</p>
            <button className="btn btn-sm btn-white-fill">PRIMARY CTA</button>
            <button className="btn btn-sm btn-white-outline">
              SECONDARY CTA
            </button>
            <p className="link-white">LINK</p>
          </div>

          <div className="space-y-6">
            <button className="btn btn-lg btn-black-fill">PRIMARY CTA</button>
            <button className="btn btn-lg btn-black-outline">
              SECONDARY CTA
            </button>
            <p className="link-black">LINK</p>
            <button className="btn btn-sm btn-black-fill">PRIMARY CTA</button>
            <button className="btn btn-sm btn-black-outline">
              SECONDARY CTA
            </button>
            <p className="link-black">LINK</p>
          </div>
        </div>
      </section>
    </main>
  )
}
