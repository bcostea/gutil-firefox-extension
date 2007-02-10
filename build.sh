#!/bin/sh
rm gutil.xpi
mkdir -p build/chrome
zip -0 -r build/chrome/gutil.jar `find locale/ -name "*.dtd"` `find content/ -name "*.js"` `find content/ -name "*.xul"` `find skin/ -name "*.png"` `find skin -name "*.css"`

cp install.rdf build/install.rdf
cp chrome.manifest build/chrome.manifest

cd build
zip -r ../gutil.xpi *
cd ..
rm -rf build/

