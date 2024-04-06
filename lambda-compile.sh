curpath=$(pwd)
echo "pulling latest changes";
git pull

echo "current path: $curpath"

echo "removing /tmp/dist"
rm /tmp/dist -r

echo "making /tmp/dist"
mkdir -p /tmp/dist

echo "removing dist lambda.zip"
rm -rf dist lambda.zip

echo "compiling typescript"
npx tsc

echo "copying files to /tmp/dist"
cp -r ./dist/* /tmp/dist/

echo "copying package.json to /tmp/dist"
cp package.json /tmp/dist/
cp package-lock.json /tmp/dist/


echo "moving to /tmp/dist"
cd /tmp/dist/

echo "installing production dependencies"
npm install --production

echo "Renaming app.js to index.js"
mv app.js index.js

echo "zipping files"
zip -r ~/lambda.zip .
