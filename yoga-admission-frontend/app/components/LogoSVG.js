export default function LogoSVG() {
  return (
    <svg
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-48 h-48 mx-auto"
    >
      {/* Background circle */}
      <circle cx="150" cy="150" r="140" fill="#f5f5f5" />

      {/* Lotus flower petals */}
      <g transform="translate(150 150)">
        {/* Inner petals */}
        <path
          d="M0,-60 C30,-50 30,-20 0,-20 C-30,-20 -30,-50 0,-60"
          fill="#7c4dff"
          opacity="0.9"
        />
        <path
          d="M52,30 C67,0 52,-30 30,-17.3 C8,-4.6 23,25.6 52,30"
          fill="#7c4dff"
          opacity="0.9"
          transform="rotate(72)"
        />
        <path
          d="M52,30 C67,0 52,-30 30,-17.3 C8,-4.6 23,25.6 52,30"
          fill="#7c4dff"
          opacity="0.9"
          transform="rotate(144)"
        />
        <path
          d="M52,30 C67,0 52,-30 30,-17.3 C8,-4.6 23,25.6 52,30"
          fill="#7c4dff"
          opacity="0.9"
          transform="rotate(216)"
        />
        <path
          d="M52,30 C67,0 52,-30 30,-17.3 C8,-4.6 23,25.6 52,30"
          fill="#7c4dff"
          opacity="0.9"
          transform="rotate(288)"
        />

        {/* Outer petals */}
        <path
          d="M0,-90 C45,-75 45,-30 0,-30 C-45,-30 -45,-75 0,-90"
          fill="#9575cd"
          opacity="0.7"
        />
        <path
          d="M78,45 C100,0 78,-45 45,-26 C12,-7 34,38.4 78,45"
          fill="#9575cd"
          opacity="0.7"
          transform="rotate(72)"
        />
        <path
          d="M78,45 C100,0 78,-45 45,-26 C12,-7 34,38.4 78,45"
          fill="#9575cd"
          opacity="0.7"
          transform="rotate(144)"
        />
        <path
          d="M78,45 C100,0 78,-45 45,-26 C12,-7 34,38.4 78,45"
          fill="#9575cd"
          opacity="0.7"
          transform="rotate(216)"
        />
        <path
          d="M78,45 C100,0 78,-45 45,-26 C12,-7 34,38.4 78,45"
          fill="#9575cd"
          opacity="0.7"
          transform="rotate(288)"
        />
      </g>

      {/* Dharma wheel center */}
      <circle cx="150" cy="150" r="15" fill="#673ab7" />

      {/* Updated Text */}
      <g transform="translate(150, 245)">
        <text
          textAnchor="middle"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="22"
          fontWeight="300"
          letterSpacing="3"
          fill="#333333"
        >
          DHARMA
        </text>
      </g>
      <g transform="translate(150, 270)">
        <text
          textAnchor="middle"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="16"
          fontWeight="300"
          letterSpacing="5"
          fill="#666666"
        >
          YOGA CENTER
        </text>
      </g>
    </svg>
  );
}
