#!/usr/bin/php -q
<?php
/**
This file class translation and check missing translation too :)
*/

if($manifest = fopen("../chrome.manifest","r")) {
	while (!feof($manifest)) {
		$line = stream_get_line($manifest, 1000000, "\n");
		if(preg_match('@locale\s+gutil\s+([^-]+\-[^\s]+)\s+jar:chrome/gutil.jar!((/[^/]+)+)$@',$line,$matches)) {
			$files[$matches[1]] = rtrim($matches[2]);
		}
	}
} else {
	exit();
}

if($reference = fopen("../locale/en-US/overlay.dtd","r")) {
	while (!feof($reference)) {
		$line = stream_get_line($reference, 1000000, "\n");
		if(preg_match('<!ENTITY gutil\.([^.]+)\.([^\s]+) "([^"]+)">',$line,$matches)) {
			$original[$matches[1]][$matches[2]] = $matches[3];
		}
	}
	ksort($original);
	foreach($original as $key => $value) {
		ksort($original[$key]);
	}
} else {
	exit();
}

foreach($files as $locale => $path) {
	$translated = Array();
	$overlay = null;
	print "open ..".$path."overlay.dtd\n";
	if($dtd = fopen("..".$path."overlay.dtd","r")) {
		while (!feof($dtd)) {
			$line = stream_get_line($dtd, 1000000, "\n");
			if(preg_match('<!ENTITY gutil\.([^.]+)\.([^\s]+) "([^"]+)">',$line,$matches)) {
				$translated[$matches[1]][$matches[2]] = $matches[3];
			}
		}
	} else {
		exit();
	}
	foreach ($original as $key => $value) {
		foreach($value as $id => $translation) {
			if(!isset($translated[$key][$id]))
				print "$locale translation for gutil.$key.$id missing. English : ".$translation."\n";
			else
				$overlay .= "<!ENTITY gutil.$key.$id \"".$translated[$key][$id]."\">\n";
		}
		$overlay .= "\n\n";
	}
	
	file_put_contents("..".$path."overlay.dtd",$overlay);
}
?>