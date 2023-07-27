const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const {initializeApp} = require("firebase-admin/app");
initializeApp({
  credential: admin.credential.applicationDefault(),
});
const {
  addReleases,
  refreshRelease,
  getReleases,
  modifyRelease,
  deleteRelease,
} = require("./handlers/handlers.js");
const {
  githubWebhook,
} = require("./github/webhooks.js");
const {defineSecret} = require("firebase-functions/params");
const GITHUB_TOKEN = defineSecret("GITHUB_TOKEN");
const GITHUB_WEBHOOK_SECRET = defineSecret("GITHUB_WEBHOOK_SECRET");

exports.addReleases = functions.https.onRequest(
    {secrets: [GITHUB_TOKEN]},
    addReleases);
exports.getReleases = functions.https.onRequest(getReleases);
exports.modifyRelease = functions.https.onRequest(
    {secrets: [GITHUB_TOKEN]},
    modifyRelease);
exports.refreshRelease = functions.https.onRequest(
    {secrets: [GITHUB_TOKEN]},
    refreshRelease);
exports.deleteRelease = functions.https.onRequest(deleteRelease);
exports.githubWebhook = functions.https.onRequest(
    {secrets: [GITHUB_TOKEN, GITHUB_WEBHOOK_SECRET]},
    githubWebhook);
