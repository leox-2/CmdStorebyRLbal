const axios = require('axios');

const wikiApiUrl = 'https://en.wikipedia.org/w/api.php';

module.exports = {
  config: {
    name: 'wiki',
    version: '2.0',
    author: 'Rahman Leon',
    role: 0,
    shortDescription: {
      en: 'Search Wikipedia for information.',
      bn: 'তথ্যের জন্য উইকিপিডিয়া খোঁজুন।',
    },
    longDescription: {
      en: 'Search Wikipedia for information on various topics.',
      bn: 'বিভিন্ন বিষয়ে তথ্যের জন্য উইকিপিডিয়া খোঁজুন।',
    },
    category: 'STUDY',
    guide: {
      en: 'Use {p}wiki <search_query> to search Wikipedia for information.',
      bn: 'তথ্য খুঁজতে {p}wiki <অনুসন্ধান_কুয়েরি> ব্যবহার করুন।',
    },
  },

  onStart: async function ({ api, event, args, getLang }) {
    const searchQuery = args.join(' ');

    if (!searchQuery) {
      return api.sendMessage(getLang('invalidQuery', 'en'), event.threadID);
    }

    try {
      const result = await searchWikipedia(searchQuery, event.lang);
      if (result) {
        const uniqueText = "Here are the search results from Wikipedia:";
        const emoji = "🔍";
        api.sendMessage(`${uniqueText}\n\n${result}\n\n${emoji}`, event.threadID);
      } else {
        api.sendMessage(getLang('noResults', 'en'), event.threadID);
      }
    } catch (error) {
      api.sendMessage(getLang('searchError', 'en'), event.threadID);
      console.error(error);
    }
  },
};

async function searchWikipedia(query, lang) {
  try {
    const searchLang = lang === 'bn' ? 'bn' : 'en'; // Use Bangla if 'bn', else use English.
    const response = await axios.get(wikiApiUrl, {
      params: {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        exintro: '',
        explaintext: '',
        titles: query,
        plang: searchLang, // Include the language parameter.
      },
    });

    const pages = response.data.query.pages;
    const firstPageId = Object.keys(pages)[0];
    const page = pages[firstPageId];
    const extract = page.extract;

    if (extract) {
      return extract;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}