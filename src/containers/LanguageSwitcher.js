import React from 'react';
import Link from 'next/link';
import { getLangs } from "../utils/i18nhelper";
import { editNextInRoute } from "../utils/routeshelper";
import '../css/LanguageSwitcher.css';

const LanguageSwitcher = ({i18n, routeProps}) => {
    console.log(" LanguageSwitcher ", i18n, i18n.language);
    if ( (i18n.language !== routeProps.query._lang) && (routeProps.query._lang) ) {
        i18n.changeLanguage(routeProps.query._lang);
    }
    return (
        <ul className="list-inline"> 
        {
            getLangs().map(
                lang => 
                    <li key={ `ui-lang-${lang.lang}`} className={ `list-inline-item ui-lang-item ${ lang.lang === i18n.language ? "ui-lang-highlight": "" }`}>
                        <Link href={ editNextInRoute({lang:lang.lang}, routeProps) }><a>{lang.content}</a></Link>
                    </li>
            ) 
        }
        </ul>
    ); 
}
;

export default LanguageSwitcher;
