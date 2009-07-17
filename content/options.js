if (!com) var com = {};
if (!com.gridpulse) com.gridpulse = {};
if (!com.gridpulse.gutil) com.gridpulse.gutil = {};

com.gridpulse.gutil.OptionsDialog = {
    startup: function ()
    {

        var gutil = com.gridpulse.gutil;

        for (var i = 0; i < gutil.SERVICES.length; i++)
        {
            var currentItemName = gutil.SERVICES[i];
            var itemVisible = gutil.Preferences.getBooleanPreferenceWithDefault(gutil.Constants.MENU_PREFIX + "." + currentItemName);
            gutil.OptionsDialog.checkOption("menuHideCheckbox" + currentItemName, itemVisible);
        }

        var optionChecked = gutil.Preferences.getBooleanPreference(gutil.Constants.MENU_PREFIX + ".hidden");
        gutil.OptionsDialog.checkOption("menuHideCheckbox", optionChecked);

        optionChecked = gutil.Preferences.getBooleanPreference("gutil.button.hidden");
        gutil.OptionsDialog.checkOption("buttonHideCheckbox", optionChecked);

        optionChecked = gutil.Preferences.getBooleanPreference(gutil.Constants.MENU_PREFIX + ".gmailhttps");
        gutil.OptionsDialog.checkOption("gmailSecuredCheckbox", optionChecked);

        optionChecked = gutil.Preferences.getBooleanPreference(gutil.Constants.MENU_PREFIX + ".chevron");
        gutil.OptionsDialog.checkOption("chevronCheckbox", optionChecked);

        optionChecked = false;

        optionChecked = gutil.Preferences.getBooleanPreferenceWithDefault("gutil.options.swapbuttons");
        gutil.OptionsDialog.checkOption("swapButtonsCheckbox", optionChecked);

        var hostedDomainAddress = document.getElementById("hostedDomain");
        hostedDomainAddress.value = gutil.Preferences.getCharacterPreference("gutil.menu.hosted.domain");

    },
    toggleGutilElement:function (elementName, elementObject)
    {
        var objectCheckbox = document.getElementById(elementObject);
        com.gridpulse.gutil.Preferences.setBooleanPreference(elementName, objectCheckbox.checked);
    },

    checkOption:function(checkBoxId, checked)
    {
        var itemCheckbox = document.getElementById(checkBoxId);
        if (itemCheckbox)
            itemCheckbox.setAttribute("checked", checked);
    },

    visitHomePage:function()
    {
        var parentWindow = null;
        var url = "http://www.gridpulse.com/gutil/";

        // If there is a parent window or a grand parent window
        if (window.opener)
        {
            if (window.opener.opener)
            {
                parentWindow = window.opener.opener;
            }
            else
            {
                parentWindow = window.opener;
            }
        }

        // If a parent window was found open the homepage in a new tab and set that tab as selected
        if (parentWindow)
        {
            parentWindow.getBrowser().selectedTab = parentWindow.getBrowser().addTab(url);
            window.close();
        }
    },


    /**************************************************************************************************/
    // Notifies the observers
    optionOk:function ()
    {

        var observerService = com.gridpulse.gutil.GutilObserver.getObserverService();

        var menuHideCheckbox = document.getElementById("menuHideCheckbox");
        var buttonHideCheckbox = document.getElementById("buttonHideCheckbox");
        var hg = document.getElementById("hostedDomain");

        if (menuHideCheckbox.checked)
        {
            observerService.notifyObservers(null, com.gridpulse.gutil.Constants.HIDE_MENU_EVENT, "1");
        } else {
            observerService.notifyObservers(null, com.gridpulse.gutil.Constants.HIDE_MENU_EVENT, "0");
        }

        if (buttonHideCheckbox.checked)
        {
            observerService.notifyObservers(null, com.gridpulse.gutil.Constants.HIDE_BUTTON_EVENT, "1");
        } else {
            observerService.notifyObservers(null, com.gridpulse.gutil.Constants.HIDE_BUTTON_EVENT, "0");
        }

        com.gridpulse.gutil.Preferences.setCharacterPreference(com.gridpulse.gutil.Constants.MENU_PREFIX + ".hosted.domain", hg.value);

        observerService.notifyObservers(null, com.gridpulse.gutil.Constants.REFRESH_ALL_EVENT, "0");

        window.close();
    },
    toggleAllItems:function()
    {

        var booleanToggleAll = com.gridpulse.gutil.Preferences.getBooleanPreferenceWithDefault(com.gridpulse.gutil.Constants.MENU_PREFIX + "." + com.gridpulse.gutil.SERVICES[0]);
        booleanToggleAll = !booleanToggleAll;

        for (var i = 0; i < com.gridpulse.gutil.SERVICES.length; i++) {
            var currentItem = com.gridpulse.gutil.SERVICES[i];
            com.gridpulse.gutil.Preferences.setBooleanPreference(com.gridpulse.gutil.Constants.MENU_PREFIX + "." + currentItem, booleanToggleAll);
            com.gridpulse.gutil.OptionsDialog.checkOption("menuHideCheckbox" + currentItem, booleanToggleAll);
        }

        return true;
    }
};
