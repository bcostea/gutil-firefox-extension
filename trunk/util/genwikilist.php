<?php 
/* Warn : correct groups and Gmail Link */
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
                echo "  # [".$rows[$i][3]." ".$rows[$i][2]."]\n";
            }
       }

    ?>