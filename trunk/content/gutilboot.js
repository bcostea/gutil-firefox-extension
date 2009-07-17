if (!com) var com = {};
if (!com.gridpulse) com.gridpulse = {};
if (!com.gridpulse.gutil) com.gridpulse.gutil = {};

com.gridpulse.gutil.GutilMain = {
    buttonSetup : function() {
        var toolbox = document.getElementById("navigator-toolbox");
        var toolboxDocument = toolbox.ownerDocument;

        //check for the button
        var hasButton = false;
        for (var i = 0; i < toolbox.childNodes.length; ++i) {
            var toolbar = toolbox.childNodes[i];
            if (toolbar.localName == "toolbar" && toolbar.getAttribute("customizable") == "true") {

                if (toolbar.currentSet.indexOf("gutil-button") > -1)
                    hasButton = true;
            }
        }

        // ups, the button is not added - add the button ( dont worry, if it's hidden in the prefs, we wont show it!!)
        if (!hasButton) {
            for (var j = 0; j < toolbox.childNodes.length; ++j) {
                toolbar = toolbox.childNodes[j];
                if (toolbar.localName == "toolbar" && toolbar.getAttribute("customizable") == "true" && toolbar.id == "nav-bar") {

                    var newSet = "";
                    var child = toolbar.firstChild;
                    while (child) {

                        if (!hasButton && child.id == "urlbar-container") {
                            newSet += com.gridpulse.gutil.Constants.BUTTON_ID + ",";
                            hasButton = true;
                        }

                        newSet += child.id + ",";
                        child = child.nextSibling;
                    }

                    newSet = newSet.substring(0, newSet.length - 1);
                    toolbar.currentSet = newSet;

                    toolbar.setAttribute("currentset", newSet);
                    toolboxDocument.persist(toolbar.id, "currentset");
                    BrowserToolboxCustomizeDone(true);
                    break;
                }
            }
        }

        //has the user hidden our menu?
        if (com.gridpulse.gutil.Preferences.isMenuHidden()) {
            com.gridpulse.gutil.Gutil.hideElement(com.gridpulse.gutil.Constants.MENU_ID);
        }

        //has the user hidden our button?
        if (com.gridpulse.gutil.Preferences.isButtonHidden()) {
            com.gridpulse.gutil.Gutil.hideElement(com.gridpulse.gutil.Constants.BUTTON_ID);
        }

        //add observers
        var observerService = com.gridpulse.gutil.GutilObserver.getObserverService();
        observerService.addObserver(com.gridpulse.gutil.GutilObserver, com.gridpulse.gutil.Constants.HIDE_MENU_EVENT, false);
        observerService.addObserver(com.gridpulse.gutil.GutilObserver, com.gridpulse.gutil.Constants.HIDE_BUTTON_EVENT, false);
        observerService.addObserver(com.gridpulse.gutil.GutilObserver, com.gridpulse.gutil.Constants.REFRESH_ALL_EVENT, false);


        com.gridpulse.gutil.Gutil.refreshElementVisibility();
    }
};


/***********************************************************************************************************/
// start it up
window.addEventListener("load", com.gridpulse.gutil.GutilMain.buttonSetup, false);
