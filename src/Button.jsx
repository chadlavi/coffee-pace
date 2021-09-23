import styled from "@emotion/styled";
import { Base } from "./Base";
import { breakpoint, color, font } from "./theme";

const BUTTON_SIZE = 80;

export const Button = styled(Base.withComponent("button"), {
  shouldForwardProp: (p) => !["start", "stop"].includes(p)
})(({ start, stop, disabled }) => ({
  appearance: "none",
  cursor: "pointer",
  borderRadius: "100%",
  height: BUTTON_SIZE,
  width: BUTTON_SIZE,
  [`@media (max-width: ${breakpoint.xs}px)`]: {
    width: "25vw",
    height: "25vw"
  },
  fontSize: BUTTON_SIZE / 4,
  WebkitFontSmoothing: "antialiased",
  fontWeight: 500,
  margin: 0,
  padding: 0,
  fontFamily: font,
  border: "none",
  outline: "none",
  WebkitTapHighlightColor: "transparent",
  transition: "opacity ease-out 150ms",
  ":focus": {
    boxShadow: "0 0 0 2px white, 0 0 0 4px"
  },
  color: start ? color.green : stop ? color.red : color.text,
  backgroundColor: start
    ? `${color.green}19`
    : stop
    ? `${color.red}19`
    : `${color.text}09`,
  ...(disabled && {
    opacity: 0.3,
    cursor: "not-allowed"
  })
}));
