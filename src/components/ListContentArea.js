import React from 'react';
import {getRoute} from '../utils/routeshelper';

import ListContentColumn from '../containers/ListContentColumn';
// import ListThemeContentColumn from '../containers/ListThemeContentColumn';
import SearchContentColumnFilter from '../containers/SearchContentColumnFilter';

import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

import {PropsRouteNext} from '../utils/routeshelper';

const pathComponents = {
    "/recent": ListContentColumn,
    // "/theme": ListThemeContentColumn,
    "/filter": SearchContentColumnFilter
}

class ListContentArea extends React.Component{

    render () {
        const { routeProps, i18n, setCollapsible, t } = this.props;
        return (
            <Section>
                <div className="container-fluid">
                    <DivRow>
                        <PropsRouteNext component={pathComponents[this.props.routeProps.pathname]}  i18n={i18n} setCollapsible={setCollapsible} routeProps={routeProps} t={t} />
                        <SideBarColumn routeProps={routeProps} i18n={i18n} setCollapsible={setCollapsible} t={t}/>
                    </DivRow>
                </div>
            </Section>
        );
    }
    
}

export default ListContentArea;