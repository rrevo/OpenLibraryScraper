export const handler = async (event) => {
  // Page to be fetched
  var page = event.page;

  // TODO implement
  const items = event.items || "???";

  var nextPage = 0;
  var nextItems = [];

  if (!isNaN(page)) {
    url += "&page=" + page;
    if (page < 3) {
      nextPage = page + 1;
    }
    var url = "https://openlibrary.org/search.json?q=the+lord+of+the+rings";
    console.log(`Fetching from URL ${url}`);
    const res = await fetch(url);
    const booksJson = await res.json();
    console.log(`Found ${booksJson.numFound} books`);
  }

  const response = {
    statusCode: 200,
    body: {
      nextPage,
      nextItems,
    },
  };
  return response;
};
