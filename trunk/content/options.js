//cheaper this way ;)
// FIXME: change this to a nice configurable object in next version(3.0)
var elements=new Array(
            "adsense",
            "adwords",
            "alerts",
            "analytics",
            "appd",
	        "appen",
            "archives",
            "base",
            "blogsearch",
            "blogger",
            "bloggerindraft",
            "bookmarks",
            "books",
            "calendar",
            "catalogs",
            "checkout",
            "code",
            "codesearch",
            "coop",
            "dice",
            "directory",
            "docs",
            "earth",
            "experimental",
	        "feedburner",
            "finance",
            "gmail",
            "groups",
	        "health",
            "history",
            "igoogle",
            "imagelabeler",
            "image",
            "labs",
            "linuxrepo",
            "local",
            "maps",
            "mars",
            "moon",
            "movies",
            "musicsearch",
            "news",
            "notebook",
            "orkut",
            "pack",
            "pagecreator",
            "patents",
	        "phonebook",
            "picasaweb",
            "productsearch",
            "reader",
            "relatedlinks",
            "ridefinder",
            "scholar",
            "search",
            "sets",
            "sites",
            "sketchup",
            "sky",
            "ssearch",
	        "store",
            "suggest",
            "translate",
            "transit",
            "trends",
            "video",
            "youtube",
            "warehouse",
            "wbt",
            "acc"
            );
            
// this is used for the toggleAllItems function
var booleanToggleAll=true;

/*************************************************************************************************/
// Option Dialog entry point
function startup()
{
   for (i=0;i<elements.length;i++)   
    {
      var check = ggetBoolPref("gutil.menu." + elements[i]);
      checkOption("menuHideCheckbox"+ elements[i],check);
    }

    var check = ggetBoolPref("gutil.menu.hidden");
    checkOption("menuHideCheckbox",check);
    
    check = ggetBoolPref("gutil.button.hidden");
    checkOption("buttonHideCheckbox",check);
    
    check = ggetBoolPref("gutil.menu.gmailhttps");
    checkOption("gmailSecuredCheckbox",check);
    
    check = ggetBoolPref("gutil.menu.chevron");
    checkOption("chevronCheckbox",check);
    
    check = false;
    check = ggetBoolPref("gutil.options.swapbuttons");
    checkOption("swapButtonsCheckbox",check);
    
    var hg = document.getElementById("hostedDomain");
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);
        hg.value=
            pref.getCharPref("gutil.menu.hosted.domain","");
    
}


/*************************************************************************************************/
// Toggles the preference in the config registry (bool value from elementObject)
function toggleGutilElement(elementName, elementObject)
{
    var objectCheckbox = document.getElementById(elementObject);
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
    pref.setBoolPref(elementName, objectCheckbox.checked);
}


/*************************************************************************************************/
// Just sets the 'checked' attribute to 'checked' value
function checkOption(checkBoxId, checked)
{
    var theCheckBox = document.getElementById(checkBoxId);
    if(theCheckBox)    
	theCheckBox.setAttribute("checked",checked);
    else
	alert(checkBoxId);
}

/*************************************************************************************************/
// Loads the extension home page in a new tab
function visitHomePage()
{
    var parentWindow = null;
    var url          = "http://www.gridpulse.com/gutil/";

    // If there is a parent window or a grand parent window
    if(window.opener)
    {
        if(window.opener.opener)
        {
            parentWindow = window.opener.opener;
        }
        else
        {
            parentWindow = window.opener;
        }
    }

    // If a parent window was found open the homepage in a new tab and set that tab as selected
    if(parentWindow)
    {
        var newTab = parentWindow.getBrowser().addTab(url);
        parentWindow.getBrowser().selectedTab = newTab;
        window.close();
    }
}
/**************************************************************************************************/
// Checks config registry for given key. If it doesn't exist it creates it with default value 'true'
function ggetBoolPref(prefName)
{
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);
    
    var ret=true;
    try{
        ret = pref.getBoolPref(prefName);
    }
    catch(e){
        if(prefName=="gutil.options.swapbuttons")
        {
            //this really has to default to false, so that we don't disturb the user's habits and feel
            pref.setBoolPref(prefName, false);
            ret=false;
        }
        else
            pref.setBoolPref(prefName, true);
    }
    
    // alert(prefName + " " + ret);
    return ret;
}
/**************************************************************************************************/
// Notifies the observers 
function optionOk()
{

    var menuHideCheckbox = document.getElementById("menuHideCheckbox");
    var buttonHideCheckbox = document.getElementById("buttonHideCheckbox");
    var hg = document.getElementById("hostedDomain");

    if(menuHideCheckbox.checked)
    {
        Components.classes["@mozilla.org/observer-service;1"]
	        .getService(Components.interfaces.nsIObserverService)
   	            .notifyObservers(null, "gutil:hide-menu", "1");   
    } else {
        Components.classes["@mozilla.org/observer-service;1"]
	        .getService(Components.interfaces.nsIObserverService)
   	            .notifyObservers(null, "gutil:hide-menu", "0");   
    }
    
    if(buttonHideCheckbox.checked)
    {
        Components.classes["@mozilla.org/observer-service;1"]
	        .getService(Components.interfaces.nsIObserverService)
   	            .notifyObservers(null, "gutil:hide-button", "1");   
    } else {
        Components.classes["@mozilla.org/observer-service;1"]
	        .getService(Components.interfaces.nsIObserverService)
   	            .notifyObservers(null, "gutil:hide-button", "0");   
    }
    
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);
    pref.setCharPref("gutil.menu.hosted.domain",hg.value);
    
    Components.classes["@mozilla.org/observer-service;1"]
	    .getService(Components.interfaces.nsIObserverService)
   	        .notifyObservers(null, "gutil:refresh-elements", "0");   
            
    window.close();
}

/* ************ */
// Make All the services visible
function  toggleAllItems()
{
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);
    
    for (i=0;i<elements.length;i++) {
        pref.setBoolPref("gutil.menu." + elements[i], booleanToggleAll)
        checkOption("menuHideCheckbox"+ elements[i], booleanToggleAll);
    }
    
    booleanToggleAll=!booleanToggleAll;
    return true;
}
