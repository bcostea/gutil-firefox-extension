if (!com) var com = {};
if (!com.gridpulse) com.gridpulse = {};
if (!com.gridpulse.gutil) com.gridpulse.gutil = {};

com.gridpulse.gutil.Constants = {
    MENU_ID : "gutil-menu",
    BUTTON_ID: "gutil-button",

    HIDE_MENU_EVENT: "gutil:hide-menu",
    HIDE_BUTTON_EVENT: "gutil:hide-button",
    REFRESH_ALL_EVENT: "gutil:refresh-elements",
    MENU_PREFIX:"gutil.menu",
    TOOLBAR_PREFIX:"gutil.toolbar",
    MENU_ITEM_PREFIX: "gutil_menuitem_",
    TOOLBAR_ITEM_PREFIX: "gutil_toolbaritem_"
};

com.gridpulse.gutil.ButtonActions = {
    firstButtonAction:function(URL, buttonsAreSwapped) {
        if (!buttonsAreSwapped)
            getBrowser().selectedTab = getBrowser().addTab(URL);
        else
            gBrowser.loadURI(URL);
    },
    secondButtonAction:function(URL) {
        getBrowser().addTab(URL);
    },
    thirdButtonAction:function(URL, swapped) {
        if (swapped)
            getBrowser().selectedTab = getBrowser().addTab(URL);
        else
            gBrowser.loadURI(URL);
    }
};

