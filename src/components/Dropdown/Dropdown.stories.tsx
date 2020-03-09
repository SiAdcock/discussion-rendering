import React from "react";
import { css } from "emotion";

import { palette } from "@guardian/src-foundations";

import { Dropdown } from "./Dropdown";

const Header = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      height: 300px;
      width: 100%;
      background-color: ${palette.brand.main};
    `}
  >
    {children}
  </div>
);

const Nav = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      height: 20px;
      position: absolute;
      top: 10px;
      display: block;
      right: 258px;
      width: 197px;
      z-index: 1072;
      transform: translateX(100%);
      padding-top: 7px;
    `}
  >
    {children}
  </div>
);

const links = [
  {
    url: "/preference/edition/uk",
    title: "UK edition",
    dataLinkName: "linkname-UK"
  },
  {
    url: "/preference/edition/us",
    title: "US edition",
    isActive: true,
    dataLinkName: "linkname-US"
  },
  {
    url: "/preference/edition/au",
    title: "Australian edition",
    dataLinkName: "linkname-AU"
  },
  {
    url: "/preference/edition/int",
    title: "International edition",
    dataLinkName: "linkname-INT"
  }
];

const linksWithNoneActive = [
  {
    ...links[0],
    isActive: false
  },
  { ...links[1] },
  { ...links[2] },
  { ...links[3] }
];

/* tslint:disable */
export default {
  component: Dropdown,
  title: "Dropdown"
};
/* tslint:enable */

export const DropdownActive = () => (
  <Header>
    <Nav>
      <Dropdown
        id="d1"
        label="UK edition"
        links={links}
        dataLinkName="linkname1"
      />
    </Nav>
  </Header>
);
DropdownActive.story = { name: "Dropdown with first item active" };

export const DropdownNoActive = () => (
  <Header>
    <Nav>
      <Dropdown
        id="d2"
        label="UK edition"
        links={linksWithNoneActive}
        dataLinkName="linkname2"
      />
    </Nav>
  </Header>
);
DropdownNoActive.story = { name: "Dropdown with nothing active" };
