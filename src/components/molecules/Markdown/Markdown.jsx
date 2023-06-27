import React from 'react';
import { Typography } from 'investira.react.components';
import { validators } from 'investira.sdk';
import PropTypes from 'prop-types';

/* símbolos para variantes de Typography do Material UI
     @ -> subtitle1
     @@ -> subtitle2
     % -> body1
     %% -> body2
     ˆ -> button
     ˆˆ -> caption
     ˆˆˆ -> overline
*/

/* símbolos para ênfase
    {} -> negrito
*/
function Markdown(props) {
    const formatTag = pString => {
        let xTag = '';
        let xTagAmount = 0;
        return [
            formatBold(
                pString.replace(/(%)|(#)|(@)|(ˆ)/g, (match, p1, p2, p3, p4) => {
                    if (!validators.isUndefined(p1)) {
                        xTag = p1;
                        ++xTagAmount;
                        return '';
                    } else if (!validators.isUndefined(p2)) {
                        xTag = p2;
                        ++xTagAmount;
                        return '';
                    } else if (!validators.isUndefined(p3)) {
                        xTag = p3;
                        ++xTagAmount;
                        return '';
                    } else if (!validators.isUndefined(p4)) {
                        xTag = p4;
                        ++xTagAmount;
                        return '';
                    }
                })
            ),
            xTag,
            xTagAmount
        ];
    };

    const formatBold = pString => {
        return pString.replace(/([{])|([}])(?:(?=(\\?))\2.)*?/g, (match, p1, p2) => {
            if (!validators.isUndefined(p1)) {
                return '<b>';
            }
            if (!validators.isUndefined(p2)) {
                return '</b>';
            }
        });
    };

    const formatVariant = pString => {
        const xSymbols = {
            '%': ['caption', 'body1', 'body2'],
            '#': ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            '@': ['caption', 'subtitle1', 'subtitle2'],
            ˆ: ['caption', 'button', 'caption', 'overline']
        };
        const xFormatTagArray = formatTag(pString);
        return xSymbols[xFormatTagArray[1]][xFormatTagArray[2]];
    };

    const toJsx = pMarkdown => {
        /* Ao incluir nova formatação de ênfase (ex.: negrito, itálico), 
            adicionar seu símbolo finalizador no regex xAllLinesRegex. */
        const xAllLinesRegex = /(^[@ˆ#%](.*)[A-z0-9.?!}]$)|((\r\n|\n|\r)$)/gm;
        const xAllLines = pMarkdown.match(xAllLinesRegex);

        return xAllLines.map((xItem, xIndex) => {
            if (validators.isEmpty(xItem)) {
                return <br key={xIndex}></br>;
            } else {
                return (
                    <Typography key={xIndex} variant={formatVariant(xItem)} color={'textPrimary'}>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: formatTag(xItem)[0]
                            }}></span>
                    </Typography>
                );
            }
        });
    };

    return <div>{toJsx(props.children)}</div>;
}

Markdown.propTypes = {
    children: PropTypes.string
};

Markdown.displayName = 'Markdown';

export default Markdown;
