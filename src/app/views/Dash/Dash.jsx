import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography, Button } from 'investiraComponents';
//import { Typography } from 'investiraLib';
import { logout } from './DashViewActions';
import Style from './Dash.module.scss';

export class Dash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            welcome: 'Hello World'
        };
    }

    render() {
        return (
            <div className={Style.root}>
                <div className={Style.content}>
                    <Typography variant={'h2'} color={'textPrimary'} gutterBottom>
                        {this.state.welcome}
                    </Typography>
                    <Typography variant={'subtitle1'} color={'textPrimary'}>
                        {this.props.username}
                    </Typography>
                    <Button variant={'outlined'} color={'primary'} onClick={this.props.logout}>
                        Logout
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.user.username,
        usuario_id: state.user.usuario_id
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            logout
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
