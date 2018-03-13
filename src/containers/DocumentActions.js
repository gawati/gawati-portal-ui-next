import React from 'react';

import { anBody, anBodyComponentRef, anExprFRBRthis } from '../utils/akomantoso';
import { documentServer } from '../constants';
import { substringBeforeLastMatch } from '../utils/stringhelper';
import { apiUrl } from '../api';
import {T} from '../utils/i18nhelper';
import FacebookProvider, { Like } from 'react-facebook';
import socialApps from '../configs/social.json';

const DocumentPdfLink = ({doc, type}) => {
    let body = anBody(doc, type);
    let cRef = anBodyComponentRef(body);

    let refSrc = cRef.src;
    let refAlt = cRef.alt;
    let url = documentServer() + substringBeforeLastMatch(refSrc, "/") + "/" + refAlt;
    return (
        <a href={ url } title={ `open ${refAlt} in a new window` } download={ refAlt } >PDF</a>
    );
}

const DocumentXmlLink = ({doc, type}) => {
    let url = apiUrl('doc-xml') + "?iri=" + anExprFRBRthis(doc, type).value; 
    return (
        <a href={ url } title="XML download" download="document.xml" >XML</a>
    );
}

const DocumentActions = ({doc, type}) => 
        <div className="document-download">
            <div className={ `col-3 left`}>
                <a href="/">{T("Back to search")}</a>
            </div>
            <div className={ `col-9 right`}>
                <ul>
                    <li>
                        <a href="/">{T("Subscribe")}</a>
                    </li>
                    <li>
                        <a href="/">{T("Copy Reference")}</a>
                    </li>
                    <li>
                        <DocumentXmlLink doc={doc} type={type} />
                    </li>
                    <li>
                        <DocumentPdfLink doc={doc} type={type} />
                    </li>
                    <li>
                        <FacebookProvider appId={socialApps.fb.appId}>
                            <Like href={window.location.href.replace('@', '&#064;')} colorScheme="dark" showFaces share layout="button_count"/>
                        </FacebookProvider>
                    </li>
                </ul>
            </div>
        </div>;

export default DocumentActions;
