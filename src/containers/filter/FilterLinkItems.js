import React from 'react';
import PropTypes from 'prop-types';

import FilterLinkItem from './FilterLinkItem';

import { Aux } from '../../utils/generalhelper';
/**
 * Renders quick navigation links below the filter auto-complete
 * @param {array} items Array of items to render
 * @param {string} type The Type of the filter (countries, langs, etc as defined in xqueryhelper.filterConfig)
 * @param {noOfLinks} integer the number of links to show, defaults to 3 if not specified
 */
const FilterLinkItems = ({ items, type, noOfLinks, lang }) => 
    <Aux>
    {
        items.slice(0, noOfLinks).map( 
            item => <FilterLinkItem key={ `url-${type}-${item.value}` } item={ item } type={ type } lang={ lang }/>
        ).reduce(
            (prev, curr) => [prev, ', ', curr]
        )                    
    }
    </Aux>     
;

FilterLinkItems.defaultProps = {
    noOfLinks: 3
};

FilterLinkItems.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    noOfLinks: PropTypes.number
};




export default FilterLinkItems;