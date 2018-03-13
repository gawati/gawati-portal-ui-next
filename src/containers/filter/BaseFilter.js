import React from 'react';

class BaseFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showExpanded : this.props.showExpanded
        };
    }
}

export default BaseFilter;