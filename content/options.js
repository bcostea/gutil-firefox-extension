//cheaper this way ;)
var elements=new Array(
            "adsense",
            "adwords",
            "alerts",
            "analytics",
            "appd",
            "base",
            "blogsearch",
            "blogger",
            "bookmarks",
            "books",
            "calendar",
            "checkout",
            "code",
            "coop",
            "directory",
            "docs",
            "earth",
            "experimental",
            "finance",
            "gmail",
            "groups",
            "hello",
            "history",
            "igoogle",
            "imagelabeler",
            "image",
            "labs",
            "translate",
            "local",
            "maps",
            "mars",
            "moon",
            "movies",
            "mtrends",
            "news",
            "notebook",
            "orkut",
            "pack",
            "pagecreator",
            "patents",
            "picasaweb",
            "productsearch",
            "reader",
            "scholar",
            "search",
            "sets",
            "sketchup",
            "ssearch",
            "suggest",
            "trends",
            "video",
            "wbt",
            "acc"
            );

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
    // alert("trying to mark " + checkBoxId);
    var theCheckBox = document.getElementById(checkBoxId);
    theCheckBox.setAttribute("checked",checked);

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
    
    // alert(hg.value);
    
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);
        pref.setCharPref("gutil.menu.hosted.domain",hg.value);
    
    Components.classes["@mozilla.org/observer-service;1"]
	    .getService(Components.interfaces.nsIObserverService)
   	        .notifyObservers(null, "gutil:refresh-elements", "0");   
            
    window.close();
}
