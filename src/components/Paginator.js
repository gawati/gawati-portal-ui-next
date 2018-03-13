import React from 'react';
import {rangeMinMax} from '../utils/generalhelper';
import {Link} from 'react-router-dom';
import '../css/Paginator.css';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';

class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {}
        };
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangePage = (pager, newPage) => {
        this.setState({pager: pager});
        this.props.onChangePage(newPage);
    }

    getCurrentPage = (lastItemCount, pageSize) =>
         Math.floor(lastItemCount / pageSize) ; 
    

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
        console.log(" total pages ", totalItems, pageSize, totalPages);
        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                console.log (" current Page < 6 ");
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                console.log (" Else cp + 4 >= total pages ");
                startPage = currentPage - 5;
                endPage = currentPage + 4;
                console.log( " start, end ", startPage, endPage);
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = rangeMinMax(startPage, endPage + 1);

        // return object with all pager properties required by the view
        let pgn = {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
        return pgn;
    }

    pageLink = (pager, lang, count, from, to, text) => 
        <Link to={ 
            "/recent/_lang/"+ lang + 
            "/_count/"+ count +
            "/_from/" + from  +
            "/_to/" + to  
            } onClick={() => this.handleChangePage(pager, {lang: lang, count: count, from: from, to: to, text: text})}>
            { text }
        </Link>;

    pageNavLink = (disableCondition, pager, lang, count, from, to, text) =>
            <li className={ disableCondition ? "disabled": ""}>
                {disableCondition ? <span>{ text } </span> : this.pageLink(pager, lang, count, from, to, text) }
            </li>
        ;

    render() {
        let pgn = this.props.pagination; 
        let currentPage = this.getCurrentPage(pgn.to, pgn.count);
        let pagerObject = this.getPager(pgn.records, currentPage, pgn.count);
        return (
            <ul className="gw-pager">
                {
                    /**
                     * First page link 
                     */
                    this.pageNavLink(
                        currentPage === 1, 
                        pagerObject, 
                        pgn.lang, 
                        pgn.count, 
                        1, 
                        pgn.count, 
                        <FontAwesome name="angle-double-left" />
                    )
                }
                {
                    /**
                     * Previous page link
                     */
                    this.pageNavLink(
                        currentPage === 1, 
                        pagerObject, 
                        pgn.lang, 
                        pgn.count,  
                        pgn.from - pgn.count , 
                        pgn.from - 1 , 
                        <FontAwesome name="angle-left" />
                    )
                }
                {
                    /**
                     * Render numbered page links
                     */
                    pagerObject.pages.map(
                        (page, index) =>
                            <li key={index} className={pagerObject.currentPage === page ? 'active' : ''}>
                                {
                                    this.pageLink(
                                        pagerObject, 
                                        pgn.lang, 
                                        pgn.count, 
                                        ((page - 1) * pgn.count) + 1, 
                                        (page * pgn.count) , 
                                        page
                                    ) 
                                }
                            </li>
                    )
                }
                {
                    /**
                     * Next Page
                     */
                    this.pageNavLink(
                        pagerObject.currentPage === pagerObject.totalPages, 
                        pagerObject, 
                        pgn.lang, 
                        pgn.count, 
                        pgn.to + 1, 
                        pgn.to + pgn.count, 
                        <FontAwesome name="angle-right" />
                    )
                }
                {
                    /**
                     * Last Page
                     */
                    this.pageNavLink(
                        pagerObject.currentPage === pagerObject.totalPages,
                        pagerObject,
                        pgn.lang, 
                        pgn.count, 
                        ((pagerObject.totalPages - 1) * pgn.count) + 1,  
                        pgn.records === (pagerObject.totalPages * pgn.count) ? pagerObject.totalPages * pgn.count : (pagerObject.totalPages * pgn.count) - pgn.records, 
                        <FontAwesome name="angle-double-right" />
                    )
                }
            </ul>
        );
    }
}

/*
<li className={currentPage === 1 ? 'disabled' : ''}>
{this.pageLink('eng', pgn.count, 1, pgn.count, 'First')}
</li>
<li className={currentPage === 1 ? 'disabled' : ''}>
 {this.pageLink('eng', pgn.count,  ((currentPage - 1) * pgn.count) + 1 , ((currentPage - 1) * pgn.count) + pgn.count , 'Previous')}
</li>
{pagerObject.pages.map((page, index) =>
<li key={index} className={pagerObject.currentPage === page ? 'active' : ''}>
    {this.pageLink('eng', pgn.count, ((page - 1) * pgn.count) + 1, (page * pgn.count) , page) }
</li>
)}
<li className={pagerObject.currentPage === pagerObject.totalPages ? 'disabled' : ''}>
{this.pageLink('eng', pgn.count, pgn.to + 1, pgn.to + pgn.count, 'Next')}
</li>
<li className={pagerObject.currentPage === pagerObject.totalPages ? 'disabled' : ''}>
{this.pageLink('eng', pgn.count, ((pagerObject.totalPages - 1) * pgn.count) + 1,  pgn.records === (pagerObject.totalPages * pgn.count) ? pagerObject.totalPages * pgn.count : (pagerObject.totalPages * pgn.count) - pgn.records, 'Last')}
</li>
*/

export default Paginator;