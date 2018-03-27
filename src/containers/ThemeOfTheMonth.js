import React from 'react';
import Link from 'next/link';

import {homePageFilterWords} from '../constants';
import {Aux} from '../utils/generalhelper';
import {T} from '../utils/i18nhelper';

import DivFeed from '../components/DivFeed';
import GwSpinner from '../components/GwSpinner'
import ExprAbstract from './ExprAbstract';

const ThemeOfTheMonth = ({loading, themes, tab, lang, t}) =>
    <div className={ `tab-pane tab-active` } data-tab={ `t${tab}` }>
        <ThemeIntro loading={loading} t={t} />
        {getThemeSummary(loading, themes, tab, lang, t)}
    </div>
    ;

const ThemeIntro = ({loading, t}) => {
        let homePageIntro = homePageFilterWords();
        return (
        <DivFeed>
            <h2>{t("Theme of the month")}: { homePageIntro["name"] }</h2>
            <a>
                <p>{ homePageIntro["description"] }</p>
            </a>
            <div className="grey-rule"/>
            {loading === true ? <GwSpinner />: <noscript /> }
        </DivFeed>        
        );
}

const getThemeSummary = (loading, themes, tab, lang, t) => {
    if (loading === true) {
        return (<noscript />);
    } else {
        return (
            <Aux>
                <ThemeSummary themes={themes} lang={lang} t={t} />
                <div className="button-wrapper">
                    <Link href={ `/themes?_lang=` + lang + `&_themes=${homePageFilterWords()["keywords"].join("|") }&_count=10&_from=1&_to=10`}>
                        <a className={ `button w-button` }>{t("More posts")}&#160;→</a>
                    </Link>
                </div>
            </Aux>
        );
    }
}

const ThemeSummary = ({themes, lang, t}) =>
        <Aux>
        {
            themes.map(abstract => {
                return (
                <ExprAbstract key={abstract['expr-iri']} abstract={abstract} lang={lang} t={t} />
                )
            })
        }
        </Aux>
        ;

export default ThemeOfTheMonth;