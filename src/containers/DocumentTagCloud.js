import React from 'react';
import {Link} from 'react-router-dom';

import {anKeywords} from '../utils/akomantoso';
import {randomInt} from '../utils/generalhelper';
import {convertObjectToEncodedString, setInRoute} from '../utils/routeshelper';
import {T} from '../utils/i18nhelper';

const keywordLink = (pageLang, keyword) => 
    setInRoute(
        "filter", {
            from: 1,
            to: 10,
            count: 10,
            lang: pageLang,
            q: convertObjectToEncodedString(
                {keywords: [keyword]}
            )     
        }
    );

const DocumentTagCloud = ({doc, type, lang}) => {
    let kws = anKeywords(doc, type);
    if (Array.isArray(kws)) {
        return (
            <div className="tag-cloud">
            <strong>{T("TAGS")}:</strong>&#160;
                {
                kws.map(
                    (item) => {
                        let randint = randomInt(14, 28);
                        return (
                        <span key={item.value} className={ `text-span-${randint} tag-item` }>
                        <Link to={ keywordLink(lang, item.value) }>{
                            item.showAs
                        }</Link>
                        </span>
                        );
                    }
                )
                }
            </div>
        );
    } else {
        return (
            <div className="tag-cloud">
            <span className="text-span-18">{kws.showAs}</span>
            </div>
        );
    }
        /*
    return (
        <div className="tag-cloud" >
            <span className="text-span-14">act </span><span className="text-span-13">Administrative
                </span><span className="text-span-27">assigned </span><span>body </span><span
                className="text-span-15">cabinet </span><span>case </span><span className="text-span-28"
                >chief </span><span className="text-span-20">citizen </span><span>citizenship
                </span><span>commission </span><span className="text-span-21">contolled
                </span><span>copy </span><span>corporate </span><span className="text-span-30"
                >deleted</span> deparment <span className="text-span-22">digital </span><span
                className="text-span-12">director</span>
            <span className="text-span-23">document </span>electronic <span>entity </span><span
                className="text-span-29">exempt </span><span>form </span><span className="text-span-16"
                >generated </span><span className="text-span-17">government
                </span><span>individual</span>
            <span className="text-span-19">information </span><span className="text-span-18"
                >justice</span>
        </div>
    ); 
    */
};

export default DocumentTagCloud;