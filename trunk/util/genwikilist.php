<?php 
/* Warn : Gmail Link */

/* http://gutil-firefox-extension.googlecode.com/svn/trunk/skin/img/ */
include('csv2array.php'); 
$str=file_get_contents('gutil_items.csv');
$rows=CSV2Array($str);
 
    for($i=1;$i<count($rows);$i++)
       {
            if($rows[$i][0]=="---")
            {
            } elseif ($rows[$i][3] == "runGMail();") {
		echo "  # [https://gmail.com/ ".preg_replace("@chrome://gutil/@","http://gutil-firefox-extension.googlecode.com/svn/trunk/",$rows[$i][4])."] ".
		"[https://gmail.com/ ".$rows[$i][2]."] (and hosted)\n";
           } else
            {
                echo "  # [".$rows[$i][3]." ".preg_replace("@chrome://gutil/@","http://gutil-firefox-extension.googlecode.com/svn/trunk/",$rows[$i][4])."] ".
		"[".$rows[$i][3]." ".$rows[$i][2]."]\n";
            }
       }

    ?>