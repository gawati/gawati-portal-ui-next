import React from 'react';
import {NavLink} from 'react-router-dom';

import { defaultLang } from '../utils/generalhelper';
import {t} from '../utils/i18nhelper';

import imgFace from '../images/face.svg';
// import imgLinkedin from '../images/linkedin.svg';
import imgTwitter from '../images/twitter.svg';
import imgInstagram from '../images/instagram.svg';
import '../css/Footer.css';

import Link from 'next/link';

const ContentLink = ({lang, page, children}) =>
    // <Link href={ `/content?link=_lang/${lang}/_page/${page}` }><a>{page}</a></Link>
    <Link href={ `/content?_lang=${lang}&_page=${page}` } as={ `/content/_lang/${lang}/_page/${page}` }><a>{page}</a></Link>
    // <NavLink to={ `/content/_lang/${lang}/_page/${page}` }>{children}</NavLink>;

function Footer({routeProps, i18n, t}) {
    // let lang = match.params.lang || defaultLang().langUI ;
    console.log("Query params in FOOTER: ", routeProps.query);
    let lang = defaultLang().langUI ;
    return (
    <footer>
        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <ul>
                        <li>
                            <ContentLink lang={lang} page="policies">{t("Policies")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="privacy_policy">{t("Privacy Policy")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="copyright">{t("Copyright")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="terms_of_service">{t("Terms of Service")}</ContentLink>
                        </li>
                    </ul>
                </div>

                <div className="col-4">
                    <ul>
                        <li>
                            <ContentLink lang={lang} page="who_we_are">{t("Who We Are")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="what_we_do">{t("What We Do")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="faq">{t("FAQ")}</ContentLink>
                        </li>
                        <li>
                            <a href="https://www.gawati.org">{t("Blog")}</a>
                        </li>
                        <li>
                            <a href="/">{t("Contact Us")}</a>
                        </li>
                    </ul>
                </div>

                <div className="col-4">
                    <p>{t("Join over 14,000 people who receive weekly information")}</p>
                    <div className="w-form">
                        <form className="w-clearfix" data-name="Email Form 2" id="email-form-2"
                            name="email-form-2">
                            <input className="newsletter-form" data-name="Email" id="email" maxLength="256"
                                name="email" placeholder={t("Enter your email address")} required="required"
                                type="email"/>
                            <input className="submit-newsletter" data-wait="Please wait..." type="submit"
                                value=">"/>
                        </form>
                        <div className="form-done">
                            <div>{t("Thank you! Your submission has been received!")}</div>
                        </div>
                        <div className="form-fail">
                            <div>{t("Oops! Something went wrong while submitting the form")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="social-icons">
            <div className="social-link-group">
                <a
                    className="social-icon-link"
                    href="https://www.facebook.com/AfricanInnovationFoundation/"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    <img alt="facebook" src={imgFace} width="25"/>
                </a>
                <a
                    className="social-icon-link"
                    href="https://www.instagram.com/africaninnovation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img alt="instagram" src={imgInstagram} width="25"/>
                </a>
                <a
                    className="social-icon-link"
                    href="https://twitter.com/afrinnovfdn?lang=en"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    <img alt="twitter" src={imgTwitter} width="25"/>
                </a>
                {/*<a className="social-icon-link" href="/">
                    <img alt="linkedin" src={imgLinkedin} width="25"/>
                </a>*/}
            </div>
            <h5>{t("The African Law Library")}</h5>
        </div>
    </footer>
    );
}

export default Footer;