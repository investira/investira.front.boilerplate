import React from 'react';

const css = `
.linha1{ stroke-dasharray:517 519; stroke-dashoffset:518; } .start .linha1{ animation:draw 600ms ease-in-out 0ms forwards; } .linha2{ stroke-dasharray:175 177; stroke-dashoffset:176; } .start .linha2{ animation:draw 600ms ease-in-out 66ms forwards; } .linha3{ stroke-dasharray:0 2; stroke-dashoffset:1; } .start .linha3{ animation:draw 600ms ease-in-out 133ms forwards; } .linha4{ stroke-dasharray:124 126; stroke-dashoffset:125; } .start .linha4{ animation:draw 600ms ease-in-out 200ms forwards; } @keyframes draw{ 100%{stroke-dashoffset:0;} } @keyframes fade{ 0%{stroke-opacity:1;} 92%{stroke-opacity:1;} 100%{stroke-opacity:0;} }
`;

const IconRemember = () => {
    return (
        <svg width="200px" height="200px" x="0px" y="0px" className="start" viewBox="0 0 200 200">
            <g id="senha-lembrar">
                <g>
                    <path
                        fill="none"
                        stroke="#00DFA8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                        d="
			M175,92.629C175,77.684,163.898,66,149.93,66H49.805C35.836,66,25,77.684,25,92.629v76.672C25,184.246,35.836,196,49.805,196
			H149.93c13.969,0,25.07-11.754,25.07-26.699V92.629z"
                        className="linha1"
                    />
                    <path
                        fill="none"
                        stroke="#00DFA8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="6"
                        d="
			M56,66V46.16C56,23.253,74.696,4,98.894,4H99.4C123.598,4,143,23.253,143,46.16V66"
                        className="linha2"
                    />
                    <g>
                        <path
                            fill="none"
                            stroke="#00DFA8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="10"
                            d="M103.122,169.301L103.122,169.301"
                            className="linha3"
                        />
                        <path
                            fill="none"
                            stroke="#00DFA8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="6"
                            d="
				M70.934,102.652c6.964-8.479,17.046-12.719,30.246-12.719c8.25,0,14.791,1.846,19.627,5.534
				c4.834,3.691,7.252,8.631,7.252,14.816c0,3.759-0.779,7.011-2.338,9.76s-3.777,5.493-6.632,8.25
				c-2.37,2.285-4.728,4.613-7.116,6.941c-2.881,2.805-5.121,5.604-6.701,8.42c-1.582,2.82-2.373,6.199-2.373,10.141"
                            className="linha4"
                        />
                    </g>
                </g>
            </g>
            <style>{css}</style>
        </svg>
    );
};

IconRemember.displayName = 'IconRemember';

export default IconRemember;
