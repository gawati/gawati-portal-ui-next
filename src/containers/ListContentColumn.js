import React from 'react';
import axios from 'axios';

import {apiGetCall} from '../api';

import DivFeed from '../components/DivFeed';
import ExprAbstract from './ExprAbstract';
import RecentListPaginator from '../components/RecentListPaginator';
import DivListing from '../components/DivListing';
import ListingLoading from '../components/ListingLoading';

import '../css/ListingContentColumn.css';

class ListContentColumn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.match.params['lang'],
            count: this.props.match.params['count'],
            from: this.props.match.params['from'],
            to: this.props.match.params['to'],
            records: 0,
            totalPages: 0,
            orderedBy: '',
            loading: true,
            listing: undefined
        };
        this.onChangePage = this.onChangePage.bind(this);
    }
   
    getListing(paramsObj) {
        let apiRecent = apiGetCall(
            'recent-summary', 
            paramsObj
        );
        axios.get(apiRecent)
            .then(response => {
                const items = response.data.exprAbstracts;
                console.log(" ITEMS ", items);
                this.setState({
                    loading: false,
                    from: parseInt(items.itemsfrom, 10),
                    count: parseInt(items.pagesize, 10),
                    to: parseInt(items.itemsfrom, 10) + parseInt(items.pagesize, 10) - 1,
                    records: parseInt(items.records, 10),
                    totalPages: parseInt(items.totalpages, 10),
                    orderedBy: items.orderedby,
                    currentPage: parseInt(items.currentpage, 10),
                    listing: items.exprAbstract
                });
            })
            .catch(function(error) {
                console.log("error in getDocument()", error);
            });
    }


   
    componentDidMount() {
        this.getListing({count: this.state.count, from: this.state.from, to: this.state.to});
    }

    componentDidUpdate() {
       // this.getListing({})
    }

    componentWillReceiveProps(nextProps) {
        this.getListing({
            count: parseInt(nextProps.match.params.count, 10),
            from: parseInt(nextProps.match.params.from, 10),
            to: parseInt(nextProps.match.params.to, 10)
        });
    }

    onChangePage(newPage) {
        this.setState({loading: true});
        this.getListing(newPage);
    }

    generatePagination = () => {
        var pagination = {
            count: this.state.count,
            from: this.state.from,
            to: this.state.to,
            lang: this.state.lang,
            totalPages: this.state.totalPages,
            records: this.state.records
        };
        Object.keys(pagination).map(k => pagination[k] = k === 'lang' ? pagination[k] : parseInt(pagination[k], 10));
        return pagination;  
    }


    render() {
        if (this.state.loading === true || this.state.listing === undefined ) {
            return (
                <ListingLoading>
                    <h1 className="listingHeading">Recent Documents</h1>
                </ListingLoading>
            );
        } else {        
            let pagination = this.generatePagination() ;
            let content = 
                <DivListing lang={this.props.match.params.lang}>
                        <h1 className="listingHeading">Recent Documents</h1>
                        <DivFeed>
                            <RecentListPaginator pagination={pagination} onChangePage={this.onChangePage} />
                        </DivFeed>
                        {
                        this.state.listing.map(abstract => {
                            return (
                            <ExprAbstract key={abstract['expr-iri']} abstract={abstract} lang={this.state.lang}/>   
                            )
                        })
                        }
                    <DivFeed>
                        <RecentListPaginator pagination={pagination} onChangePage={this.onChangePage} />
                    </DivFeed>
                </DivListing>
            ;
    return content;
    }
    }
}

/*
const Loading = ({tab}) => 
    <div className={ `tab-pane tab-active` } data-tab="t`${tab}`">
        Loading...
    </div>;
*/

export default ListContentColumn;

