if (!com) var com = {};
if (!com.gridpulse) com.gridpulse = {};
if (!com.gridpulse.gutil) com.gridpulse.gutil = {};

com.gridpulse.gutil.Preferences = {
    getPreferencesService:function() {
        return Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    },
    getBooleanPreference:function(preferenceName) {
        var pref = com.gridpulse.gutil.Preferences.getPreferencesService();
        return pref.getBoolPref(preferenceName);
    },

    getBooleanPreferenceWithDefault:function(preferenceName) {
        var preferenceValue = true;
        try {
            preferenceValue = com.gridpulse.gutil.Preferences.getBooleanPreference(preferenceName);
        }
        catch(e) {
            if (preferenceName == "gutil.options.swapbuttons")
            {
                //this really has to default to false, so that we don't disturb the user's habits and feel
                com.gridpulse.gutil.Preferences.setBooleanPreference(preferenceName, false);
                preferenceValue = false;
            }
            else
                com.gridpulse.gutil.Preferences.setBooleanPreference(preferenceName, true);
        }

        return preferenceValue;
    },

    setBooleanPreference:function(preferenceName, value) {
        var pref = com.gridpulse.gutil.Preferences.getPreferencesService();
        pref.setBoolPref(preferenceName, value);

    },

    getCharacterPreference:function(preferenceName) {
        var pref = com.gridpulse.gutil.Preferences.getPreferencesService();
        return pref.getCharPref(preferenceName, "");
    },

    setCharacterPreference:function(preferenceName, preferenceValue){
        var pref = com.gridpulse.gutil.Preferences.getPreferencesService();
        pref.setCharPref(preferenceName, preferenceValue);         
    },

    getGoogleAppsDomain:function()
    {
        return com.gridpulse.gutil.Preferences.getCharacterPreference("gutil.menu.hosted.domain", "");
    },
    isMenuHidden : function() {
        try {
            return com.gridpulse.gutil.Preferences.getBooleanPreference("gutil.menu.hidden");
        }
        catch(e) {
            com.gridpulse.gutil.Preferences.setBooleanPreference("gutil.menu.hidden", false);
        }
        return false;
    },

    isButtonHidden : function() {
        try {
            return com.gridpulse.gutil.Preferences.getBooleanPreference("gutil.button.hidden");
        }
        catch(e) {
            com.gridpulse.gutil.Preferences.setBooleanPreference("gutil.button.hidden", false);
        }
        return false;
    }
};