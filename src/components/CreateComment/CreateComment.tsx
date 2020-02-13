import React from "react";
import { css } from "emotion";
// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

type Props = {
  shortUrl: string;
};

const containerStyles = css`
  display: flex;
  flex-direction: row;
`;

export const CreateComment = () => {
  return <div className={containerStyles}>CreateComment</div>;
};