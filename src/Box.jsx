import styled from "@emotion/styled";
import { Base } from "./Base";

export const Box = styled(Base, {
  shouldForwardProp: (p) => p !== "style"
})(({ style }) => ({ ...style }));
