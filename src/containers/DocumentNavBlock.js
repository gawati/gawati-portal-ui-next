import React from 'react';
import Link from 'next/link';

import {Aux, getDocType, displayDate, getLangDesc} from '../utils/generalhelper';
import {convertObjectToEncodedString, setInRoute} from '../utils/routeshelper';
import {anFRBRcountry, anExprFRBRdate, anFRBRlanguage, anFRBRnumber} from '../utils/akomantoso';
import moment from 'moment';

const CategoryLink = ({type}) => 
    <Link href="/"><a>{getDocType(type)['category']}</a></Link>;

const countryLink = (pageLang, country) =>
    setInRoute(
        "filter", {
            from: 1,
            to: 10,
            count: 10,
            lang: pageLang,
            q: convertObjectToEncodedString(
                {countries: [country]}
            )
        }
    );

const CountryLink = ({doc, type, lang}) => {
    let country = anFRBRcountry(doc, type);
    return (
        <Link href={ countryLink(lang, country.value) }><a>{country.showAs}</a></Link>
    );
}

 

const langLink = (pageLang, docLang) =>
    setInRoute(
        "filter", {
            from: 1,
            to: 10,
            count: 10,
            lang: pageLang,
            q: convertObjectToEncodedString(
                {langs: [docLang]}
            )
        }
    );    

const LanguageLink = ({doc, type, lang}) => {
    let docLang = anFRBRlanguage(doc, type)['language'];
    let langDesc =  getLangDesc(docLang) ;
    return (
        <Link href={langLink(lang, docLang)}><a>{langDesc.content}</a></Link>
    );
};

const yearLink = (pageLang, year) => 
    setInRoute(
        "filter", {
            from: 1,
            to: 10,
            count: 10,
            lang: pageLang,
            q: convertObjectToEncodedString(
                {years: [year]}
            )
        }
    );

const DocumentDate = ({doc, type, lang}) => {
    let date = anExprFRBRdate(doc, type).date;
    let year = moment(date, "YYYY-MM-DD").year() ;
    return (
        <Link href={yearLink(lang, year)}><a>{displayDate(date, lang)}</a></Link>
    );
}

const DocumentNumber = ({doc, type}) =>
     <Aux>{anFRBRnumber(doc, type)['showAs']}</Aux> ;

const DocumentNavBlock = ({doc, type, lang}) => {
    return (
    <div className="text-block">
        <CountryLink doc={doc} type={type} lang={lang} />  &#160;|
        &#160;<CategoryLink type={type}  /> &#160;|
        &#160;<DocumentDate doc={doc} type={type} lang={lang} /> &#160;|
        &#160;<LanguageLink doc={doc} type={type}  lang={lang} /> &#160;|
        &#160;<DocumentNumber doc={doc} type={type} /> 
    </div>
    );
}


export default DocumentNavBlock;
