function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const handler = async (event) => {
  // Page to be fetched
  const page = event.page;

  // Optional items to be fetched
  const item = event.item;

  var nextPage = 0;
  var nextItems = [];

  if (!isNaN(page)) {
    var url = "https://openlibrary.org/search.json?q=the+lord+of+the+rings";
    if (page != 0) {
      url += "&page=" + page;
    }
    if (page < 3) {
      nextPage = page + 1;
    }
    console.log(`Fetching page from URL ${url}`);
    const res = await fetch(url);
    const booksJson = await res.json();
    console.log(`Found ${booksJson.numFound} books`);

    // Randomly select 2 books.
    for (var i = 0; i < 2; i++) {
      var randomItem = booksJson.docs[getRandomInt(booksJson.docs.length)];
      nextItems.push({
        isbn: randomItem.isbn[0],
        title: randomItem.title,
      });
    }
  }

  if (typeof item === "object") {
    const url = `https://openlibrary.org/isbn/${item.isbn}.json`;
    console.log(`Fetching book from URL ${url}`);

    const response = {
      statusCode: 200,
      body: {
        nextItems,
      },
    };
    return response;
  } else {
    const response = {
      statusCode: 200,
      body: {
        nextPage,
        nextItems,
      },
    };
    return response;
  }
};
