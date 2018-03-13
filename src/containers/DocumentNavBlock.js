import React from 'react';

import { NavLink } from 'react-router-dom';

import {Aux, getDocType, displayDate, getLangDesc} from '../utils/generalhelper';
import {convertObjectToEncodedString, setInRoute} from '../utils/routeshelper';
import {anFRBRcountry, anExprFRBRdate, anFRBRlanguage, anFRBRnumber} from '../utils/akomantoso';
import moment from 'moment';

const CategoryLink = ({type}) => 
    <NavLink to="/">{ getDocType(type)['category']}</NavLink>;

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
        <NavLink to={ countryLink(lang, country.value) }>{ country.showAs }</NavLink>
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
        <NavLink to={ langLink(lang, docLang)}>{langDesc.content}</NavLink>
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
        <NavLink to={ yearLink(lang, year) }>{displayDate(date, lang)}</NavLink> 
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
