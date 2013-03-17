/**
 * Created with JetBrains WebStorm.
 * User: capacman
 * Date: 3/10/13
 * Time: 3:50 PM
 * To change this template use File | Settings | File Templates.
 */
(function () {

    Usergrid.SSO = function () {
    };

    Usergrid.SSO.prototype = {

        default: {
            top_level_domain: "localhost",
            use_sso: false, // flag to override use SSO if needed set to ?use_sso=no
            login_url: "https://vubuntu:8443/cas/login",
            gatewayService: "http://vubuntu:8090/management/token",
            loginService: "http://localhost:8000/index.html",
            logout_url: "https://vubuntu:8443/cas/logout",
            api_url: "http://vubuntu:8090/"
        },

        isTopLevelDomain: function () {
            return window.location.hostname === this.default.top_level_domain;
        },

        usingSSO: function () {
            return this.getSSO() && this.isTopLevelDomain();
        },

        getSSO: function () {
            return this.default.use_sso;
        },

        getGatewayUrl:function(){
          return this.default.login_url+"?service="+this.default.gatewayService+"&gateway=true";
        },

        //Private
        sendToPage: function (url) {
            var newPage = url;
            //newPage += this.getSSOCallback(urlCallback);
            //TODO: remove debug
            console.log(newPage);
            window.location = newPage;
        },

        sendToSSOLogoutPage: function (callbackUrl) {
            this.sendToPage(this.default.logout_url);
        },

        sendToSSOLoginPage: function () {
            this.sendToPage(this.default.login_url+"?service="+this.default.loginService);
        },

        sendToSSOProfilePage: function (callbackUrl) {
            this.sendToPage(this.default.profile_url);
        },

        setUseSSO: function (sso) {
            if (sso === ( 'yes' || 'true')) {
                this.default.use_sso = true;
            } else if (sso === ('no' || 'false')) {
                this.default.use_sso = false;
            }
        }
    };
})(Usergrid);

Usergrid.SSO = new Usergrid.SSO();