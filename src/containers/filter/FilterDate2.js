import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import Select from 'react-select';

import FilterLinkItems from './FilterLinkItems';

import {T} from '../../utils/i18nhelper';
import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

import 'react-select/dist/react-select.css';

class FilterDate extends BaseFilter {

    constructor(props) {
        super(props);
        console.log( " I18N DATE ", props.i18n);
        this.years = coerceIntoArray(this.props.filter.year).map( 
            year => ({
                label: year['year'] + ' (' + roundto100Filter(year['count']) + ')',
                value: year['year']
            })
        );
    } 

    handleSelectChange = (value) => {
        this.props.setFilterValue('years', value.map( chosen => chosen.value ));
    };
    

    render() {
        let filterType = this.props.filterType;
        let years = this.years;
        let value = [];
        if (this.props.match.params.q) {
            var search = JSON.parse(decodeURIComponent(this.props.match.params.q));
            if (search.years) {
                value = search.years.map(
                    yearNo => years.find( year => year.value === yearNo)
                );
            }
        }    
        return (
            <Aux>
                <h2 className="small-heading">{T(filterType.label)}</h2>
                <Select
                    closeOnSelect={false}
                    disabled={false}
                    multi
                    onChange={this.handleSelectChange}
                    options={years}
                    placeholder={T("Select year")}
                    removeSelected={true}
                    rtl={false}
                    value={value}
                />
                <small>
                    <FilterLinkItems items={ years } type="years" lang={ this.props.match.params.lang }/>...
                </small>                
                <div className="grey-rule"/>
            </Aux>
        );        
    }
}

FilterDate.propTypes = {
        filterType: PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
        }).isRequired,
        filter: PropTypes.object.isRequired,
        showExpanded: PropTypes.bool.isRequired
    };

export default FilterDate;