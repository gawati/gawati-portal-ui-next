import React from 'react';
import { Switch, Route } from 'react-router-dom';


import {getRoute} from '../utils/routeshelper';

import ListContentColumn from '../containers/ListContentColumn';
import ListThemeContentColumn from '../containers/ListThemeContentColumn';
import SearchContentColumnFilter from '../containers/SearchContentColumnFilter';



import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';

class ListContentArea extends React.Component{

    render () {
        const { match, i18n } = this.props;
        return (
            <Section>
                <div className="container-fluid">
                    <DivRow>
                        <Switch>
                            <Route path={ getRoute('recent') } component={ListContentColumn} />
                            <Route path={ getRoute('themes') } component={ListThemeContentColumn} />
                            <Route path={ getRoute('filter') } component={SearchContentColumnFilter} />
                        </Switch>
                        <SideBarColumn  match={match} i18n={ i18n } setCollapsible={this.props.setCollapsible}/>
                    </DivRow>
                </div>
            </Section>
        );
    }
    
}

export default ListContentArea;