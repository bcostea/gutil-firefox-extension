php -n -q genoptionsxul.php > options.xul.part
php -n -q genoverlayxul.php >../content/overlay.xul
# php -n -q genlocale.php > locale.part
php -n -q checkoverlays.php