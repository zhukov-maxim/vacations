/* global gapi */

/**
 * The file provides a wrapper on top of Google API.
 */

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
const CLIENT_ID = '480033313053-kav6kl50oo40pkqevjfivt4bsr002q6v.apps.googleusercontent.com';

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

let apiInitialized = false;

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 */
function handleAuth() {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false}
    //,handleAuth
  );
  return false;
}

/**
 * Attempts to refresh auth token in background. If Google Client is not loaded
 * yet, this function prepares window.initializeGoogleApi variable to be called
 * by index.html
 */
export function initializeGoogleApi() {
  if (!gapi.auth) {
    // This means, google client was not yet loaded. We ask index.html
    // to call us when google client script is loaded.
    window.initializeGoogleApi = initializeGoogleApi;

    // And wait until client is loaded...
    return;
  }

  // On the other hand, if we've already initialized the API, we just bail out
  if (apiInitialized) {
    return;
  }

  // First time here - make sure no-one will ever call us again.
  apiInitialized = true;
}

const parseSpreadSheet = rawData => {
  return rawData.map(function(item) {
    return {
      name: item[0],
      dayRanges: item.slice(1)
    };
  });
}

export function getData() {
  return new Promise(
    function(resolve, reject) {
      window.setTimeout(
        () => {
          handleAuth();

          if (apiInitialized) {
            var discoveryUrl =
                'https://sheets.googleapis.com/$discovery/rest?version=v4';

            gapi.client.load(discoveryUrl).then(() => {
              gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1lxr583xJe5sqhYMDy2AtR7sw74_vnGblgi5RQ82EL9o',
                range: 'Sheet1',
              }).then(response => {
                const parsedData = parseSpreadSheet(response.result.values);
                resolve(parsedData);
              },
              error => {
                console.log(error);
              }
              );
            });
          }
          else {
            console.log('apiInitialized is not initialized');
          }
        }, 1000);
    }
  );
}
