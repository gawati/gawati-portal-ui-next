import React from 'react';
import Link from 'next/link';

const DocumentLink = ({abstract, lang, children}) => {
    return (
        <Link href={ `/doc?_lang=${lang}&_iri=${abstract['expr-iri']}` } as={ '/doc/_lang/' + lang + '/_iri' + abstract['expr-iri'] }><a>{children}</a></Link>
    );
};

export default DocumentLink; 