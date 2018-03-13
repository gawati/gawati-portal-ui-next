import React from 'react';
import '../css/Section.css';

function Section({children}) {
    return (
        <section className="section">
            {children}
        </section>
    );
}

export default Section;