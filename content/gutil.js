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
// special request - gmail on https
function runGMail()
{
   var pref = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
     try{
       var bool = pref.getBoolPref("gutil.menu.gmailhttps");
           if(bool)
           {
                getBrowser().selectedTab = getBrowser().addTab('https://mail.google.com');
           }else
           {
                getBrowser().selectedTab = getBrowser().addTab('http://mail.google.com');    
          }
       }
       catch(e)
       {
               pref.setBoolPref("gutil.menu.gmailhttps", false);
               runGMail();
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
                getBrowser().selectedTab = getBrowser().addTab('http://groups-beta.google.com/');
           }else
           {
                getBrowser().selectedTab = getBrowser().addTab('http://groups.google.com');
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
        
    var elements=new Array("gmail",
        "docs",
        "blogger",
        "calendar",
        "bookmarks",
        "scholar",
        "mtrends",
        "video",
        "maps",
        "local",
        "news",
        "groups",
        "directory",
        "translate",
        "analytics",
        "adsense",
        "base",
        "wbt",
        "notebook",
        "acc",
        "search", 
        "image",
        "froogle",
        "reader",
        "picasaweb",
        "pagecreator",
        "orkut",
        "blogsearch");

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
            document.getElementById("menu_" + elements[i]).setAttribute("hidden",true);
            document.getElementById(elements[i]).setAttribute("hidden",true);

        }
        else
        {
            document.getElementById("menu_" + elements[i]).removeAttribute("hidden");
            document.getElementById(elements[i]).removeAttribute("hidden");
        }
        
    }

}


/***********************************************************************************************************/
// start it up
window.addEventListener("load", gutilMain.buttonSetup, false);
