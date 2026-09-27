#!/bin/bash
set -e

echo "=== 1. Building Production Web App ==="
npm run build

echo "=== 2. Deploying to Firebase Hosting (raavanaatec.web.app) ==="
FIREBASE_DEPLOY_TOKEN="${FIREBASE_TOKEN:-1//0gNJzAsVTd0kiCgYIARAAGBASNwF-L9IrhW5epYV4a6Xttg_gRznKVvyBCXiykRSLfkSy99Q9VLZAW1ulmOX-DOHmFqOsCfdd9JU}"
npx firebase deploy --only hosting --token "$FIREBASE_DEPLOY_TOKEN" --non-interactive

echo "=== 3. Pushing Changes to GitHub (ravanatech-official/RavanaTech) ==="
git add .
git commit -m "deploy: update live site and sync to github [$(date +'%Y-%m-%d %H:%M:%S')]" || echo "No git changes to commit"
git push origin main

echo "=== ALL DONE: Firebase Live & GitHub Synced! ==="
