/**
 * Helper functions used by the custom server.
 * You can use only require() and node.js 7
 * supported feature here. This is not transpiled.
 */

const fetch = require('isomorphic-fetch')

const getAvailableLanguages = (context = 'global') => {
  // Construct the url based on context & slug.
  let url = `https://dm-collection.bondsrv.com/wp-json/wptb/v1/languages/${context}`

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return {languages: json, context: context}
    })
    .catch(error => console.error('Failed to fetch supported languages', error))
}

module.exports = {
  getAvailableLanguages: getAvailableLanguages
}