com.gridpulse.gutil.Gutil = {
    chevronActive:false,

    getGMailURL:function ()
    {
        try {
            var urlPrefix = "http://";
            var isHTTPS = com.gridpulse.gutil.Preferences.getBooleanPreference("gutil.menu.gmailhttps");

            if (isHTTPS)
                urlPrefix = "https://";
            return getAppsEnabledURL(urlPrefix + 'mail.google.com/', urlPrefix + 'mail.google.com/hosted/');
        }
        catch(e)
        {
            com.gridpulse.gutil.Preferences.setBooleanPreference("gutil.menu.gmailhttps", false);
            return 'http://mail.google.com/';
        }
    },

    getIGoogleURL:function()
    {
        return com.gridpulse.gutil.Gutil.getAppsEnabledURL("http://www.google.com/ig","http://partnerpage.google.com/");
    },

    getCalendarURL:function ()
    {
        return com.gridpulse.gutil.Gutil.getAppsEnabledURL("http://www.google.com/calendar/", "http://www.google.com/calendar/a/");
    },
    getAppsURL:function()
    {
        return com.gridpulse.gutil.Gutil.getAppsEnabledURL("http://www.google.com/a/", "http://www.google.com/a/");
    },
    
    getAppsEnabledURL:function(URL, APPS_URL){
        var appsDomain = com.gridpulse.gutil.Preferences.getGoogleAppsDomain();
        
        if (appsDomain.length > 1) {
            return APPS_URL + appsDomain;
        } else {
            return URL;
        }
    },

    refreshElementVisibility:function()
    {
        for (var i = 0; i < com.gridpulse.gutil.SERVICES.length; i++)
        {
            var visible = true;
            var currentItemName = com.gridpulse.gutil.SERVICES[i];

            try {
                visible = com.gridpulse.gutil.Preferences.getBooleanPreference(com.gridpulse.gutil.Constants.MENU_PREFIX + "." + currentItemName);
            }
            catch(e) {
                com.gridpulse.gutil.Preferences.setBooleanPreference(com.gridpulse.gutil.Constants.MENU_PREFIX + "." + currentItemName, true);
            }

            if (!visible)
            {
                com.gridpulse.gutil.Gutil.hideElement(com.gridpulse.gutil.Constants.MENU_ITEM_PREFIX + currentItemName);
                com.gridpulse.gutil.Gutil.hideElement(com.gridpulse.gutil.Constants.TOOLBAR_ITEM_PREFIX + currentItemName);
            }
            else
            {
                com.gridpulse.gutil.Gutil.showElement(com.gridpulse.gutil.Constants.MENU_ITEM_PREFIX + currentItemName);
                com.gridpulse.gutil.Gutil.showElement(com.gridpulse.gutil.Constants.TOOLBAR_ITEM_PREFIX + currentItemName);
            }
        }
    },

    hideElement:function(elementName) {
        com.gridpulse.gutil.Gutil.setItemVisible(document.getElementById(elementName), false);
    },

    showElement:function(elementName) {
        com.gridpulse.gutil.Gutil.setItemVisible(document.getElementById(elementName), true);
    },
    setItemVisible:function(element, visible) {
        if (visible)
        {
            element.removeAttribute("hidden");
        }
        else
        {
            element.setAttribute("hidden", true);
        }
    },

    logger:function (message) {
      var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
      consoleService.logStringMessage("GUtil!: " + message);
    },
    gutilExecute:function(URL, event)
    {
        var swapped = com.gridpulse.gutil.Preferences.getBooleanPreferenceWithDefault("gutil.options.swapbuttons");
        
        var selectedItemName = event.target.id;
        selectedItemName = selectedItemName.replace(com.gridpulse.gutil.Constants.MENU_ITEM_PREFIX, "");
        selectedItemName = selectedItemName.replace(com.gridpulse.gutil.Constants.TOOLBAR_ITEM_PREFIX, "");

        if (selectedItemName == 'gmail')
        {
            URL = com.gridpulse.gutil.Gutil.getGMailURL();
        }
        if (selectedItemName == 'igoogle')
        {
            URL = com.gridpulse.gutil.Gutil.getIGoogleURL();
        }
        if (selectedItemName == 'calendar')
        {
            URL = com.gridpulse.gutil.Gutil.getCalendarURL();
        }
        if (selectedItemName == 'appd')
        {
            URL = com.gridpulse.gutil.Gutil.getAppsURL();
        }

        switch (event.button) {
            case 0:
                com.gridpulse.gutil.ButtonActions.firstButtonAction(URL, swapped);
                break;
            case 1:
                com.gridpulse.gutil.ButtonActions.secondButtonAction(URL);
                // from utilityOverlay.js, line 197 - good to know
                closeMenus(event.target);
                break;
            case 2:
                com.gridpulse.gutil.ButtonActions.thirdButtonAction(URL, swapped);
                closeMenus(event.target);
                break;
            default:
                com.gridpulse.gutil.ButtonActions.firstButtonAction(URL, swapped);
                break;
        }

        //this means the chevron functionality has been used
        if (com.gridpulse.gutil.Gutil.chevronActive)
        {
            com.gridpulse.gutil.Gutil.chevronActive = false;
            com.gridpulse.gutil.Gutil.refreshElementVisibility();
        }
    },

    executeChevron:function ()
    {
        for (var i = 0; i < com.gridpulse.gutil.SERVICES.length; i++)
        {
            var currentItemName = com.gridpulse.gutil.SERVICES[i];
            com.gridpulse.gutil.Gutil.showElement(com.gridpulse.gutil.Constants.MENU_ITEM_PREFIX + currentItemName);
            com.gridpulse.gutil.Gutil.showElement(com.gridpulse.gutil.Constants.TOOLBAR_ITEM_PREFIX + currentItemName);
        }
        com.gridpulse.gutil.Gutil.chevronActive = true;
    }
};

com.gridpulse.gutil.GutilObserver = {
    getObserverService:function(){
        return Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
    },
    observe : function(subject, topic, data)
    {
        switch (topic) {
            case com.gridpulse.gutil.Constants.HIDE_MENU_EVENT:
                var menu = document.getElementById(com.gridpulse.gutil.Constants.MENU_ID);
                if (menu)
                {
                    com.gridpulse.gutil.Gutil.setItemVisible(menu, data == "0");
                }
                break;

            case com.gridpulse.gutil.Constants.HIDE_BUTTON_EVENT:
                var button = document.getElementById(com.gridpulse.gutil.Constants.BUTTON_ID);
                if (button)
                {
                    com.gridpulse.gutil.Gutil.setItemVisible(button, data == "0");
                }
                break;

            case com.gridpulse.gutil.Constants.REFRESH_ALL_EVENT:
                com.gridpulse.gutil.Gutil.refreshElementVisibility();
                break;
        }
    }
};