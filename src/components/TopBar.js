import React from 'react';
import Link from 'next/link';
import {versionInfo} from '../utils/versionhelper';
import {T} from '../utils/i18nhelper';
import SiteSearchAutoComplete from '../containers/SiteSearchAutoComplete';
import LanguageSwitcher from '../containers/LanguageSwitcher';

import mobileButton from '../images/th-menu.png';
import NotifBar from './NotifBar';
import DivRow from './DivRow';
import '../css/TopBar.css';

import GawatiAuthHelper from '../utils/GawatiAuthHelper';


const Logo = () =>
    <Link href="/">
        <a className="nav-brand"><div className="logo-img"/></a>
    </Link>
    ;

const SiteHeading = ({t}) =>
    <div className="logotype">
        <h1>{ t("african law library")}</h1>
        <h2>{ t("innovative access to law") }</h2>
    </div>
    ;

const TopBarUpper = ({i18n, routeProps}) =>
    <div className="col-12">
        <div style={ {"width":"50%:", "textAlign": "right", "marginRight":"40px", "paddingBottom":"10px"} }>
        <LanguageSwitcher i18n={i18n} routeProps={routeProps} />
        </div>
    </div>;


const SearchBox = ({lang, t}) =>
    <div className={ `col ` }>
        <form className="search-form" data-name="Email Form" id="email-form" name="email-form">
            <div className="div-block w-clearfix">
               <SiteSearchAutoComplete  lang={lang} t={t}/>
            </div>
        </form>
    </div>
    ;

class TopBar extends React.Component {
    state = { username: 'guest', authenticated: 'false'}
    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }
    login = () => {
        GawatiAuthHelper.login();
    }

    toggleDropDown = ()=>{
	    document.getElementById("myDropdown").classList.toggle("show");
	}

    logout = () => {
        GawatiAuthHelper.logout();
    }

    register = () => {
        GawatiAuthHelper.register();
    }

    getParameterByName = (variable, url)=>{
       var query = window.location.href;
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] === variable){return pair[1];}
       }
       return(false);
    }

    updateState = (authenticated, username) =>{
        this.setState({ authenticated: authenticated});
        this.setState({ username: username});
    }

    checkLogin = () =>{
        if(GawatiAuthHelper.isUserLoggedIn()){
            this.updateState('true', GawatiAuthHelper.getUserName());
        }else{
            const me = this;
            GawatiAuthHelper.save(function(response){
                var auth = GawatiAuthHelper.isUserLoggedIn() ? 'true' : 'false';
                me.updateState(auth, GawatiAuthHelper.getUserName());
            });
        }
    }
    componentDidMount() {
        this.checkLogin();
    }

    render() {
        let t = this.props.t;
    	return (
            <header className="navigation-bar">
                <div className="version-info">{
                    t("version") + " = " + versionInfo().version
                }
                </div>
                <div>
                <TopBarUpper i18n={ this.props.i18n } routeProps={ this.props.routeProps } />
                </div>
                <div className="container-fluid">
                    <Logo />
                    <SiteHeading t={t} />
                    <div className="mobile-button" onClick={this.props.slideToggle}>
                        <img alt="menu" src={mobileButton}  />
                    </div>
                    <div className="search-form-container col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <DivRow>
                        <SearchBox lang={ this.props.routeProps.query._lang } t={t}></SearchBox>
                        <NotifBar />
                        <div className="login col-3">
                            {
                            this.state.authenticated==='true' ?
                            <div className="dropdown">
                                <div onClick={this.toggleDropDown} className="dropbtn">
                                    <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                                </div>
                                <div id="myDropdown" className="dropdown-content">
                                    <button className={ `btn btn-link loggedIn` }>
                                        Logged in as <b>{this.state.username}</b>
                                    </button>
                                    <button className={ `btn btn-link` }  onClick={this.logout}>
                                        Sign out
                                    </button>
                                </div>
                            </div> : 
                            <div className="inline-elements">
                                <div className="click" onClick={ this.login }>
                                    {t("Sign in")}
                                </div>
                                <span className="or">&nbsp;&nbsp;{t("or")}&nbsp;&nbsp;</span>
                                <div className="click" onClick={ this.register}> 
                                    {t("Sign up")}
                                </div>
                            </div> 
                            }
                        </div>
                    </DivRow>
                    </div>
                </div>
                <div className="w-nav-overlay" data-wf-ignore=""/>
            </header>
        
        );
    }
}

export default TopBar;



