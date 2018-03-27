import React from 'react';

import HomeContentColumn from '../containers/HomeContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';
import { defaultLang } from '../utils/generalhelper';

class HomeContentArea extends React.Component {

    render() {
        const {routeProps, i18n, setCollapsible, t} = this.props;
        let lang = defaultLang().langUI ;
        return (
            <Section>
                <div className="container-fluid">
                    <DivRow altClasses="home-content-area">
                        <HomeContentColumn lang={lang} t={t} />
                        <SideBarColumn routeProps={routeProps} i18n={i18n} setCollapsible={setCollapsible} t={t}/>
                    </DivRow>
                </div>
            </Section>
        );
    
    }
}

export default HomeContentArea;