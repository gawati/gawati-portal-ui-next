import React from 'react';
import BaseFilter from './BaseFilter';
import PropTypes from 'prop-types';
import Select from 'react-select';

import FilterLinkItems from './FilterLinkItems';

import {T} from '../../utils/i18nhelper';
import {Aux, coerceIntoArray, roundto100Filter} from '../../utils/generalhelper';

import 'react-select/dist/react-select.css';

class FilterLang extends BaseFilter {

    constructor(props) {
        super(props);
        this.langs = coerceIntoArray(this.props.filter.lang).map( 
            lang => ({
                label: lang['#text'] + ' (' + roundto100Filter(lang['count']) + ')',
                value: lang['code']
            })
        );
    }

    handleSelectChange = (value) => {
        //this.props.setFilterValue('langs', value)
        this.props.setFilterValue('langs', value.map( chosen => chosen.value ));
    }
    
    /**
     * !+KOHSAH(2017-12-26)
     *  -- changed from simpleValue to object based value selection since countries can have commas
     *  -- moved countries coercer into constructor, so it isnt called everytime render is called.
     */
    render() {
        let filterType = this.props.filterType;
        let langs = this.langs;
        let value = [];
        if (this.props.match.params.q) {
            var search = JSON.parse(decodeURIComponent(this.props.match.params.q));
            if (search.langs) {
                value = search.langs.map(
                    langCode => langs.find( lang => lang.value === langCode)
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
                    options={langs}
                    placeholder={T("Select language")}
                    removeSelected={true}
                    rtl={false}
                    value={value}
                />
                <small>
                    <FilterLinkItems items={ langs } type="langs" lang={ this.props.match.params.lang }/>...
                </small>
                <div className="grey-rule"/>
            </Aux>
        );                
    }
}

FilterLang.propTypes = {
        filterType: PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
        }).isRequired,
        filter: PropTypes.object.isRequired,
        showExpanded: PropTypes.bool.isRequired
    };

FilterLang.contextTypes = {
  router: PropTypes.object
}    

export default FilterLang;