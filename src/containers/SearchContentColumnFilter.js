import React from 'react';
import axios from 'axios';

import {apiGetCall} from '../api';
import {isInt, coerceIntoArray} from '../utils/generalhelper';
import {xQueryFilterBuilder} from '../utils/xqueryhelper';
import {convertEncodedStringToObject} from '../utils/routeshelper';
import {T} from '../utils/i18nhelper';

import DivFeed from '../components/DivFeed';
import DivListing from '../components/DivListing';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';
import BaseSearchContentColumn from './BaseSearchContentColumn';
import ListingLoading from '../components/ListingLoading';
import '../css/ListingContentColumn.css';

class SearchContentColumnFilter extends BaseSearchContentColumn {
    
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.routeProps.query['_lang'],
            from: this.props.routeProps.query['_from'],
            to: this.props.routeProps.query['_to'],
            count: this.props.routeProps.query['_count'],
            totalPages: 0,
            loading: true,
            listing: undefined
        };
        this.state.q = this.convertRoutePropToXQuery(this.props.routeProps.query._q);
        this.onChangePage = this.onChangePage.bind(this);
    }

    convertRoutePropToXQuery = (paramQ) => 
        xQueryFilterBuilder(convertEncodedStringToObject(paramQ)).join(''); 

    componentWillUnmount() {
        this._mounted = false;
    }

    getSearch(paramsObj) {
        console.log( " GET SEARCH ", paramsObj);
        let apiRecent = apiGetCall(
            'filter', 
            paramsObj
        );
        // cancel the previous request
        if (typeof this.source !== typeof undefined) {
            this.source.cancel('Operation canceled due to new request.')
        }

        // save the new request for cancellation
        this.source = axios.CancelToken.source();

        axios.request({
            method: "GET",
            url: apiRecent,
            debounce: 600,
            cancelToken:this.source.token
        })
            .then(response => {
                const items = response.data.exprAbstracts;
                if (this._mounted) {
                    if (parseInt(items.records, 10) === 0) {
                        this.setState({
                            loading: false,
                            from:0,
                            count:0,
                            to:0,
                            records: parseInt(items.records, 10),
                            q: paramsObj.q
                        })
                    } else {
                        console.log(" ITEMS ", items);
                        this.setState({
                            loading: false,
                            from: parseInt(items.itemsfrom, 10),
                            count: parseInt(items.pagesize, 10),
                            to: parseInt(items.itemsfrom, 10) + parseInt(items.pagesize, 10) - 1,
                            records: parseInt(items.records, 10),
                            q: JSON.stringify(paramsObj.q),
                            totalPages: parseInt(items.totalpages, 10),
                            orderedBy: items.orderedby,
                            currentPage: parseInt(items.currentpage, 10),
                            listing: coerceIntoArray(items.exprAbstract)
                        });
                    }
                }

            })
            .catch(function(error) {
                console.log("error in getSearch()", error);
            });
    }

    onChangePage(newPage) {
        this.setState({loading: true});
        this.getSearch(newPage);
    }

    generatePagination = () => {
        const { count, from, to, lang, totalPages, records } = this.state ;
        const { _q } = this.props.routeProps.query ; 
        var pagination = {
            q: _q,
            count: count,
            from: from,
            to: to,
            lang: lang,
            totalPages: totalPages,
            records: records
        };
        Object.keys(pagination).map(k => pagination[k] = !isInt(pagination[k]) ? pagination[k] : parseInt(pagination[k], 10));
        // we set the linkUrl prop on the pagination object, so the paginator knows how to render the URLs
        /** 
         *  !+LINK_ROUTE(KOHSAH, 2017-12-31)
         *  use config based route instead
         */
        /** 
        let linkUrl = "/search/_lang/{lang}/_count/{count}/_from/{from}/_to/{to}/_bycountry/{country}";
        pagination.linkUrl = linkUrl; 
        **/

        let linkRoute = "filter";
        pagination.linkRoute = linkRoute;

        return pagination;  
    }

    componentDidMount() {
        this._mounted = true;
        this.getSearch({
            q: this.state.q,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to
        });
        
    }

    componentWillReceiveProps(nextProps) {
        // we need to always convert the url query to a back-end XQuery
        this.getSearch({
            q: this.convertRoutePropToXQuery(nextProps.routeProps.query._q),
            count: parseInt(nextProps.routeProps.query._count, 10),
            from: parseInt(nextProps.routeProps.query._from, 10),
            to: parseInt(nextProps.routeProps.query._to, 10)
        });
    }    

    renderDocumentLoading = (t) =>
        <ListingLoading>
            <h1 className="listingHeading">{t("Document Results")}</h1>
        </ListingLoading> ;

    renderNoDocumentsFound = (t) =>
        <DivListing>
            <h1 className="listingHeading">{t("Document Results")}</h1>
            <div>No Documents Found</div>
        </DivListing> ;

    renderListing = (t) => {
        let pagination = this.generatePagination() ;
        let content = 
            <DivListing lang={this.props.routeProps.query._lang}>
                <h1 className="listingHeading">{t("Document Results")}</h1>
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={(this.onChangePage)} />
                </DivFeed>
                {
                this.state.listing.map(abstract => {
                    return (
                    <ExprAbstract key={abstract['expr-iri']} lang={this.props.routeProps.query._lang} abstract={abstract} t={t} />  
                    )
                })
                }
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={this.onChangePage} />
                </DivFeed>
            </DivListing>
        ;
         return content;
    };

    render() {
        const { loading, listing, records } = this.state;
        const {t} = this.props;
        if (loading === true || listing === undefined ) {
            return this.renderDocumentLoading(t);
        } else 
        if (parseInt(records, 10) === 0 || listing === undefined) {
            return this.renderNoDocumentsFound(t);
        } else {
            return this.renderListing(t);
        }   
    }
}


export default SearchContentColumnFilter;

