// cheaper this way
// FIXME: change this to a nice configurable object in next version (3.0)
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
            "hello",
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
            "mtrends",
            "musicsearch",
            "news",
            "notebook",
            "orkut",
            "pack",
            "pagecreator",
            "patents",
            "picasaweb",
            "productsearch",
            "reader",
            "relatedlinks",
            "ridefinder",
            "scholar",
            "search",
            "sets",
            "sketchup",
            "ssearch",
            "suggest",
            "transit",
            "translate",
            "trends",
            "video",
            "warehouse",
            "wbt",
            "acc",
            // dirty lazy hack for chevron
            "chevron"
            );
            
//global marker to check for chevron action
var watchOutForChevronAction=false;


/************************************************************************************************************************/
// Callable from below 
var gutilMain = {
 buttonSetup : function(){
 
    	var toolbox = document.getElementById("navigator-toolbox");
    	var toolboxDocument = toolbox.ownerDocument;
        
        //check for the button
    	var hasButton = false;
    	for (var i = 0; i < toolbox.childNodes.length; ++i) {
    	    var toolbar = toolbox.childNodes[i];
    	    if (toolbar.localName == "toolbar" && toolbar.getAttribute("customizable")=="true") {
    			
    		if(toolbar.currentSet.indexOf("gutil-button")>-1)
    			hasButton = true;	
    	    }
    	}
    		
        // ups, the button is not added - add the button ( dont worry, if it's hidden in the prefs, we wont show it!!)
    	if(!hasButton){
    		
    	  for (var i = 0; i < toolbox.childNodes.length; ++i) {
    	    toolbar = toolbox.childNodes[i];
    	    if (toolbar.localName == "toolbar" &&  toolbar.getAttribute("customizable")=="true" && toolbar.id=="nav-bar") {
    					
    	   	var newSet = "";
    	   	var child = toolbar.firstChild;
    	   	while(child){
    		   	   
   	   	   
    	   	   if(!hasButton && child.id=="urlbar-container"){
    		      newSet += "gutil-button,";
    	   	      hasButton = true;
    		   }
    
    		   newSet += child.id+",";
    		   child = child.nextSibling;
    		}
    		
    		newSet = newSet.substring(0, newSet.length-1);
    		toolbar.currentSet = newSet;
    		
    		toolbar.setAttribute("currentset", newSet);
    		toolboxDocument.persist(toolbar.id, "currentset");
    		BrowserToolboxCustomizeDone(true)
    		break; 
    	    }
    	  }
    	}
        
     //has the user hidden our menu?
     if(gutilMain.isMenuHidden()){
          var menu = document.getElementById("gutil-menu");
          menu.setAttribute("hidden", true);
     }
     
    //has the user hidden our button?
     if(gutilMain.isButtonHidden()){
          var menu = document.getElementById("gutil-button");
          menu.setAttribute("hidden", true);
     }
        
     //add observers
     var os = Components.classes["@mozilla.org/observer-service;1"]
                                     .getService(Components.interfaces.nsIObserverService);
     os.addObserver(gutilObserver, "gutil:hide-menu", false);
     os.addObserver(gutilObserver, "gutil:hide-button", false);
     os.addObserver(gutilObserver, "gutil:refresh-elements", false);


    hideElements();
     },

isMenuHidden : function(){
   
     var pref = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
     try{
       var bool = pref.getBoolPref("gutil.menu.hidden");
       if(bool)
	 return true;
     }
     catch(e){
        pref.setBoolPref("gutil.menu.hidden", false);
     }
   
   return false;
   },

isButtonHidden : function(){
   
     var pref = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
     try{
       var bool = pref.getBoolPref("gutil.button.hidden");
       if(bool)
	 return true;
     }
     catch(e){
        pref.setBoolPref("gutil.button.hidden", false);
     }
   
   return false;
   }

}
/***************************************************************************************************/
// This are the Observers fired from the option dialog
var gutilObserver = {
  observe : function(aSubject, aTopic, aData)
  {
  
     switch(aTopic)
     {
        case "gutil:hide-menu":
            var menu = document.getElementById("gutil-menu");
            if(menu)
            {
                if(aData=="1")
                {
                    menu.setAttribute("hidden", true);
                }
                else
                {
                    menu.removeAttribute("hidden");
                }
            }   
        break;
        
        case "gutil:hide-button":
            var button = document.getElementById("gutil-button");
            if(button)
            {
                if(aData=="1")
                {
   	                button.setAttribute("hidden", true);
   	            }
   	            else
                {
   	                button.removeAttribute("hidden");
   	            }
   	        }   
        break;
        
        case "gutil:refresh-elements":
            hideElements();
        break;
     }     
  }
}

