import React, { useState, useEffect, useCallback } from 'react';
import Content from './Content';
import { MobileStepper, IconButton, Icon } from 'investira.react.components';
import Style from './TourGuide.module.scss';

const ContentNavigator = ({ content, onFinish }) => {
    const [page, setPage] = useState(0);

    const handleNext = () => {
        setPage(page + 1);
    };

    const handleBack = () => {
        setPage(page - 1);
    };

    const handleFinish = useCallback(() => {
        onFinish && onFinish();
    }, [onFinish]);

    useEffect(() => {
        if (page === content.length - 1) {
            handleFinish();
        }
    }, [page, content, handleFinish]);

    return (
        <>
            <Content data={content} page={page} />
            <div className={Style.navigator}>
                <MobileStepper
                    variant={'progress'}
                    steps={content.length}
                    position={'static'}
                    activeStep={page}
                    nextButton={
                        <IconButton
                            size={'small'}
                            onClick={handleNext}
                            disabled={page === content.length - 1}>
                            <Icon
                                iconName={'arrow-next'}
                                color={page === content.length - 1 ? 'textSecondary' : 'primary'}
                            />
                        </IconButton>
                    }
                    backButton={
                        <IconButton size={'small'} onClick={handleBack} disabled={page === 0}>
                            <Icon
                                iconName={'arrow-previous'}
                                color={page === 0 ? 'textSecondary' : 'primary'}
                            />
                        </IconButton>
                    }>
                    ContentNavigator
                </MobileStepper>
            </div>
        </>
    );
};

ContentNavigator.displayName = 'TourGuideContentNavigator';

export default ContentNavigator;
