import React from 'react';
import { css } from 'emotion';

import { AbuseReportForm } from './AbuseReportForm';

export default { title: 'Abuse Report Form' };

const wrapperStyles = css`
    padding: 20px;
    height: 300px;
    width: 400px;
    background-color: blue;
    position: relative;
`;

export const Dialog = () => (
    <div className={wrapperStyles}>
        <AbuseReportForm
            toggleSetShowForm={() => {}}
            pillar={'sport'}
            commentId={123}
        />
    </div>
);
