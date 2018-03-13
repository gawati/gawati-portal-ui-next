import React from 'react';
import Filter from '../containers/filter/Filter2';
import {T} from '../utils/i18nhelper';
import '../css/SideBarColumn.css';

class SideBarColumn extends React.Component{

    render() {
        const {match, i18n} = this.props;
        console.log( " SIDEBAR i18n", i18n);
        return (
            <div className={ `right col-3` }  ref={this.props.setCollapsible} id="filter-container">
                <div className={ `w-clearfix white-wrapper` }>
                    <Filter match={ match } i18n={ i18n }/>
                    <p className="cc-law-libray">{T("The African Law Library")}</p>
                </div>
            </div>
        );
    }
}

export default SideBarColumn;

