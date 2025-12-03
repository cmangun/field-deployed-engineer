interface ButtonBlurFilterProps {
  filterId?: string;
}
export const ButtonBlurFilter:React.FC<ButtonBlurFilterProps>= ({filterId="buttonFilter1"}) => (
  <svg width="0" height="0">
    <defs>
      <filter id={filterId}>
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix
          in="blur"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
        />
        <feComposite in="SourceGraphic" in2={filterId} operator="atop" />
        <feBlend in="SourceGraphic" in2={filterId} />
      </filter>
    </defs>
  </svg>
);

