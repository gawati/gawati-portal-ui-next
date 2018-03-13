import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// import FilterCountry from './FilterCountry';
import FilterDate from './FilterDate2';
// import FilterLang from './FilterLang';
import FilterKeywords from './FilterKeywords2';

import FilterCountry from './FilterCountry2';
// import FilterDate from './FilterDate2';
import FilterLang from './FilterLang2';
// import FilterKeywords from './FilterKeywords2';

import { filterTypes } from '../../constants.js';
import { apiGetCall } from '../../api.js';

import { Aux, defaultLang, defaultListCount } from '../../utils/generalhelper';
import { setInRoute, convertEncodedStringToObject, convertObjectToEncodedString } from '../../utils/routeshelper';

/**
 * This class provides the UI filter component provided on the right in the sidebar
 * 
 * @class Filter
 * @extends {React.Component}
 */
class Filter extends React.Component {
    constructor(props) {
        super(props);
        var q = {};
        if (this.props.match.params.q) {
            q = convertEncodedStringToObject(this.props.match.params.q);
        }
        this.state = {
            loading: true,
            filter: [],
            yearValue: '',
            keyValue: '',
            q: q
        };

    }

    /**
     * This is called by the child filters - and is passed as a prop to individual child filters
     */
    setFilterValue = (filterName, filterValue) => {
        console.log(" STATE.SEARCH ", this.state.q);
        var filters = Object.assign({}, this.state.q);
        filters[filterName] = filterValue ; 
        this.setState({q: filters});
        setTimeout(() => 
            this.gotoSearchPage()
        );
    }

    gotoSearchPage = () => {
        let newParams = {...this.props.match.params};
        if (!newParams.hasOwnProperty('lang')) {
            newParams.lang = defaultLang().lang;
        }
        debugger;
        newParams.count = defaultListCount();
        newParams.from = 1;
        newParams.to = defaultListCount();
        newParams.q = convertObjectToEncodedString(this.state.q);
        const updatedSearchUrl = setInRoute("filter", newParams);
        const { router } = this.context;
        router.history.push(updatedSearchUrl);    
    }

    /**
     * Queries the service for the short filter cache.
     * 
     * @memberof Filter
     */
    getFilters() {
        let shortFilterCache = apiGetCall(
            'smart-filter-cache', {}
        );
        axios.get(shortFilterCache)
            .then(response => {
                const content = response.data;
                console.log( " GET FILTER :", content);
                this.setState({
                    loading: false,
                    filter: content.filter
                });
            })
            .catch(function(error) {
                console.log("error in getFilters()", error);
            });
    }

    componentDidMount() {
        this.getFilters();
    }

    /**
     * Retrieves a filter object from state for a specific type
     * @param {object} a filter type as defined in constants.js
     */
    getFilterFor = (filterType ) => 
        this.state.filter.find(
                obj => 
                    obj.name === filterTypes()[filterType].key
                );

    
    render() {
        const { loading } = this.state;
        const { match, i18n } = this.props;
        if (loading === true) {
            return (
                <Aux>
                    <div>Loading ... </div>
                </Aux>
            );
        } else {
            let filterType = filterTypes();
            return (
                <Aux>
                    <FilterDate filterType={filterType.FILTER_DATE} filter={this.getFilterFor('FILTER_DATE')} showExpanded={ false } setFilterValue={ this.setFilterValue } match={match} i18n={ i18n } />
                    <FilterCountry  filterType={filterType.FILTER_COUNTRY}  filter={this.getFilterFor('FILTER_COUNTRY')} showExpanded={ false } setFilterValue={ this.setFilterValue } match={match} i18n={ i18n } />
                    <FilterLang  filterType={filterType.FILTER_LANG}  filter={this.getFilterFor('FILTER_LANG')} showExpanded={ false }  setFilterValue={ this.setFilterValue } match={match} i18n={ i18n } />
                    <FilterKeywords   filterType={filterType.FILTER_KEYWORD}  filter={this.getFilterFor('FILTER_KEYWORD')} showExpanded={ false } setFilterValue={ this.setFilterValue } match={match} i18n={ i18n } />
                </Aux>
            );        
        }
    }

};


Filter.contextTypes = {
    router: PropTypes.object
}

export default Filter;