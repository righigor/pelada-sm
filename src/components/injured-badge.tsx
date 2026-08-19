export default function InjuredBandage() {
  return (
    <div className="pointer-events-none absolute -left-2 -top-2 z-20 w-7 rotate-[-12deg] md:-left-2.5 md:-top-2.5 md:w-9">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full drop-shadow-md"
      >
        <g transform="rotate(45 50 50)">
          <rect x="8" y="37" width="84" height="26" rx="13" fill="#f1d5b5" stroke="#d2b48c" strokeWidth="2" />
          <rect x="38" y="39" width="24" height="22" rx="5" fill="#dfbd96" />

          <circle cx="20" cy="45" r="1.5" fill="#c9a77f" />
          <circle cx="20" cy="55" r="1.5" fill="#c9a77f" />
          <circle cx="28" cy="45" r="1.5" fill="#c9a77f" />
          <circle cx="28" cy="55" r="1.5" fill="#c9a77f" />

          <circle cx="72" cy="45" r="1.5" fill="#c9a77f" />
          <circle cx="72" cy="55" r="1.5" fill="#c9a77f" />
          <circle cx="80" cy="45" r="1.5" fill="#c9a77f" />
          <circle cx="80" cy="55" r="1.5" fill="#c9a77f" />
        </g>

        <g transform="rotate(-45 50 50)">
          <rect x="8" y="37" width="84" height="26" rx="13" fill="#f6dfc4" stroke="#d2b48c" strokeWidth="2" />
          <rect x="38" y="39" width="24" height="22" rx="5" fill="#e4c39e" />

          <circle cx="20" cy="45" r="1.5" fill="#c9a77f" />
          <circle cx="20" cy="55" r="1.5" fill="#c9a77f" />
          <circle cx="28" cy="45" r="1.5" fill="#c9a77f" />
          <circle cx="28" cy="55" r="1.5" fill="#c9a77f" />

          <circle cx="72" cy="45" r="1.5" fill="#c9a77f" />
          <circle cx="72" cy="55" r="1.5" fill="#c9a77f" />
          <circle cx="80" cy="45" r="1.5" fill="#c9a77f" />
          <circle cx="80" cy="55" r="1.5" fill="#c9a77f" />
        </g>
      </svg>
    </div>
  );
}