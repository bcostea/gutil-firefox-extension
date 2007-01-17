<?php 
include('csv2array.php'); 
$str=file_get_contents('gutil_items.csv');
$rows=CSV2Array($str);

echo "<?xml version=\"1.0\"?>\n";
echo "<?xml-stylesheet href=\"chrome://gutil/skin/gutil.css\" type=\"text/css\"?>\n";

?>
<!DOCTYPE overlay SYSTEM "chrome://gutil/locale/overlay.dtd">
<overlay id="gutil-overlay"
         xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul">

    <script type="application/x-javascript" src="chrome://gutil/content/gutil.js"/>

    <menubar id="main-menubar">
        <menu id="gutil-menu" label="&gutil.main.label;" insertbefore="helpMenu">
            <menupopup>
<?
    for($i=1;$i<count($rows);$i++)
       {
            if($rows[$i][0]=="---")
            {
                echo "<menuseparator/>\n";
            }
            else
            {
                echo "<menuitem id=\"gutil_menuitem_".$rows[$i][0]."\" label=\"".$rows[$i][1]."\" oncommand=\"gutilExecute('".$rows[$i][3]."');\" class=\"menuitem-iconic\" image=\"".$rows[$i][4]."\" />\n";
            }
       }

    ?>
    
            </menupopup>
        </menu>
    </menubar>

    <toolbox id="navigator-toolbox">
        <toolbarpalette id="BrowserToolbarPalette">
            <toolbarbutton id="gutil-button" class="toolbarbutton-1 chromeclass-toolbar-additional" type="menu" label="&gutil.main.label;" oncommand="">
                <menupopup>
<?
    for($i=1;$i<count($rows);$i++)
       {
            if($rows[$i][0]=="---")
            {
                echo "<menuseparator/>\n";
            }
            else
            {
                echo "<menuitem id=\"gutil_toolbaritem_".$rows[$i][0]."\" label=\"".$rows[$i][1]."\" oncommand=\"gutilExecute('".$rows[$i][3]."');\" class=\"menuitem-iconic\" image=\"".$rows[$i][4]."\" />\n";
            }
       }

    ?>
                    </menupopup>
            </toolbarbutton>
        </toolbarpalette>
    </toolbox>

</overlay>