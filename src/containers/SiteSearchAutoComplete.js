import React from 'react';

import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import {stringCut, displayDate, Aux} from '../utils/generalhelper';
import {apiGetCall} from '../api.js';
import { T } from '../utils/i18nhelper';

import DocumentLink from '../containers/DocumentLink';

import '../css/Autosuggest.css';
import '../css/SiteSearchAutoComplete.css';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';

/**
 * Implementation that wraps React Auto-Suggest for use in the main search box
 * 
 * @class SiteSearchAutoComplete
 * @extends {React.Component}
 */
class SiteSearchAutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            value: '',
            suggestions: [],
            lang: this.props.lang
        };
        this.lastRequestId = null;
    }

    /**
     * Makes an async request for search suggestions
     * 
     * @param {any} value 
     */
    getSuggestionsAsync = (value) => {
        if (this.lastRequestId !== null ) {
            clearTimeout(this.lastRequestId);
        }
        this.setState({
            loading: true
        });
        this.lastRequestId = setTimeout(
            () => this.getSearchResultsAsync(value)
            ,
            1000
        );
    };


    abbrTitle = (thisString) => {
        if (thisString.length > 200) {
            return thisString.substr(0,199) + "..."
        } else {
            return thisString;
        }
    };
    

    getSearchResultsAsync = (value) => {
        const inputValue = value.trim().toLowerCase();
        //console.log( "Calling search grouped ");
        let apiRecent = apiGetCall(
            'search-grouped', 
            {query: inputValue}
        );
        axios.get(apiRecent)
            .then(response => {
                const items = response.data.searchGroups.searchGroup;
                // filter the returned results for only groups that have search result 
                // items. We don't want to show empty groupings in the auto-complete
                const filtered = items.filter(item => item.hasOwnProperty('searchResult'));
                this.setState({
                    loading: false,
                    suggestions: filtered
                });
            })
            .catch(function(error) {
                console.log("error in getDocument()", error);
            });        
    };    

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestionsAsync(value);
    };

    shouldRenderSuggestions = (value) => {
        return value.trim().length > 2;
    }
      

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: []
        });
    };
    
    renderSectionTitle = (section) => {
        return (
          <strong>{ section.label }</strong>
        );
    };

    /**
     * Returns the suggestions for a section
     * We check if the searchResult key is an object or an array because JSON serialization of the XML
     * returns single child elements as an object rather than an array
     * 
     * @param {any} section 
     * @returns 
     */
    getSectionSuggestions = (section) => {
        return Array.isArray(section.searchResult) ? section.searchResult : [section.searchResult] || [];
    };

    
    renderSuggestion = (suggestion) => {
        let itemDate = displayDate(suggestion.exprAbstract.date[1].value) || suggestion.exprAbstract.date[1].value ;
        return (
        <div className="ui-ac-item-render">
            <DocumentLink abstract={suggestion.exprAbstract} { ...this.props.lang } >
                <div className="ui-ac-item-render-content">
                    <h3>{   stringCut(199, suggestion.exprAbstract.publishedAs || "unknown")  }</h3>
                    <nav className="ui-act-item-meta">
                    <ol>
                        <li><span className="ui-ac-item-type">{suggestion.exprAbstract.type.name}</span></li>
                        <li><span className="ui-ac-item-country">{suggestion.exprAbstract.country.showAs}</span></li>
                        <li><span className="ui-ac-item-date">{itemDate}</span></li>
                    </ol>
                    </nav>
                </div>
            </DocumentLink>
        </div>
        );
    };
      

    /**
    * We render a custom input component to pass in the data-loading prop which is
    * used to set the css spinner
    */
    renderInputComponent = inputProps => {
        //console.log( " RENDER INPUT ", inputProps);
        return (
            <input data-loading={ inputProps.loading } {...inputProps} />
        );
    };

    getSuggestionValue = (suggestion) => suggestion.exprAbstract.publishedAs ;  

    render() {
        const { value, suggestions, loading } = this.state;
        const inputProps = {
          placeholder: T("type at least 3 letters"),
          value,
          loading: loading ? "yes" : "no",
          onChange: this.onChange
        };
        // Autosuggest will pass through all these props to the input.
        return (
            <Aux>
              <Autosuggest 
                suggestions={suggestions}
                multiSection={true}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                renderSectionTitle={this.renderSectionTitle}
                getSectionSuggestions={this.getSectionSuggestions}
                renderInputComponent={this.renderInputComponent}
                inputProps={inputProps} />
                <button className={ `submit-button w-button` } data-wait="Please wait..." type="submit">
                    <FontAwesome name='search' />
                </button>
          </Aux>
          );
      }
}

export default SiteSearchAutoComplete;
