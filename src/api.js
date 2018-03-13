import querystring from 'querystring';
import {dataProxyServer} from './constants';

const GAWATI_APIS = {
    apis : {
        'content': '/gwp/content',
        'doc': '/gwd/doc/json',
        'doc-xml': '/gwd/doc',
        'filter': '/gwd/search/filter/json',
        'keyword': '/gwp/keyword',
        'keyword-value': '/gwp/keywordValue',
        'recent-summary' : '/gwd/recent/expressions/summary/json',
        'search-by-country' : '/gwd/search/countries/summary/json',
        'search-by-language' : '/gwd/search/languages/summary/json',
        'search-by-subject' : '/gwd/search/keywords/summary/json',
        'search-by-year': '/gwd/search/years/summary/json',
        'search-grouped': '/gwd/searchAC/json' ,
        'short-filter-cache': '/gwp/short-filter-cache',
        'smart-filter-cache': '/gwp/smart-filter-cache',
        'themes-summary' : '/gwd/themes/expressions/summary/json'
    }
};

export function apiUrl(apiName) {
    if (GAWATI_APIS.apis.hasOwnProperty(apiName)) {
        return dataProxyServer() +  GAWATI_APIS.apis[apiName] ;
    } else {
        console.log(" Unknown API call ", apiName);
        return false;
    }
}

export function apiGetCall(apiName, objParams) {
    let apiPath = apiUrl(apiName) ;
    if (apiPath !== false) {
        if (Object.keys(objParams).length === 0 && objParams.constructor === Object) {
            return apiPath;
        } else {
            let apiParams =  querystring.stringify(objParams);
            return apiPath + "?" + apiParams;
        }
    }
}

