import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Route, Redirect } from "react-router-dom";
import { getRolesByPortalScreen } from '../../utils/navigationUtils';
import {hasRole, logoutAsync} from '../../features/LoginEntry/loginEntrySlice';

const PrivateRoute = ({ component: Component, portal, ...rest }) => {
    // const { keycloak } = useKeycloak();
    const screentRoles = getRolesByPortalScreen(portal, rest.path);
    const isAuthorized = (roles) => {
        if (
            // keycloak && 
            roles
            ) {
            return roles.some(async (r) => {
                const realm = await hasRole(r)
                console.log('realm 22-======> ', realm);
                // const realm = keycloak.hasRealmRole(r);
                // const resource = keycloak.hasResourceRole(r);
                return realm ;
                // || resource;
            });
        }
        return false;
    };

    return(
        <Route {...rest} render={(props) => {
            return isAuthorized(screentRoles) ?  <Component {...props}/> : <Redirect to={{ pathname: '/' }}/>;
        }}/>
    );
};

export default PrivateRoute;
