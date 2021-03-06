import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import { textSans, headline } from '@guardian/src-foundations/typography';
import { space, neutral } from '@guardian/src-foundations';
import { TextInput } from '@guardian/src-text-input';
import { Link } from '@guardian/src-link';
import { Row } from '../Row/Row';
import { PillarButton } from '../PillarButton/PillarButton';

import { preview } from '../../lib/api';

import { Pillar } from '../../types';

type Props = {
    body: string;
    pillar: Pillar;
    error?: string;
    submitForm: (userName: string) => void;
    cancelSubmit: () => void;
};

const previewStyle = css`
    padding: ${space[2]}px;
    background-color: ${neutral[93]};
    margin-bottom: ${space[5]}px;
    position: relative;
    min-height: ${space[9]}px;

    /* p is returned by API and this is the only way to apply styles */
    p {
        padding-left: ${space[2]}px;
    }
`;

const textStyling = css`
    ${textSans.small()};
`;

const Text = ({
    children,
}: {
    children: string | JSX.Element | JSX.Element[];
}) => <p className={textStyling}>{children}</p>;

export const FirstCommentWelcome = ({
    body,
    pillar,
    error = '',
    submitForm,
    cancelSubmit,
}: Props) => {
    const [previewBody, setPreviewBody] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        const fetchShowPreview = async () => {
            try {
                const response = await preview(body);
                setPreviewBody(response);
            } catch (e) {
                setPreviewBody('');
            }
        };
        fetchShowPreview();
    }, [body]);

    return (
        <div
            className={css`
                padding: ${space[2]}px;
            `}
        >
            <form
                onSubmit={e => {
                    e.preventDefault();
                    submitForm(userName);
                }}
            >
                <h3
                    className={css`
                        ${headline.xxsmall({ fontWeight: 'bold' })};
                    `}
                >
                    Welcome, you’re about to make your first comment!
                </h3>
                <Text>
                    Before you post, we’d like to thank you for joining the
                    debate - we’re glad you’ve chosen to participate and we
                    value your opinions and experiences.
                </Text>
                <Text>
                    Please choose your username under which you would like all
                    your comments to show up. You can only set your username
                    once.
                </Text>
                <TextInput
                    label="Username:"
                    supporting="Must be 6-20 characters, letters and/or numbers only, no spaces."
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    width={30}
                    error={error}
                />
                <Text>
                    <>
                        Please keep your posts respectful and abide by the{' '}
                        <Link
                            href="/community-standards"
                            priority="primary"
                            subdued={true}
                        >
                            <span className={textStyling}>
                                community guidelines
                            </span>
                        </Link>
                        {` -`} and if you spot a comment you think doesn’t
                        adhere to the guidelines, please use the ‘Report’ link
                        next to it to let us know.
                    </>
                </Text>
                <Text>
                    Please preview your comment below and click ‘post’ when
                    you’re happy with it.
                </Text>
                <div
                    className={cx(previewStyle, textStyling)}
                    dangerouslySetInnerHTML={{ __html: previewBody || '' }}
                />
                <Row>
                    <PillarButton
                        pillar={pillar}
                        onClick={() => submitForm(userName)}
                    >
                        Post your comment
                    </PillarButton>
                    <div
                        className={css`
                            width: ${space[3]}px;
                        `}
                    ></div>
                    <PillarButton
                        pillar={pillar}
                        priority="tertiary"
                        onClick={cancelSubmit}
                    >
                        Cancel
                    </PillarButton>
                </Row>
            </form>
        </div>
    );
};
