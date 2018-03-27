import Keycloak from 'keycloak-js';
import keycloakJson from '../configs/keycloak.json';

export default class GawatiAuthHelper{

    static init = function(){
 		if(window.gawati.KC === undefined){
 			window.gawati.KC = Keycloak(keycloakJson);
 		}
 	}

    static isUserLoggedIn = function(){
	    return localStorage.getItem('KC_authenticated')==='true';
	}

	static getUserName = function(){
		var username = localStorage.getItem('KC_username');
		username = username===undefined ? 'guest' : username;
		return username;
	}

	static login = function(){
		this.init();
		window.gawati.KC.init();
	    window.gawati.KC.login();
	}

	static register = function(){
		this.init();
		window.gawati.KC.init();
	    window.gawati.KC.register();
	}

	static logout = function(){
		this.init();
		window.gawati.KC.init();
	    localStorage.setItem('KC_authenticated', 'false');
	    localStorage.setItem('KC_username', 'guest');
	    window.gawati.KC.logout();
	}

	static save = function(callback){
		this.init();
	    window.gawati.KC.init().success(function(authenticated) {
            if(authenticated){
            	localStorage.setItem('KC_authenticated', 'true');
                window.gawati.KC.loadUserProfile().success(function(profile) {
                	localStorage.setItem('KC_username', profile.username);
                    callback(true);
                }).error(function() {
                	localStorage.setItem('KC_username', 'guest');
                    callback(false);
                });
            }else{
            	localStorage.setItem('KC_authenticated', 'false');
                localStorage.setItem('KC_username', 'guest');
                callback(false);
            }
        }).error(function(error) {
            alert('failed to initialize'+error);
            callback(false);
        })
	}

	static getToken = function(callback){
		this.init();
		window.gawati.KC.updateToken(5).success(function(refreshed) {
	        callback(window.gawati.KC.token);
	    }).error(function() {
	        callback(false);
	    });
	}

	static hasRealmRole = function(role){
		this.init();
		return window.gawati.KC.hasRealmRole(role);
	}

	static hasResourceRole = function(role, resource){
		this.init();
		return window.gawati.KC.hasResourceRole(role, resource);
	}
}
