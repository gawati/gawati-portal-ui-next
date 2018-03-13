import React from 'react';
import { NavLink } from 'react-router-dom';

import {Aux} from '../utils/generalhelper';
import {T} from '../utils/i18nhelper';
import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import GwSpinner from '../components/GwSpinner'

import '../css/RecentDocs.css';

const RecentDocs = ({loading, recentDocs, tab, lang}) => 
    <div className={ `tab-pane tab-active` } data-tab={`t${tab}`}>
        <RecentIntro loading={loading} />
        {getRecentDocs(loading, recentDocs, tab, lang)}
    </div>
    ;

const getRecentDocs = (loading, recentDocs, tab, lang) => {
        if (loading === true) {
            return (
                <noscript />
            );
        }
        return (
            <Aux>
                <RecentSummary recentDocs={recentDocs} lang={lang} />
                <div className="button-wrapper">
                <NavLink className={ `button w-button` } to={ `/recent/_lang/` + lang + `/_count/10/_from/1/_to/10`}>{T("More posts")}&#160;→</NavLink>
                </div>
            </Aux>
        );    
} 

const RecentIntro = ({loading}) => 
    <DivFeed customClass="white-feed">
        <h2>{T("Latest Documents")}</h2>
        <a>
            <p>{T("The most recently published documents")}</p>
        </a>
        <div className="grey-rule"/>
        {loading === true ? <GwSpinner />: <noscript /> }
    </DivFeed>
    ;      

const RecentSummary = ({recentDocs, lang}) => 
        <Aux>
        {
            recentDocs.map(abstract => {
                return (
                <ExprAbstract key={abstract['expr-iri']} abstract={abstract} lang={lang}/>   
                )
            })
        }
        </Aux>
        ;

export default RecentDocs;
