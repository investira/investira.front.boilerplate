import React, { Component } from 'react';
import CenterInView from '../../template/CenterInView';
import { Typography, Button } from 'investiraComponents';
import Style from './ErrorBody.module.scss';

class ErrorBody extends Component {
    render() {
        return (
            <div className={Style.root}>
                <CenterInView>
                    <div className={Style.body}>
                        {this.props.d !== '' && (
                            <div className={Style.img}>
                                <svg
                                    x="0px"
                                    y="0px"
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 24 24">
                                    <path
                                        className={Style.fill}
                                        d={this.props.d}
                                    />
                                </svg>
                            </div>
                        )}

                        <Typography
                            variant={'body1'}
                            color={'textPrimary'}
                            gutterBottom>
                            {this.props.message}
                        </Typography>

                        {/* <IconButton onClick={this.props.handleClick}>
                            <Icon iconName={'refresh'} color={'primary'} />
                        </IconButton> */}
                        <Button
                            onClick={this.props.handleClick}
                            variant={'outlined'}
                            color={'primary'}>
                            Tentar Novamente
                        </Button>
                    </div>
                </CenterInView>
            </div>
        );
    }
}

export default ErrorBody;
