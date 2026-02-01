"use client";

interface BackgroundWaveProps {
  fillColor?: string; // optional, user can override
}

const BackgroundWave = ({ fillColor = "#D9EBFF" }: BackgroundWaveProps) => {
  return (
    <svg
      viewBox="0 0 1440 181"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <path
        d="M719.5 95.3514C879.05 191.576 1305.78 240.284 1440 55.2983V0H0V102.128C276.552 141.982 542.729 -11.2598 719.5 95.3514Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default BackgroundWave;
