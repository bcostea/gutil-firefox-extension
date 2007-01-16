rm gutil.xpi
mkdir build
mkdir build\chrome
util\zip -0 -r build\chrome\gutil.jar locale content skin

util\cp install.rdf build\install.rdf
util\cp chrome.manifest build\chrome.manifest

cd build
..\util\zip -r ..\gutil.xpi *
cd ..
util\rm -rf build\