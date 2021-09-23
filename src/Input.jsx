import styled from "@emotion/styled";
import { Base } from "./Base";
import { color } from "./theme";

export const Input = styled(Base.withComponent("input"))({
  backgroundColor: color.lightGrey,
  border: "none",
  fontSize: "1rem",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  width: "100%",
  outline: "none",
  ":focus": {
    boxShadow: `0 0 0 2px white, 0 0 0 4px ${color.blue}`
  }
});
