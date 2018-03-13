import React from 'react';
import {T} from '../utils/i18nhelper';



const DocumentSignature = ({doc, type}) =>
            <div className="document-warning"> {T(
                    "This document has not been digitally signed")}
            </div>
            ;

export default DocumentSignature;
