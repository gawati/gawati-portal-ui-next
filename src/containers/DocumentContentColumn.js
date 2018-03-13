import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DivFeed from '../components/DivFeed';

import {apiGetCall} from '../api';
import { prefixIri, isEmpty, insertIntoArray} from '../utils/generalhelper';
import {T} from '../utils/i18nhelper';
import {anPublication, anFRBRnumber, anTLCConcept, anExprFRBRdate} from '../utils/akomantoso';


import DocumentBreadcrumb from './DocumentBreadcrumb';
import DocumentNavBlock from './DocumentNavBlock';
import DocumentSignature from './DocumentSignature';
import DocumentActions from './DocumentActions';
import DocumentTagCloud from './DocumentTagCloud';
import DocumentPDF from './DocumentPDF';

import DivListing from '../components/DivListing';
import ListingLoading from '../components/ListingLoading';
import {anDocType, anDocTitle} from '../utils/akomantoso';

import 'react-tabs/style/react-tabs.css';
import '../css/react-tabs.css';
import '../css/DocumentTagCloud.css';

const DocumentTitle = ({doc, type}) =>
    <h1>{anPublication(doc, type)['showAs']}</h1>;

/*
const DocumentPartOf = ({doc, type}) => {
    return (
        <div className="part-of"> Part of the <a href="#"> Mixed Market Act 1991</a>. Work <a
        href="#">Search within this Work</a> &#160;| &#160;<a href="#">Timeline of the
        Work</a>
        </div>
    );
}
*/


const getThemes = (doc, type) => {
    let tlcc = anTLCConcept(doc, type);
    if (Array.isArray(tlcc)) {
       let tlccArr = 
        insertIntoArray(
            tlcc.filter(
                concept => concept.href.startsWith('/ontology/Concept')
            ).map(
                concept => <span className="text-span-19" key={concept.eId}>{concept.showAs}</span>
            ),
            ' \u00B7 '
        );
        return tlccArr;
    } else {
        return (
            <span className="text-span-19">{tlcc.showAs}</span>
        )
    }
};

const DocumentMetadata = ({doc, type}) => {
    return(
        <ul className="metadata">
            <li><strong>{T("Document Number")}:</strong> {anFRBRnumber(doc, type).showAs}</li>
            <li><strong>{T("Entry into Force date")}:</strong>  {  anExprFRBRdate(doc, type).date  /*displayDate(gawatiDateEntryInForce(doc, type).date)*/}</li>
            <li><strong>{T("Themes")}:</strong>  {getThemes(doc, type)}</li>
        </ul>
    );
}; 

const DocumentContentInfo = ({doc, type}) => {
    return (
        <Tabs>
        <TabList>
          <Tab>Metadata</Tab>
          <Tab>PDF</Tab>
        </TabList>
        <TabPanel>
          <DivFeed>
            <DocumentMetadata doc={doc} type={type} />
           </DivFeed>
        </TabPanel>
        <TabPanel>
          <DivFeed>
            <DocumentPDF doc={doc} type={type} />
          </DivFeed>
        </TabPanel>
      </Tabs>
    );
}
 
DocumentContentInfo.propTypes = DocumentMetadata.propTypes = {
    doc: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}

class DocumentContentColumn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.match.params['lang'],
            iri: prefixIri(this.props.match.params['iri']),
            loading: true,
            docType : '',
            doc: {
            }
        };
    }
   
    getDocument(iri) {
        let apiDoc = apiGetCall(
            'doc', {
                iri : iri
            } 
        );
        axios.get(apiDoc)
            .then(response => {
                const doc = response.data;
                this.setState({
                    loading: false,
                    doc: doc,
                    docType: anDocType(doc)
                });
               
                document.title =  `${T("african law library")}  ${anDocTitle(doc)}`;
            })
            .catch(function(error) {
                console.log("error in getDocument()", error);
            });
    }


   
    componentDidMount() {
        this.getDocument(this.state.iri);
        
    }

    /**
     * This is required to ensure the page content refreshes when the url param changes for the route
     * @param {object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        this.getDocument(prefixIri(nextProps.match.params['iri']));
    }    

    render() {
        if (this.state.doc === undefined || isEmpty(this.state.doc)) {
            return (
                <ListingLoading>
                    <h2>Loading...</h2>
                </ListingLoading>
            );
        } else {        
            console.log("DOC TYPES ", this.props.match);
            let content = 
            <DivListing lang={this.props.match.params.lang}>
                <DocumentBreadcrumb doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                <div className={ `feed w-clearfix`}>
                    <DocumentTitle doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                    <DocumentNavBlock doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                    <DocumentSignature doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                    <DocumentActions doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                    <DocumentTagCloud doc={this.state.doc} type={this.state.docType} lang={this.props.match.params.lang} />
                    <DocumentContentInfo doc={this.state.doc} type={this.state.docType}  lang={this.props.match.params.lang} />
                </div>
            </DivListing>
            ;
    return content;
    }
    }
}

export default DocumentContentColumn;

