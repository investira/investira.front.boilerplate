import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { arrays } from 'investira.sdk';
import { browsers } from 'investira.react.lib';
import {
    Drawer,
    Typography,
    IconButton,
    Button,
    RadioGroup,
    Radio,
    FormControlLabel,
    Menu,
    MenuItem,
    ListItemText,
    Chip,
    Icon,
    NavBar
} from 'investira.react.components';
import { KEYWORDS } from '../../../const';
import { MainTemplate } from '../../components/templates';
import services from '../../../services';
import withResponseHandling from '../../../hoc/withResponseHandling';
import Style from './SearchFilter.module.scss';

class SearchFilter extends PureComponent {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.initialState = {
            filters: {},
            openSetores: false,
            anchorEl: null,
            sort: ''
        };

        this.state = {
            setores: {},
            ...this.initialState
        };

        this.cancel = null;
    }

    getSetores = () => {
        let xReqAttrs = {
            params: {
                nivel: 0,
                sort: 'nivel,setor'
            }
        };

        if (browsers.isOnline()) {
            services.setores.list(
                { ...xReqAttrs },
                rRes => {
                    this._isMounted && this.setState({ setores: rRes.data });
                },
                rErr => {
                    const xCallbacks = {
                        err404: () => {}
                    };
                    this.props.responseErrorHandling(rErr, xCallbacks);
                }
            );
        }
    };

    getSetoresSelecionados = () => {
        let xAtividadeClasse = [];

        for (const xKey in this.state.setores) {
            let xSetor = this.state.setores[xKey];
            if (xSetor.selected) {
                xAtividadeClasse = [...xAtividadeClasse, ...xSetor.id];
            }
        }

        return xAtividadeClasse;
    };

    resetFilter = () => {
        const xResetedSetores = Object.values(this.state.setores).map(xSetor => {
            xSetor.selected = false;
            return xSetor;
        });

        const xSetores = arrays.arrayToObject(xResetedSetores, 'id');

        this.setState({ ...this.initialState, setores: xSetores });
    };

    closeModal = () => {
        this.props.onClose && this.props.onClose();
    };

    handleChangeSort = pEvent => {
        this.setState({
            sort: pEvent.target.value
        });
    };

    handleOpenSetores = pEvent => {
        this.setState({
            anchorEl: pEvent.currentTarget,
            openSetores: true
        });
    };

    handleCloseSetores = () => {
        this.setState({
            openSetores: false
        });
    };

    handleMultipleSelect = pEvent => {
        const xSetores = { ...this.state.setores };
        const xSetor = xSetores[pEvent.currentTarget.id];
        xSetor.selected = !xSetor.selected;

        this.setState({
            setores: {
                ...xSetores
            }
        });
    };

    handleUnselected = pChipId => {
        const xSetores = { ...this.state.setores };
        xSetores[pChipId].selected = false;
        this.setState({
            setores: {
                ...xSetores
            }
        });
    };

    handleClose = () => {
        this.resetFilter();
        this.closeModal();
    };

    handleReset = () => {
        this.resetFilter();
    };

    handleApply = () => {
        const xSetores = this.getSetoresSelecionados().join(',');

        this.props.onClick &&
            this.props.onClick({
                setor: xSetores || null,
                sort: this.state.sort || null
            });
        this.closeModal();
    };

    componentDidMount() {
        this._isMounted = true;
        this.getSetores();
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.cancel && this.cancel.cancel();
    }

    render() {
        return (
            <Drawer anchor={'bottom'} open={this.props.open}>
                <MainTemplate>
                    <NavBar
                        center={
                            <Typography variant={'h6'} color={'textPrimary'}>
                                Filtros
                            </Typography>
                        }
                        right={
                            <IconButton color={'primary'} onClick={this.handleClose}>
                                <Icon size={21} iconName={'cancel'} />
                            </IconButton>
                        }
                    />
                    <div className={Style.body}>
                        <div className={Style.group}>
                            <Typography variant={'caption'} color={'textSecondary'} gutterBottom>
                                {KEYWORDS.SETOR}:
                            </Typography>

                            <div className={Style.setores}>
                                <div className={Style.select}>
                                    <IconButton onClick={this.handleOpenSetores} color={'primary'}>
                                        <Icon size={21} iconName={'insert'} />
                                    </IconButton>
                                    <Menu
                                        id={'long-menu'}
                                        anchorEl={this.state.anchorEl}
                                        keepMounted
                                        open={this.state.openSetores}
                                        onClose={this.handleCloseSetores}
                                        style={{ maxHeight: '74vh' }}>
                                        {Object.values(this.state.setores).map(xSetor => (
                                            <MenuItem
                                                dense
                                                key={xSetor.id}
                                                id={xSetor.id}
                                                onClick={this.handleMultipleSelect}
                                                style={{
                                                    transition: 'all .2s ease-in .1s',
                                                    background: xSetor.selected
                                                        ? 'var(--color-secondary-lightness)'
                                                        : 'none'
                                                }}>
                                                <ListItemText
                                                    primary={
                                                        <div
                                                            className={Style.truncate}
                                                            style={{
                                                                transition: 'all .2s ease-in .2s',
                                                                color: xSetor.selected
                                                                    ? 'var(--color-black-90)'
                                                                    : 'inherit'
                                                            }}>
                                                            <Typography
                                                                variant={'caption'}
                                                                color={'inherit'}>
                                                                {xSetor.setor}
                                                            </Typography>
                                                        </div>
                                                    }
                                                />
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>

                                {Object.values(this.state.setores).map(xSetor => {
                                    if (xSetor.selected) {
                                        return (
                                            <div className={Style.chipWrap} key={xSetor.id}>
                                                <Chip
                                                    variant={'outlined'}
                                                    style={{
                                                        maxWidth: '100%'
                                                    }}
                                                    size={'small'}
                                                    color={'primary'}
                                                    label={xSetor.setor}
                                                    onDelete={() =>
                                                        this.handleUnselected(xSetor.id)
                                                    }
                                                />
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </div>
                        <div className={Style.group}>
                            <Typography variant={'caption'} color={'textSecondary'} gutterBottom>
                                {KEYWORDS.ORDENARPOR}:
                            </Typography>

                            <RadioGroup
                                aria-label="ordenar por"
                                name="sort"
                                value={this.state.sort}
                                onChange={this.handleChangeSort}>
                                <div className={Style.sort}>
                                    <FormControlLabel
                                        value={''}
                                        className={Style.fullWidth}
                                        control={<Radio />}
                                        label="nome"
                                    />
                                    <FormControlLabel
                                        value="operadas"
                                        className={Style.fullWidth}
                                        control={<Radio />}
                                        label="mais operadas"
                                    />
                                    <FormControlLabel
                                        value="valorizacao"
                                        className={Style.fullWidth}
                                        control={<Radio />}
                                        label="mais valorizadas"
                                    />
                                </div>
                            </RadioGroup>
                        </div>

                        <div className={Style.actions}>
                            <div className={Style.btnWrap}>
                                <Button onClick={this.handleReset} color={'primary'} fullWidth>
                                    {KEYWORDS.LIMPAR}
                                </Button>
                            </div>
                            <div className={Style.btnWrap}>
                                <Button
                                    onClick={this.handleApply}
                                    color={'primary'}
                                    fullWidth
                                    variant={'outlined'}>
                                    {KEYWORDS.APLICAR}
                                </Button>
                            </div>
                        </div>
                    </div>
                </MainTemplate>
            </Drawer>
        );
    }
}

SearchFilter.propTypes = {
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    open: PropTypes.bool
};

export default withResponseHandling(SearchFilter);
