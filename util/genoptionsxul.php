<?php 
include('csv2array.php'); 
$str=file_get_contents('gutil_items.csv');
$rows=CSV2Array($str);
 
    for($i=1;$i<count($rows);$i++)
       {
            if($rows[$i][0]=="---")
            {
            }
            else
            {
                echo "<vbox oncommand='toggleGutilElement(\"gutil.menu.".$rows[$i][0]."\",\"menuHideCheckbox".$rows[$i][0]."\");'>\n";
                echo "<checkbox id=\"menuHideCheckbox".$rows[$i][0]."\" label=\"".$rows[$i][1]."\"/>\n";
                echo "</vbox>\n";
            }
       }

    ?>
 