import React, { useState } from "react";
import { css, cx } from "emotion";

import { space, palette } from "@guardian/src-foundations";
import { neutral, background } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";

import { GuardianStaff, GuardianPick } from "../Badges/Badges";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { AbuseReportForm } from "../AbuseReportForm/AbuseReportForm";
import { Timestamp } from "../Timestamp/Timestamp";
import { Avatar } from "../Avatar/Avatar";

import { Pillar, CommentType, UserProfile } from "../../types";
import { pickComment, unPickComment } from "../../lib/api";
import { joinUrl } from "../../lib/joinUrl";

type Props = {
  baseUrl: string;
  user?: UserProfile;
  comment: CommentType;
  pillar: Pillar;
  setCommentBeingRepliedTo: (commentBeingRepliedTo?: CommentType) => void;
  isReply: boolean;
};

const commentControls = css`
  list-style: none;
  ${textSans.xsmall()};
  display: flex;
  align-items: flex-start;
`;

const commentControlsButton = (pillar: Pillar) => css`
  ${textSans.xsmall({ fontWeight: "bold" })}
  margin-right: ${space[2]}px;
  color: ${palette[pillar][400]};
  background-color: ${background.primary};
  border: 0;
  cursor: pointer;
  :hover {
    text-decoration: underline
  }
`;

const spaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

const commentCss = css`
  display: block;
  clear: left;
  ${textSans.small()}
  margin-top: 0.375rem;
  margin-bottom: 0.5rem;
`;

const blockedCommentStyles = css`
  color: ${neutral[60]};
  ${textSans.xsmall()}
`;

// to override a tag styles from dangerouslySetInnerHTML
const commentLinkStyling = css`
  a {
    color: ${palette.brand[500]};
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

const commentWrapper = css`
  border-bottom: 1px solid ${neutral[86]};
  display: flex;
  padding: ${space[2]}px 0;
`;

const avatarMargin = css`
  margin-right: ${space[2]}px;
`;

const commentProfileName = (pillar: Pillar) => css`
  margin-top: 0;
  color: ${palette[pillar][400]};
  ${textSans.small()};
  font-weight: bold;
`;

const commentDetails = css`
  flex-grow: 1;
`;

const headerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const iconWrapper = css`
  padding: 2px;
  white-space: nowrap;
`;

const timestampWrapperStyles = css`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const linkStyles = css`
  color: inherit;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const flexRowStyles = css`
  display: flex;
  flex-direction: row;
`;

const removePaddingLeft = css`
  padding-left: 0px;
`;

const Column = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
    `}
  >
    {children}
  </div>
);

const Row = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      display: flex;
      flex-direction: row;
    `}
  >
    {children}
  </div>
);

const ReplyArrow = () => (
  <svg
    width="18"
    height="18"
    className={css`
      fill: ${neutral[46]};
    `}
  >
    <path d="M10.1 5l.9-1 4 4.5v1L11 14l-.9-1 2.5-3H4L3 9V6.5h2V8h7.6l-2.5-3z"></path>
  </svg>
);

export const Comment = ({
  baseUrl,
  comment,
  pillar,
  setCommentBeingRepliedTo,
  user,
  isReply
}: Props) => {
  const commentControlsButtonStyles = commentControlsButton(pillar);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(
    comment.isHighlighted
  );
  const [error, setError] = useState<string>();

  const pick = async () => {
    setError("");
    const response = await pickComment(comment.id);
    if (response.status === "error") {
      setError(response.message);
    } else {
      setIsHighlighted(true);
    }
  };

  const unPick = async () => {
    setError("");
    const response = await unPickComment(comment.id);
    if (response.status === "error") {
      setError(response.message);
    } else {
      setIsHighlighted(false);
    }
  };

  return (
    <>
      {error && (
        <span
          className={css`
            color: red;
          `}
        >
          {error}
        </span>
      )}
      <div className={commentWrapper}>
        <div className={avatarMargin}>
          <Avatar
            imageUrl={comment.userProfile.avatar}
            displayName={comment.userProfile.displayName}
            size={isReply ? "small" : "medium"}
          />
        </div>

        <div className={commentDetails}>
          <header className={headerStyles}>
            <Column>
              <Row>
                <div className={commentProfileName(pillar)}>
                  <a
                    href={joinUrl([
                      "https://profile.theguardian.com/user",
                      comment.userProfile.userId
                    ])}
                    className={linkStyles}
                  >
                    {comment.userProfile.displayName}
                  </a>
                </div>
                <div className={timestampWrapperStyles}>
                  <Timestamp
                    isoDateTime={comment.isoDateTime}
                    linkTo={joinUrl([
                      // Remove the discussion-api path from the baseUrl
                      baseUrl
                        .split("/")
                        .filter(path => path !== "discussion-api")
                        .join("/"),
                      "comment-permalink",
                      comment.id.toString()
                    ])}
                  />
                </div>
              </Row>
              <Row>
                {!!comment.userProfile.badge.filter(
                  obj => obj["name"] === "Staff"
                ) && (
                  <div className={iconWrapper}>
                    <GuardianStaff />
                  </div>
                )}
                {comment.status !== "blocked" && isHighlighted ? (
                  <div className={iconWrapper}>
                    <GuardianPick />
                  </div>
                ) : (
                  <></>
                )}
              </Row>
            </Column>
            {comment.status !== "blocked" && (
              <RecommendationCount
                commentId={comment.id}
                initialCount={comment.numRecommends}
                alreadyRecommended={false}
              />
            )}
          </header>
          {comment.status !== "blocked" ? (
            <>
              <div
                className={cx(commentCss, commentLinkStyling)}
                dangerouslySetInnerHTML={{ __html: comment.body }}
              />
              <div className={spaceBetween}>
                <div className={commentControls}>
                  <button
                    onClick={() => setCommentBeingRepliedTo(comment)}
                    className={cx(
                      commentControlsButtonStyles,
                      removePaddingLeft
                    )}
                  >
                    <div className={flexRowStyles}>
                      <ReplyArrow />
                      Reply
                    </div>
                  </button>
                  <button className={commentControlsButtonStyles}>Share</button>
                  {/* Only staff can pick, and they cannot pick thier own comment */}
                  {user &&
                    user.badge.some(e => e.name === "Staff") &&
                    user.userId !== comment.userProfile.userId && (
                      <button
                        onClick={isHighlighted ? unPick : pick}
                        className={commentControlsButtonStyles}
                      >
                        {isHighlighted ? "Unpick" : "Pick"}
                      </button>
                    )}
                </div>
                <div>
                  <AbuseReportForm commentId={comment.id} pillar={pillar} />
                </div>
              </div>
            </>
          ) : (
            <p
              className={cx(blockedCommentStyles, commentLinkStyling)}
              dangerouslySetInnerHTML={{ __html: comment.body }}
            />
          )}
        </div>
      </div>
    </>
  );
};
