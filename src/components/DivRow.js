import React from 'react';
import '../css/DivRow.css';

function DivRow({children, altClasses}) {
    return (
        <div className={ `row ${altClasses || ""}`}>
          {children}
        </div>
    );
}

export default DivRow;