/***********************************************************************************************************/
// special request - gmail on https + hosted
function runGMail()
{
   var pref = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
     try{
       var bool = pref.getBoolPref("gutil.menu.gmailhttps");
     
         if(bool)
           {
                if(pref.getCharPref("gutil.menu.hosted.domain","").length>1) return 'https://mail.google.com/hosted/' + pref.getCharPref("gutil.menu.hosted.domain","");
                else return 'https://mail.google.com/';
           }else
           {
               if(pref.getCharPref("gutil.menu.hosted.domain","").length>1) return 'http://mail.google.com/hosted/' + pref.getCharPref("gutil.menu.hosted.domain","");
                else return 'http://mail.google.com/';
          }
    
        }
       catch(e)
       {
               pref.setBoolPref("gutil.menu.gmailhttps", false);
                return 'http://mail.google.com/';
        }
}
/***********************************************************************************************************/
// special request - hosted & partnerpages
function runiGoogle()
{
   var pref = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
        if(pref.getCharPref("gutil.menu.hosted.domain","").length>1) {
		return 'http://partnerpage.google.com/' + pref.getCharPref("gutil.menu.hosted.domain","");
        } else {
		return 'http://www.google.com/ig';
        }
 
}
/***********************************************************************************************************/
// special request - hosted & calnedar
function runCalendar()
{
   var pref = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
        if(pref.getCharPref("gutil.menu.hosted.domain","").length>1) {
		return 'http://www.google.com/calendar/a/' + pref.getCharPref("gutil.menu.hosted.domain","");
        } else {
		return 'http://www.google.com/calendar/';
        }
 
}

/***********************************************************************************************************/
// special request - apps for your domain, with domain
// since 2.3.1
function runApps()
{
   var pref = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
        if(pref.getCharPref("gutil.menu.hosted.domain","").length>1) {
		return 'http://www.google.com/a/' + pref.getCharPref("gutil.menu.hosted.domain","");
        } else {
		return 'http://www.google.com/a/';
        }
 
}

/***********************************************************************************************************/
// hide elements that have been checked off from options dialog
function hideElements()
{
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);

   for (i=0;i<elements.length;i++)   
   {
        var visible=true;
        try{
            visible = pref.getBoolPref("gutil.menu."+elements[i]);
        }
        catch(e){
            pref.setBoolPref("gutil.menu."+elements[i], true);
        }
        
        //alert("set " + elements[i] + " " + visible);
        if(!visible)
        {
            document.getElementById("gutil_menuitem_" + elements[i]).setAttribute("hidden",true);
            document.getElementById("gutil_toolbaritem_" + elements[i]).setAttribute("hidden",true);

        }
        else
        {
            document.getElementById("gutil_menuitem_" + elements[i]).removeAttribute("hidden");
            document.getElementById("gutil_toolbaritem_" + elements[i]).removeAttribute("hidden");
        }
        
    }

}


/***********************************************************************************************************/
//launch item
//introduced in 2.1

function gutilExecute(URL, event)
{
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);
    var swapped=false;
    
    try{
        swapped = pref.getBoolPref("gutil.options.swapbuttons");
    }
    catch(e){
        pref.setBoolPref("gutil.options.swapbuttons", false);
    }
    

    if(event.target.id == 'gutil_toolbaritem_gmail' || event.target.id == 'gutil_menuitem_gmail')
    {
        URL = runGMail();
    } else if (event.target.id == 'gutil_toolbaritem_igoogle' || event.target.id == 'gutil_menuitem_igoogle')
    {
        URL = runiGoogle();
    } else if (event.target.id == 'gutil_toolbaritem_calendar' || event.target.id == 'gutil_menuitem_calendar')
    {
        URL = runCalendar();
    }else if (event.target.id == 'gutil_toolbaritem_appd' || event.target.id == 'gutil_menuitem_appd')
    {
        URL = runApps();
    }

    switch(event.button)
    {
        case 0:
            if(!swapped)
                getBrowser().selectedTab = getBrowser().addTab(URL);
            else        
                gBrowser.loadURI(URL);
        break;
        case 1:
            getBrowser().addTab(URL);
            // from utilityOverlay.js, line 197 - good to know
            closeMenus(event.target);
        break;
        case 2:
            if(swapped)
                getBrowser().selectedTab = getBrowser().addTab(URL);
            else        
                gBrowser.loadURI(URL);
            
            closeMenus(event.target);
        break;
    }
    
    //this means the chevron functionality has been used
    if(watchOutForChevronAction)
    {
        watchOutForChevronAction=false;
        //restoring elements
        hideElements();
    }
}

/***********************************************************************************************************/
//chevron action
//introduced in 2.1.9
function executeChevron()
{
  for (i=0;i<elements.length;i++)   
   {
            document.getElementById("gutil_menuitem_" + elements[i]).removeAttribute("hidden");
            document.getElementById("gutil_toolbaritem_" + elements[i]).removeAttribute("hidden");
    }
    watchOutForChevronAction=true;
}


/***********************************************************************************************************/
//tan ta daaa
// TODO: remember to cleanly remove this on next version
// FIXME: remove this in next version (3.0)
function newInstallRunOnce()
{
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);
    var isthisthefirstrun;

        try{
            isthisthefirstrun = pref.getBoolPref("gutil.main.firstrun");
        }
        catch(e){
            pref.setBoolPref("gutil.main.firstrun", true);
        }
        
    isthisthefirstrun = pref.getBoolPref("gutil.main.firstrun");
    //alert(isthisthefirstrun.toString());
    if(isthisthefirstrun.toString()!="false")
    {
        //alert("in if" + isthisthefirstrun.toString());
        getBrowser().selectedTab = getBrowser().addTab("http://www.gridpulse.com/gutil/update.html");
    }
     
     pref.setBoolPref("gutil.main.firstrun", false);
}

/***********************************************************************************************************/
// start it up
window.addEventListener("load", gutilMain.buttonSetup, false);
