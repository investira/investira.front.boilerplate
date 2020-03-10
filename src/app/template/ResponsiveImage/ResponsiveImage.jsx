import React, { useState } from 'react';
import PropTypes from 'prop-types';
import noImage from './thumb_no_image.gif';
import noImage2x from './thumb_no_image@2x.gif';
import noImage3x from './thumb_no_image@3x.gif';
import Style from './ResponsiveImage.module.scss';

const ResponsiveImage = props => {
    const imagesSource = [];
    const imagesSrcSet = [];

    const [hasError, setHasError] = useState(false);

    // Em caso de erro no carregamento da imagem
    const handleError = pImage => {
        setHasError(true);
        props.error && props.error(false);
    };

    // Separara o que deve ser instanciado como source e srcset
    const filterImages = pSource => {
        for (const xItem of pSource) {
            if (xItem.media || xItem.type) {
                imagesSource.push(xItem);
            } else {
                imagesSrcSet.push(xItem);
            }
        }
    };

    filterImages(props.source);

    return hasError ? (
        <img
            className={props.className || Style.img}
            srcSet={`${noImage} 1x, ${noImage2x} 2x, ${noImage3x} 3x`}
            src={noImage}
            alt={props.alt}
            type={props.type}
        />
    ) : (
        <div className={Style.root}>
            <picture className={Style.picture}>
                {imagesSource.map((image, index) => {
                    return (
                        <source
                            key={index}
                            srcSet={image.srcSet}
                            media={image.media}
                            type={image.type}
                        />
                    );
                })}

                {imagesSrcSet[0] ? (
                    <img
                        className={props.className || Style.img}
                        srcSet={imagesSrcSet[0].srcSet}
                        alt={props.alt}
                        type={props.type}
                        onError={handleError}
                    />
                ) : null}
            </picture>
        </div>
    );
};

ResponsiveImage.propTypes = {
    source: PropTypes.array.isRequired,
    alt: PropTypes.string.isRequired,
    type: PropTypes.string
};

export default React.memo(ResponsiveImage);
