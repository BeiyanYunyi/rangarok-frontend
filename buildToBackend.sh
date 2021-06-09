#!/bin/bash
yarn build
rm -rf ../backend/dist
mv -f ./dist ../backend