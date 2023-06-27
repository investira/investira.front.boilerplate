import React from 'react';
import { Typography } from 'investira.react.components';
import Style from './TourGuide.module.scss';

const Content = ({ data, page }) => {
    const { subtitle, content, image } = data[page];

    return (
        <>
            {image && (
                <div className={Style.imageArea}>
                    <img src={image} alt={subtitle} />
                </div>
            )}
            {subtitle && (
                <Typography color={'textPrimary'} variant={'subtitle1'}>
                    <b>{subtitle}</b>
                </Typography>
            )}
            {content && (
                <Typography color={'textPrimary'} variant={'body2'} gutterBottom>
                    {content}
                </Typography>
            )}
        </>
    );
};

Content.displayName = 'TourGuideContent';

export default Content;
