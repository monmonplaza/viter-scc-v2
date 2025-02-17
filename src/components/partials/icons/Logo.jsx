import React from "react";

const Logo = () => {
  return (
    <svg
      width="30"
      height="20"
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
    >
      <rect width="30" height="20" fill="url(#pattern0_1_43)" />
      <defs>
        <pattern
          id="pattern0_1_43"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            href="#image0_1_43"
            transform="matrix(0.0166667 0 0 0.0261905 0 -0.0107143)"
          />
        </pattern>
        <image
          id="image0_1_43"
          width="60"
          height="39"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default Logo;
