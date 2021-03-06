import React from 'react';
// import { Switch } from 'react-router-dom';
import NoSSR from 'react-no-ssr';
import {Aux} from '../utils/generalhelper';
// import {getRoute} from '../utils/routeshelper';

import PageUpperBorder from './PageUpperBorder';
import TopBar from './TopBar';
import NoMatch from './NoMatch';
import HomeContentArea from './HomeContentArea';
import DocumentContentArea from './DocumentContentArea';
import ListContentArea from './ListContentArea';
import PageContentArea from './PageContentArea';
// import Footer from './Footer';
// import { Redirect } from 'react-router'
// import {PropsRoute} from '../utils/routeshelper';
// import {Helmet} from "react-helmet";
import {PropsRouteNext} from '../utils/routeshelper';

const pathComponents = {
    "/home": HomeContentArea,
    "/content": PageContentArea,
    "/doc": DocumentContentArea,
    "/filter": ListContentArea,
    "/recent": ListContentArea,
    "/themes": ListContentArea,
}

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
         this.slideToggle = this.slideToggle.bind(this);
         this.setCollapsible = this.setCollapsible.bind(this);
    }


    slideToggle() {
        if(this.state.open) {
            this.setState({open: false});
            this.element.style.width = '0px';
        }
        else {
            this.setState({open: true});
            this.element.style.width = '100%';
        }
    };

    setCollapsible = (el) => {
        if (el) {
            this.element = el;
            if(!this.state.open) {
                el.style.width = '0px';
            }
        }
    };

    render() {
        const prod = process.env.NODE_ENV === 'production';
        var css;
        if (prod) {
            css = <Helmet>
                    <link rel="stylesheet" type="text/css" href={`${process.env.PUBLIC_URL}/static/css/themes/${process.env.REACT_APP_THEME}/vars.css`} />
                </Helmet>
        }
        return (
            <Aux>
                {css}
                <NoSSR onSSR={"Loading..."}>
                    <PropsRouteNext component={TopBar} i18n={this.props.i18n}
                    slideToggle={this.slideToggle} routeProps={this.props.routeProps} t={this.props.t} />
                </NoSSR>
                <PropsRouteNext component={pathComponents[this.props.routeProps.pathname]}  i18n={this.props.i18n} setCollapsible={this.setCollapsible} routeProps={this.props.routeProps} t={this.props.t} />
            </Aux>
        );
   } 
}

export default Page;