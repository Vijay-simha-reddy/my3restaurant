const css = `
.tm-page{height:100dvh;overflow:hidden;background:#0e2038;color:#e8edf5;display:flex;align-items:center;justify-content:center;font-family:var(--sans)}
.tm-wrap{width:100%;max-width:960px;height:100dvh;padding:16px 20px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:16px;text-align:center}.tm-text{padding-bottom:4px}.tm-lead{margin:0 auto}
.tm-h1{font-family:var(--sans);font-size:clamp(24px,4.5vw,44px);line-height:1.1;margin:0 0 8px;font-weight:800}
.tm-h1 span{color:#ff8a1f}
.tm-lead{color:#cbd3df;font-size:clamp(14px,2vw,17px);max-width:560px;line-height:1.5}
.tm-illus{position:relative;flex:none;aspect-ratio:520/360;width:min(100%,640px,calc((100dvh - 190px)*1.444))}
.tm-illus svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.tm-a{animation:tm-blink 1.2s infinite}
.tm-b{animation:tm-blink 1.2s infinite .6s}
.tm-arm{transform-box:fill-box;transform-origin:20% 80%;animation:tm-work 1s ease-in-out infinite}
@keyframes tm-blink{0%,45%{opacity:1}50%,100%{opacity:.25}}
@keyframes tm-work{50%{transform:translateY(-4px) rotate(-6deg)}}

@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

export default function MaintenancePage() {
  return (
    <main className="tm-page">
      <style>{css}</style>
      <div className="tm-wrap">

        <div className="tm-illus">
          <svg
            viewBox="0 0 520 360"
            role="img"
            aria-label="Illustration of roadwork with cones, a warning sign, a traffic signal and workers repairing the road"
          >
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2b5c99" />
                <stop offset="1" stopColor="#8fb8e0" />
              </linearGradient>
            </defs>
            <clipPath id="round"><rect width="520" height="360" rx="22" /></clipPath>
            <g clipPath="url(#round)">
            <rect width="520" height="360" fill="url(#sky)" />
            <circle cx="430" cy="60" r="28" fill="#ffd27a" opacity=".9" />
            <path d="M0 200 L70 140 L130 190 L210 120 L300 195 L380 150 L520 210 V250 H0Z" fill="#244a7a" />
            <rect y="240" width="520" height="120" fill="#3a4250" />
            <rect y="236" width="520" height="8" fill="#6b7686" />
            <g fill="#f6f6f6">
              <rect x="20" y="300" width="60" height="6" />
              <rect x="130" y="300" width="60" height="6" />
              <rect x="240" y="300" width="60" height="6" />
              <rect x="350" y="300" width="60" height="6" />
              <rect x="460" y="300" width="60" height="6" />
            </g>
            <polygon points="190,270 330,270 350,330 170,330" fill="#2a303b" />
            <polygon
              points="190,270 330,270 350,330 170,330"
              fill="none"
              stroke="#ff8a1f"
              strokeWidth="3"
              strokeDasharray="8 6"
            />
            <rect x="140" y="262" width="240" height="12" rx="3" fill="#fff" />
            <g fill="#ff8a1f">
              <polygon points="150,262 170,262 160,274 140,274" />
              <polygon points="190,262 210,262 200,274 180,274" />
              <polygon points="230,262 250,262 240,274 220,274" />
              <polygon points="270,262 290,262 280,274 260,274" />
              <polygon points="310,262 330,262 320,274 300,274" />
              <polygon points="350,262 370,262 360,274 340,274" />
            </g>
            <g id="cone">
              <polygon points="60,320 80,320 76,284 64,284" fill="#ff8a1f" />
              <rect x="55" y="320" width="30" height="6" rx="2" fill="#c76400" />
              <rect x="63" y="298" width="14" height="5" fill="#fff" />
            </g>
            <use href="#cone" x="400" y="-4" />
            <use href="#cone" x="440" y="12" />
            <use href="#cone" x="-30" y="-6" />
            <rect x="428" y="170" width="6" height="90" fill="#59626f" />
            <g transform="translate(431 150) rotate(45)">
              <rect x="-32" y="-32" width="64" height="64" rx="8" fill="#ffb21f" stroke="#1a1000" strokeWidth="3" />
            </g>
            <g fill="#1a1000">
              <circle cx="431" cy="140" r="4.5" />
              <path d="M424 168 L431 148 L438 168Z" />
            </g>
            <rect x="70" y="120" width="6" height="140" fill="#59626f" />
            <rect x="52" y="60" width="42" height="92" rx="10" fill="#101820" stroke="#59626f" strokeWidth="2" />
            <circle cx="73" cy="82" r="10" fill="#ef4d4d" className="tm-a" />
            <circle cx="73" cy="106" r="10" fill="#f5b82e" className="tm-b" />
            <circle cx="73" cy="130" r="10" fill="#1d3a25" />
            <g>
              <ellipse cx="240" cy="326" rx="22" ry="4" fill="#00000040" />
              <rect x="230" y="288" width="20" height="34" rx="5" fill="#ff8a1f" />
              <rect x="233" y="296" width="14" height="4" fill="#fff6" />
              <circle cx="240" cy="278" r="9" fill="#e0ac84" />
              <path d="M229 276 a11 9 0 0 1 22 0z" fill="#ffd21f" />
              <g className="tm-arm">
                <rect x="248" y="296" width="30" height="5" rx="2" fill="#ff8a1f" transform="rotate(35 248 296)" />
                <rect x="268" y="310" width="4" height="22" fill="#8a96a8" />
                <rect x="262" y="330" width="16" height="5" rx="2" fill="#59626f" />
              </g>
            </g>
            <g>
              <ellipse cx="300" cy="332" rx="22" ry="4" fill="#00000040" />
              <rect x="290" y="294" width="20" height="34" rx="5" fill="#ffb21f" />
              <rect x="293" y="302" width="14" height="4" fill="#fff6" />
              <circle cx="300" cy="284" r="9" fill="#c98d63" />
              <path d="M289 282 a11 9 0 0 1 22 0z" fill="#ff8a1f" />
              <rect x="268" y="300" width="22" height="5" rx="2" fill="#ffb21f" transform="rotate(-25 290 302)" />
            </g>
            </g>
          </svg>
        </div>
        <div className="tm-text">
          <h1 className="tm-h1">
            We&apos;re Improving Your <span>Traffic Experience.</span>
          </h1>
          <p className="tm-lead">
            Our traffic monitoring system is temporarily under maintenance. We&apos;re working to
            restore services as soon as possible.
          </p>
        </div>
      </div>
    </main>
  );
}
