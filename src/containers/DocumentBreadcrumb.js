import React from 'react';
import Link from 'next/link';
import {shortTitle, getDocType} from '../utils/generalhelper';
import {T} from '../utils/i18nhelper';
import {anPublication, anFRBRcountry} from '../utils/akomantoso';
import {convertObjectToEncodedString, setInRoute} from '../utils/routeshelper';

const CategoryLink = ({type}) => 
    <Link href="/"><a>{getDocType(type)['category']}</a></Link>;

const HomeLink = () => 
    <Link href="/"><a>{T("Home")}</a></Link>;

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

function DocumentBreadcrumb({doc, type, lang}) {
        return (
            <div className="breadcrumb-gw">
                <span className=""><HomeLink /> &gt; <CategoryLink type={type} /> &gt; 
                <CountryLink doc={doc} type={type} lang={lang}>{ anFRBRcountry(doc, type)['showAs'] }</CountryLink> &gt;</span>
                <span>{
                    shortTitle(
                        anPublication(doc, type)['showAs']
                    )
                        }</span>
                </div>
        );
}

export default DocumentBreadcrumb;
