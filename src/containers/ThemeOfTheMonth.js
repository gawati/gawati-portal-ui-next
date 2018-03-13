import React from 'react';
import { NavLink } from 'react-router-dom';

import {homePageFilterWords} from '../constants';
import {Aux} from '../utils/generalhelper';
import {T} from '../utils/i18nhelper';

import DivFeed from '../components/DivFeed';
import GwSpinner from '../components/GwSpinner'
import ExprAbstract from './ExprAbstract';

const ThemeOfTheMonth = ({loading, themes, tab, lang}) =>
    <div className={ `tab-pane tab-active` } data-tab={ `t${tab}` }>
        <ThemeIntro loading={loading} />
        {getThemeSummary(loading, themes, tab, lang)}
    </div>
    ;

const ThemeIntro = ({loading}) => {
        let homePageIntro = homePageFilterWords();
        return (
        <DivFeed>
            <h2>{T("Theme of the month")}: { homePageIntro["name"] }</h2>
            <a>
                <p>{ homePageIntro["description"] }</p>
            </a>
            <div className="grey-rule"/>
            {loading === true ? <GwSpinner />: <noscript /> }
        </DivFeed>        
        );
}

const getThemeSummary = (loading, themes, tab, lang) => {
    if (loading === true) {
        return (<noscript />);
    } else {
        return (
            <Aux>
                <ThemeSummary themes={themes} lang={lang} />
                <div className="button-wrapper">
                    <NavLink className={ `button w-button` } to={ `/themes/_lang/` + lang + `/_themes/${homePageFilterWords()["keywords"].join("|") }/_count/10/_from/1/_to/10`}>{T("More posts")}&#160;→</NavLink>
                </div>
            </Aux>
        );
    }
}

const ThemeSummary = ({themes, lang}) => 
        <Aux>
        {
            themes.map(abstract => {
                return (
                <ExprAbstract key={abstract['expr-iri']} abstract={abstract} lang={lang}/>   
                )
            })
        }
        </Aux>
        ;

export default ThemeOfTheMonth;