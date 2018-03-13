import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import axios from 'axios';

import BaseFilter from './BaseFilter';

import {apiGetCall} from '../../api.js';
import {Aux} from '../../utils/generalhelper';
import { convertEncodedStringToObject } from '../../utils/routeshelper';
import {T} from '../../utils/i18nhelper';

import 'react-select/dist/react-select.css';

class FilterKeywords extends BaseFilter {

    constructor(props) {
        super(props);
        this.getKeywords = this.getKeywords.bind(this);
        this.state = {
            keywordLabels: []
        };
    }

    handleSelectChange = (value) => {
        this.props.setFilterValue('keywords', value.map( chosen => chosen.value ));
    }



    componentDidMount() {
        this.keywordsUILoad(this.props);
     }

    componentWillReceiveProps(nextProps) {
        // we need to always convert the url query to a back-end XQuery
        this.keywordsUILoad(nextProps);
    }    

    keywordsUILoad(props) {
        if (props.match.params.q) {
            var search = convertEncodedStringToObject(props.match.params.q);
            if (search.keywords) {
                console.log( "COMP DID MOUNT - SEARCH KEYWORDS ", search.keywords);
                this.getKeywordLabels(search.keywords);
            }
        }
    }

    getKeywordLabels(input) {
        let keywordValueApi = apiGetCall(
            'keyword-value', {
                kwv : input
            } 
        );
        axios.get(keywordValueApi)
            .then(response => {
                console.log (" RESPONSE DATA ", response.data.found);
                this.setState({ "keywordLabels": response.data.found });
            })
            .catch(error => {
                console.log("error in keywordsValue API", error);
            });
    }

    getKeywords(input) {
        if (!input) {
			return Promise.resolve({ options: [] });
		} else {
            let keywordApi = apiGetCall(
                'keyword', {
                    kw : input
                } 
            );
            return axios.get(keywordApi)
                .then(response => {
                    console.log(" MATCHES : ", response.data.matches);
                    return { options: response.data.matches };
                })
                .catch(error => {
                    console.log("error in keywords API", error);
                });
        }
	}

    render() {
        const AsyncComponent = Select.Async;
        let filterType = this.props.filterType;
        let value = [];
        if (this.props.match.params.q) {
            var search = convertEncodedStringToObject(this.props.match.params.q);
            if (search.keywords) {
                console.log( " SEARCH KEYWORDS ", search.keywords, this.state.keywordLabels);
                value = search.keywords.map(
                     (keyword) => {
                         let foundLabeledKw = this.state.keywordLabels.find( (kwl) => kwl.value === keyword);
                         console.log(" foundLabledKW ", foundLabeledKw);
                         return foundLabeledKw;
                     }
                );
            }
        }
        return (
            <Aux>
                <h2 className="small-heading">{T(filterType.label)}</h2>
                <AsyncComponent
                    backspaceRemoves={true}
                    loadOptions={this.getKeywords}
                    multi={true}
                    onChange={this.handleSelectChange}
                    value={value}
                    labelKey='showAs'
                    valueKey='value'
                    matchProp='label'
                    placeholder={T("Select keyword")}
                    />
                <div className="grey-rule"/>
            </Aux>
        );              
    }
}


FilterKeywords.propTypes = {
        filterType: PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired
        }).isRequired,
        filter: PropTypes.object.isRequired,
        showExpanded: PropTypes.bool.isRequired
    };

export default FilterKeywords;