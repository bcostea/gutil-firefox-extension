#!/bin/sh
rm gutil.xpi
mkdir -p build/chrome
zip -0 -r build/chrome/gutil.jar locale content skin

cp install.rdf build/install.rdf
cp chrome.manifest build/chrome.manifest

cd build
zip -r ../gutil.xpi *
cd ..
rm -rf build/

