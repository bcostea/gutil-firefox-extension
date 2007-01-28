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
                if(pref.getCharPref("gutil.menu.gmail.hosted","").length>1) return 'https://mail.google.com/hosted/' + pref.getCharPref("gutil.menu.gmail.hosted","");
                else return 'https://mail.google.com/';
           }else
           {
               if(pref.getCharPref("gutil.menu.gmail.hosted","").length>1) return 'http://mail.google.com/hosted/' + pref.getCharPref("gutil.menu.gmail.hosted","");
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
// special request - groups beta

function runGroups()
{
   var pref = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
     try{
       var bool = pref.getBoolPref("gutil.menu.groupsbeta");
           if(bool)
           {
                return 'http://groups-beta.google.com/';
           }else
           {
                return 'http://groups.google.com';
            }
       }
       catch(e)
       {
               pref.setBoolPref("gutil.menu.groupsbeta", false);
               runGroups();
       }
}
/***********************************************************************************************************/
// hide elements that have been checked off from options dialog
function hideElements()
{
    var pref = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);
        
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
            "code",
            "directory",
            "docs",
            "earth",
            "finance",
            "froogle",
            "gmail",
            "groups",
            "hello",
            "imagelabeler",
            "image",
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
            "reader",
            "scholar",
            "search",
            "sketchup",
            "ssearch",
            "suggest",
            "video",
            "wbt"
            );

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

    if(event.target.id == 'gutil_toolbaritem_groups' || event.target.id == 'gutil_menuitem_groups')
    {
        URL = runGroups();
    }    
    if(event.target.id == 'gutil_toolbaritem_gmail' || event.target.id == 'gutil_menuitem_gmail')
    {
        URL = runGMail();
    }
    
    switch(event.button)
    {
        case 0:
            getBrowser().selectedTab = getBrowser().addTab(URL);
        break;
        case 1:
            getBrowser().addTab(URL);
            // from utilityOverlay.js, line 197 - good to know
            closeMenus(event.target);
        break;
        case 2:
            gBrowser.loadURI(URL);
            closeMenus(event.target);
        break;
    }
}



/***********************************************************************************************************/
//tan ta daaa
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
