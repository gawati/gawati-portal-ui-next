import React from 'react';
import {NavLink} from 'react-router-dom';
import { getLangs } from "../utils/i18nhelper";
import { editInRoute } from "../utils/routeshelper";
import '../css/LanguageSwitcher.css';

const LanguageSwitcher = ({i18n, match}) => {
    console.log(" LanguageSwitcher ", i18n, i18n.language);
    if ( (i18n.language !== match.params.lang) && (match.params.lang) ) {
        i18n.changeLanguage(match.params.lang);
    }
    return (
        <ul className="list-inline"> 
        {
            getLangs().map(
                lang => 
                    <li key={ `ui-lang-${lang.lang}`} className={ `list-inline-item ui-lang-item ${ lang.lang === i18n.language ? "ui-lang-highlight": "" }`}>
                        <NavLink to={ editInRoute({lang:lang.lang}, match) }>{lang.content}</NavLink>
                    </li>
            ) 
        }
        </ul>
    ); 
}
;

export default LanguageSwitcher;
