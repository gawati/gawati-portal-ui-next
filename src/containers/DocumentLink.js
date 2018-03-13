import React from 'react';
import {Link} from 'react-router-dom';

const DocumentLink = ({abstract, lang, children}) => {
    return (
        <Link to={'/doc/_lang/' + lang + '/_iri' + abstract['expr-iri']}>{children}</Link>
    );
};

export default DocumentLink; 