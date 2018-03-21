import React from 'react';

import DocumentContentColumn from '../containers/DocumentContentColumn';
// import SideBarColumn from './SideBarColumn';
import Section from './Section';
import DivRow from './DivRow';
import { defaultLang } from '../utils/generalhelper';

function DocumentContentArea({ routeProps, setCollapsible }) {
    let lang = defaultLang().langUI ;
    return (
        <Section>
            <div className="container-fluid">
                <DivRow>
                    <DocumentContentColumn routeProps={routeProps} />
                </DivRow>
            </div>
        </Section>
    );
}
// <SideBarColumn match={match} setCollapsible={setCollapsible}/>

export default DocumentContentArea;
