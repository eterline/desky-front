#!/bin/sh

# Script for clonning to backend dir

rm -rf ../desky-backend/web
cp -R web ../desky-backend/

echo "web directory clonned into 'desky-backend' directory"