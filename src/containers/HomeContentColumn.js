import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import {apiGetCall} from '../api';
import {homePageFilterWords} from '../constants';
import {T} from '../utils/i18nhelper';

import ThemeOfTheMonth from '../containers/ThemeOfTheMonth';
import RecentDocs from '../containers/RecentDocs';

import '../css/react-tabs.css';
import '../css/HomeContentColumn.css';

class HomeContentColumn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            themes: {
                content:  [],
                loading: true
            },
            latest:  {
                content:  [],
                loading: true
            },
            lang: this.props.lang
        };
    }
   
    getRecentSummary() {
        let apiRecentSummary = apiGetCall(
            'recent-summary', {
                count : 4,
                from: 1,
                to: 4
            } 
        );
        axios.get(apiRecentSummary)
            .then(response => {
                const content = response.data.exprAbstracts.exprAbstract;
                this.setState({ 
                    latest: {
                        loading: false, 
                        content : content
                    }
                });
            })
            .catch(function(error) {
                console.log("error in getRecentSummary()", error);
            });
    }

    
    getThemesSummary() {
        let apiThemesSummary = apiGetCall(
            'themes-summary', {
                themes : homePageFilterWords()["keywords"],
                count : 4,
                from: 1,
                to: 4
            } 
        );
        axios.get(apiThemesSummary)
            .then(response => {
                const content = response.data.exprAbstracts.exprAbstract;
                console.log( content );
                this.setState({ 
                    themes: {
                        loading: false, 
                        content : content
                    }
                });
            })
            .catch(function(error) {
                console.log("error in getThemesSummary()", error);
            });
    }

    componentDidMount() {      
        this.getRecentSummary();
        this.getThemesSummary();
    }

    componentWillReceiveProps (nextProps) {
        this.setState({lang: nextProps.lang})
    }

    render() {
        const { latest, themes } = this.state;
        let content;
        let _lang = this.state.lang;
        /*
        * BOOTSTRAP + REACT TABS
        *
        content = 
            <div className={ `left col-9` }>
                <Tabs selectedTabClassName="home-active-tab">
                        <div className="d-tabs">
                            <TabList className="tab-menu">
                            <Tab><a href="javascript:;" className="tab">In Focus</a></Tab>
                            <Tab><a href="javascript:;" className="tab">Latest</a></Tab>
                            </TabList>
                        </div>
                        <div className={ `tabs-content w-tab-content` }>
                            <TabPanel className="tab-pane">
                                {this.state.themes.loading ? <Loading tab="1" /> : 
                                <ThemeOfTheMonth themes={this.state.themes.content} tab={1} /> }
                            </TabPanel>
                            <TabPanel  className="tab-pane">
                            {this.state.latest.loading ? <Loading tab="2" /> : 
                                <RecentDocs recentDocs={this.state.latest.content} tab={2} /> }
                            </TabPanel>
                        </div>
                </Tabs>
            </div>
            */

        /**
         * PURE REACT TABS
         */    
        content = 
        <div className={ `left col-xs-12 col-lg-9 col-md-9 col-sm-12` }>
            <Tabs>
                <TabList>
                    <Tab>{ T("latest") }</Tab>
                    <Tab>{ T("in focus") }</Tab>
                </TabList>
                <TabPanel>
                    <RecentDocs loading={latest.loading} recentDocs={latest.content} tab={1} lang={_lang}/> 
                </TabPanel>
                <TabPanel>
                    <ThemeOfTheMonth loading={themes.loading} themes={themes.content} tab={2} lang={_lang}/>
                </TabPanel>
            </Tabs>
        </div>
        return content;
    }

}

/*
**
** BOOTSTRAP TABS
**
function HomeContentColumn() {
    return (
<div className={ `left col-9` }>
      {getHomeTabs()}
        {
    <div className="d-tabs">
        <ul className="tab-menu">
            <li>
                <a href="#" className={ `tab active` }>In focus</a>
            </li>
            <li>
                <a href="#" className="tab">Latest</a>
            </li>
            <li>
                <a href="#" className="tab">Popular</a>
            </li>
        </ul>
    </div>
    <div className={ `tabs-content w-tab-content` }>
        <div className={ `tab-pane tab-active` } data-tab="t1">
            <div className={ `feed w-clearfix` }>
                <h2>Theme of the month</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <a className="more-button" href="#">
                    <img src="images/export.png"/>
                </a>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the second tittle.</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the tittle after the second</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className="button-wrapper">
                <a className={ `button w-button` } href="/all-posts">More posts&#160;→</a>
            </div>
        </div>

        <div className="tab-pane" data-tab="t2" style={{ display: 'none' }}>
            <div className={ `feed w-clearfix` }>
                <h2>Latest Theme of the month</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <a className="more-button" href="#">
                    <img src="images/export.png"/>
                </a>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the second tittle.</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the tittle after the second</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className="button-wrapper">
                <a className={ `button w-button` } href="/all-posts">More posts&#160;→</a>
            </div>
        </div>

        <div className="tab-pane" data-tab="t3" style={{ display: 'none'}}>
            <div className={ `feed w-clearfix` }>
                <h2>Popular Theme of the month</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <a className="more-button" href="#">
                    <img src="images/export.png"/>
                </a>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the second tittle.</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the tittle after the second</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className="button-wrapper">
                <a className={ `button w-button` } href="/all-posts">More posts&#160;→</a>
            </div>
        </div>
    </div>
         }


</div>
    );
}
*/
export default HomeContentColumn;
