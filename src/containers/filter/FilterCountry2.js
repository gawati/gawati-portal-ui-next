import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import BaseFilter from './BaseFilter';
import FilterLinkItems from './FilterLinkItems';

import {T} from '../../utils/i18nhelper';
import { Aux, coerceIntoArray, roundto100Filter } from '../../utils/generalhelper';
import { convertEncodedStringToObject } from '../../utils/routeshelper';

import 'react-select/dist/react-select.css';

class FilterCountry extends BaseFilter {

    constructor(props) {
        super(props);
        this.countries = 
            coerceIntoArray(props.filter.country).map( 
                countryObj => ({
                    label: countryObj['#text'] + ' (' + roundto100Filter(countryObj['count']) + ')',
                    value: countryObj['code']
                })
            );
    }
    
    handleSelectChange = (value) => {
        this.props.setFilterValue('countries', value.map( chosen => chosen.value ));
    }

    /**
     * !+KOHSAH(2017-12-26)
     *  -- changed from simpleValue to object based value selection since countries can have commas
     *  -- moved countries coercer into constructor, so it isnt called everytime render is called.
     */
    render () {
        let filterType = this.props.filterType;
        let countries = this.countries;
        let value = [];
        if (this.props.match.params.q) {
            // if there is a search url param look for the countries filter
            var search = convertEncodedStringToObject(this.props.match.params.q);
            if (search.countries) {
              // if there is a countries filter, then it has the country code, we need to send the full object 
              // for react-select to set the selection, so for each code find the countries matching and send an 
              // array of these country objects as the value with the updated count.
              // we need to do this to set the display count "Kenya 200+" along with the country code
              value = search.countries.map(
                    countryCode => countries.find( country => country.value === countryCode)
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
                    options={countries}
                    placeholder={T("Select countries")}
                    removeSelected={true}
                    rtl={false}
                    value={value}
                />
                <small>
                    <FilterLinkItems items={ countries } type="countries" lang={ this.props.match.params.lang }/>...
                </small>
                <div className="grey-rule"/>
            </Aux>
        );
    }
}

FilterCountry.propTypes = {
    filterType: PropTypes.shape({
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired
    }).isRequired,
    filter: PropTypes.object.isRequired,
    setFilterValue: PropTypes.func.isRequired,
    showExpanded: PropTypes.bool.isRequired
};

export default FilterCountry;
