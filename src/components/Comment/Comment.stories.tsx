import React from "react";

import { Comment } from "./Comment";
import { Comment as CommentModel } from "../../lib/api";

export default { title: "Comment" };

const commentData: CommentModel = {
  id: 25487686,
  body:
    "<p>Beau Jos pizza in Idaho Springs is a great place for mountain pizza pies. Order one with extra thick crust and drizzle it with honey. Y'all can try the Challenge if you fancy, and sketch on your napkins so your art can join their walls. This was 15 years ago, but I hope it's still there! As for music, anything from Boulder's own Big Head Todd &amp; the Monsters - 'Broken Hearted Savior' is a good start, with 'Bittersweet' a good road track. I'm jealous!!!</p>",
  date: "26 July 2013 4:13pm",
  isoDateTime: new Date("2013-07-26T15:13:20Z"),
  status: "visible",
  webUrl: "https://discussion.theguardian.com/comment-permalink/25487686",
  apiUrl: "https://discussion.guardianapis.com/discussion-api/comment/25487686",
  numRecommends: 0,
  isHighlighted: false,
  userProfile: {
    userId: "2762428",
    displayName: "FrankDeFord",
    webUrl: "https://profile.theguardian.com/user/id/2762428",
    apiUrl:
      "https://discussion.guardianapis.com/discussion-api/profile/2762428",
    avatar: "https://avatar.guim.co.uk/user/2762428",
    secureAvatarUrl: "https://avatar.guim.co.uk/user/2762428",
    badge: []
  },
  responses: [],
  metaData: {
    commentCount: 2,
    staffCommenterCount: 1,
    editorsPickCount: 0,
    blockedCount: 0,
    responseCount: 1
  }
};

// const commentDataThreaded: CommentModel[] = commentData.responses?.push({
//   id: 25488498,
//   body: "<p>It's still there FrankDeFord - and thanks, I will pass that on</p>",
//   date: "26 July 2013 4:35pm",
//   isoDateTime: new Date("2013-07-26T15:13:20Z"),
//   status: "visible",
//   webUrl: "https://discussion.theguardian.com/comment-permalink/25488498",
//   apiUrl: "https://discussion.guardianapis.com/discussion-api/comment/25488498",
//   numRecommends: 0,
//   isHighlighted: false,
//   responseTo: {
//     displayName: "FrankDeFord",
//     commentApiUrl:
//       "https://discussion.guardianapis.com/discussion-api/comment/25487686",
//     isoDateTime: new Date("2013-07-26T15:13:20Z"),
//     date: "26 July 2013 4:13pm",
//     commentId: "25487686",
//     commentWebUrl:
//       "https://discussion.theguardian.com/comment-permalink/25487686"
//   },
//   userProfile: {
//     userId: "3150446",
//     displayName: "AndyPietrasik",
//     webUrl: "https://profile.theguardian.com/user/id/3150446",
//     apiUrl:
//       "https://discussion.guardianapis.com/discussion-api/profile/3150446",
//     avatar: "https://avatar.guim.co.uk/user/3150446",
//     secureAvatarUrl: "https://avatar.guim.co.uk/user/3150446",
//     badge: [
//       {
//         name: "Staff"
//       }
//     ]
//   }
// });

export const defaultStory = () => (
  <Comment comment={commentData} pillar={"sport"} />
);
defaultStory.story = { name: "Comment" };

// export const threadedComment = () => (
//   <Comment comment={commentDataThreaded} pillar={"lifestyle"} />
// );
// defaultStory.story = { name: "Comment Threaded" };