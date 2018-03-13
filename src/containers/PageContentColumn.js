import React from 'react';
import axios from 'axios';

import {apiGetCall} from '../api';

import '../css/PageContentColumn.css';
import GwSpinner from '../components/GwSpinner';


const PageFullWidth = ({children}) =>
    <div className={ `left col-12` }>
        {children}
    </div>
    ;

class PageContentColumn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            content:'',
            loading: true
        };
    }
   
    getPage(lang, page) {
        let apiContentPage = apiGetCall(
            'content', {
                lang : lang,
                page: page
            } 
        );
        axios.get(apiContentPage)
            .then(response => {
                const content = response.data;
                this.setState({ 
                    content: content,
                    loading: false
                });
            })
            .catch(function(error) {
                console.log("error in getPage()", error);
            });
    }

    
    componentDidMount() {      
        const { params } = this.props.match;
        this.getPage(params.lang, params.page);
    }

    componentWillReceiveProps(nextProps) {
        const {lang, page} = nextProps.match.params ;
        // we need to always convert the url query to a back-end XQuery
        this.setState({loading: true});
        this.getPage(lang, page);
    }    

    render() {
        const { content, loading } = this.state;
        if (loading === true) {
            return (
                <PageFullWidth>
                  <div className="page-content-holder">
                    <h1>Loading...</h1>
                    <GwSpinner />
                  </div>
                </PageFullWidth>
            );
        } else {
            const innerHTML = {"__html": content};
            return (
                <PageFullWidth>
                    <div className="page-content-holder" dangerouslySetInnerHTML={ innerHTML } />
                </PageFullWidth>
            );
        }
    }

}

export default PageContentColumn;
