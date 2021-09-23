import styled from "@emotion/styled";
import { color, font } from "./theme";

export const Base = styled("div")({
  fontFamily: font.sans,
  WebkitFontSmoothing: "antialiased",
  boxSizing: "border-box",
  color: color.text,
  fontVariantNumeric: "tabular-nums"
});
