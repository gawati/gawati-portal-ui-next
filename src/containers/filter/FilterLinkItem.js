import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { setInRoute, convertObjectToEncodedString } from '../../utils/routeshelper';
import {T} from '../../utils/i18nhelper';
/**
 * Called by FilterLinkItems to render an individual link
 * @param {object} item to render
 * @param {type} type of filter item to render 
 */
const FilterLinkItem = ({ item, type, lang }) => {
    let obj = {} ;
    obj[type] = [item.value];
    console.log( " LINKITEM OBJ ", obj);
    const url = setInRoute(
        'filter', 
        {
            lang: lang, 
            from: 1, 
            count: 10, 
            to: 10, 
            q: convertObjectToEncodedString(
                obj
            )
        } 
    );
    var label = item.label;
    if (type === 'countries') {
        const count = item.label.substring(item.label.indexOf('(') - 1, item.label.length);
        const country = item.label.substring(0, item.label.indexOf(count));
        label = T(country) + count;
    }
    return (
        <NavLink to={ url }>{label}</NavLink>
    );
};

FilterLinkItem.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};

export  default FilterLinkItem;