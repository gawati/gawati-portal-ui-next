import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import {shortTitle, displayDate} from '../utils/generalhelper';
import {convertObjectToEncodedString, setInRoute} from '../utils/routeshelper';
import {documentServer} from '../constants.js';
import {T} from '../utils/i18nhelper';

import DocumentLink from './DocumentLink';
import DivFeed from '../components/DivFeed';

import '../css/ExprAbstract.css';

/**
 * Renders a link to the thumbnail of the document represented by componentLink
 * @param {object} componentLink 
 */
const ThumbnailAbstract = ({abstract, lang}) => {
    let componentLink = abstract.componentLink;
    let componentSrc = componentLink.src;
    let componentValue = componentLink.value;
    let thumbnailFolder = componentSrc.substring(0, componentSrc.lastIndexOf("/"));
    let thumbnailUrl = documentServer() + thumbnailFolder +   "/th_" + componentValue.replace(".pdf", ".png");
    return (
      <DocumentLink abstract={abstract} lang={lang}>
        <img src={ thumbnailUrl } alt={componentLink.value} className="docThumb" />
      </DocumentLink>
    );
}


    

/**
 * Renders an exprAbstract item of a document on the server
 * @param {object} abstract 
 */
class ExprAbstract extends React.Component {

/*     constructor(props) {
        super(props);
    } */

    countryLink = (pageLang, abstract) =>
        setInRoute(
            "filter", {
                from: 1,
                to: 10,
                count: 10,
                lang: pageLang,
                q: convertObjectToEncodedString(
                    {countries: [abstract.country.value]}
                )
            }
        );
    
    langLink = (pageLang, abstract) =>
        setInRoute(
            "filter", {
                from: 1,
                to: 10,
                count: 10,
                lang: pageLang,
                q: convertObjectToEncodedString(
                    {langs: [abstract.language.value]}
                )
            }
        );

    yearLink = (pageLang, abstract) =>
        setInRoute(
            "filter", {
                from: 1,
                to: 10,
                count: 10,
                lang: pageLang,
                q: convertObjectToEncodedString(
                    {years: [moment(abstract.date[1].value, "YYYY-MM-DD").year()]}
                )
            }
        );

    render() {
        let abstract = this.props.abstract ;
        let pageLang = this.props.lang;
        let yearLink = this.yearLink(pageLang, abstract);
        let langLink = this.langLink(pageLang, abstract);
        let countryLink = this.countryLink(pageLang, abstract);
        let t = this.props.t;
        return (
            <DivFeed key={abstract['expr-iri']}>
                <h2>{shortTitle(abstract.publishedAs)}</h2>
                <div className="text-block">
                    <Link href={ countryLink }><a>{t(abstract.country.showAs)}</a></Link> &#160;| &#160;
                    <Link href={ langLink }><a>{t(abstract.language.showAs)}</a></Link> &#160;| &#160;
                    <Link href={ yearLink } key={this.props.lang}><a>{displayDate(abstract.date[1].value, pageLang)}</a></Link>
                </div>  
                <ThumbnailAbstract abstract={abstract} lang={pageLang}/>
                <p>{abstract.publishedAs}</p>
                <div className="div-block-18 w-clearfix">
                    <DocumentLink abstract={abstract} lang={pageLang}>more...</DocumentLink>
                </div>
                <div className="grey-rule"></div>                      
            </DivFeed>
        );
    }
}

export default ExprAbstract;

