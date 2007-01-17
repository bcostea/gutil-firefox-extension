<?php 
include('csv2array.php'); 
$str=file_get_contents('gutil_items.csv');
$rows=CSV2Array($str);

    for($i=1;$i<count($rows);$i++)
       {
        echo "<!ENTITY ".$rows[$i][1]." \"".$rows[$i][2]."\">\n";
       }

?>
    