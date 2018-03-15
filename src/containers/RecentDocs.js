import React from 'react';
import Link from 'next/link';
import {Aux} from '../utils/generalhelper';
import {T} from '../utils/i18nhelper';
import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import GwSpinner from '../components/GwSpinner'

import '../css/RecentDocs.css';

const RecentDocs = ({loading, recentDocs, tab, lang, t}) => 
    <div className={ `tab-pane tab-active` } data-tab={`t${tab}`}>
        <RecentIntro loading={"loading"} />
        {getRecentDocs(loading, recentDocs, tab, lang, t)}
    </div>
    ;

const getRecentDocs = (loading, recentDocs, tab, lang, t) => {
        if (loading === true) {
            return (
                <noscript />
            );
        }
        return (
            <Aux>
                <RecentSummary recentDocs={recentDocs} lang={lang} t={t} />
                <div className="button-wrapper">
                <Link className={ `button w-button` } href={ `/recent?_lang=${lang}&_count=10&_from=1&_to=10` } as={ `/recent/_lang/` + lang + `/_count/10/_from/1/_to/10` }><a>{t("More posts")}&#160;→</a></Link>
                </div>
            </Aux>
        );    
}

const RecentIntro = ({loading}) => 
    <DivFeed customClass="white-feed">
        <h2>{"Latest Documents"}</h2>
        <a>
            <p>{"The most recently published documents"}</p>
        </a>
        <div className="grey-rule"/>
        {loading === true ? <GwSpinner />: <noscript /> }
    </DivFeed>
    ;      

const RecentSummary = ({recentDocs, lang, t}) => 
        <Aux>
        {
            recentDocs.map(abstract => {
                return (
                <ExprAbstract key={abstract['expr-iri']} abstract={abstract} lang={lang} t={t}/>   
                )
            })
        }
        </Aux>
        ;

export default RecentDocs;
