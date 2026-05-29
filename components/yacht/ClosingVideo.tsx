/* MYCEL `sustain--video` — full-screen closing video with a single
   editorial title overlay. */

const CLOSING_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-sunset-with-sailing-boats-2166-large.mp4";

export function ClosingVideo() {
  return (
    <section className="y-closing" aria-label="Closing">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/yacht/gallery-3.svg"
      >
        <source src={CLOSING_VIDEO} type="video/mp4" />
      </video>
      <div className="y-closing__veil" aria-hidden="true" />
      <div className="y-closing__title">
        <div className="y-closing__inner">
          <h2 className="y-closing__h font-en">
            Every sail is part of a continuous,
            <br />
            shared horizon.
          </h2>
          <p className="y-closing__sub">사흘이 지나도 바다는 이어집니다.</p>
        </div>
      </div>
    </section>
  );
}
