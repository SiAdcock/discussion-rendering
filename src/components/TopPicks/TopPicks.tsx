import React from "react";
import { css } from "emotion";
// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

type Props = {
  // picks: ?
};

const containerStyles = css`
  display: flex;
  flex-direction: row;
`;

export const TopPicks = () => {
  return <div className={containerStyles}>TopPicks</div>;
};