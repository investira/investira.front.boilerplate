import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Icon,
    Container,
    NavBar
} from 'investira.react.components';

import { RouteBackButton } from '../../components/molecules';
import { MainTemplate } from '../../components/templates';
import app from '../../utils/app';

function Configuracoes() {
    const history = useHistory();

    const views = {
        password: {
            slug: 'change-password',
            label: 'Alterar senha'
        },
        logout: {
            slug: 'logout',
            label: 'Sair'
        }
    };

    return (
        <MainTemplate>
            <NavBar
                center={
                    <Typography variant={'h6'} color={'textPrimary'}>
                        Configurações
                    </Typography>
                }
                left={<RouteBackButton />}
            />

            {/* Menu */}
            <Container>
                <List
                    component={'nav'}
                    subheader={
                        <Typography color={'textSecondary'} variant={'caption'}>
                            Segurança
                        </Typography>
                    }>
                    <ListItem
                        button
                        onClick={() => history.push(`/configuracoes/${views.password.slug}`)}>
                        <ListItemIcon>
                            <Icon iconName={'key'} size={21} color={'greenLight'} />
                        </ListItemIcon>
                        <ListItemText
                            primary={views.password.label}
                            primaryTypographyProps={{
                                color: 'textPrimary'
                            }}
                        />
                    </ListItem>
                </List>
                <Divider />
                <List component={'nav'}>
                    <ListItem
                        button
                        onClick={() => {
                            app.logout();
                        }}>
                        <ListItemIcon>
                            <Icon iconName={'on_off'} size={21} color={'greenLight'} />
                        </ListItemIcon>
                        <ListItemText
                            primary={views.logout.label}
                            primaryTypographyProps={{
                                color: 'textPrimary'
                            }}
                        />
                    </ListItem>
                </List>
            </Container>
        </MainTemplate>
    );
}

Configuracoes.displayName = 'Configuracoes';

export default Configuracoes;
