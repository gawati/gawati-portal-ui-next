import React from 'react';

import DocumentContentColumn from '../containers/DocumentContentColumn';
import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';
import { defaultLang } from '../utils/generalhelper';

function DocumentContentArea({ routeProps, setCollapsible, i18n, t }) {
    let lang = defaultLang().langUI ;
    return (
        <Section>
            <div className="container-fluid">
                <DivRow>
                    <DocumentContentColumn routeProps={routeProps} />
                    <SideBarColumn routeProps={routeProps} i18n={i18n} setCollapsible={setCollapsible} t={t}/>
                </DivRow>
            </div>
        </Section>
    );
}

export default DocumentContentArea;
