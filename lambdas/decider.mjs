export const handler = async (event) => {
  var eventItems = [];

  // Map state sends an array to the Decider. Currently the 0th element
  // is the page for continuation.
  if (Array.isArray(event)) {
    eventItems = event.slice(1).map((item) => {
      eventItems.push(item.isbn);
    });
    event = event[0];
  } else if (event.nextItems) {
    event.nextItems.forEach((item) => {
      eventItems.push(item);
    });
  }

  var page = -1;
  var nextAction = "UNKNOWN";

  var fetchItems = [];

  // Terminal condition for pages.
  if (event.nextPage == 0) {
    nextAction = "COMPLETE";
  } else if (!isNaN(event.nextPage)) {
    nextAction = "FETCH";
    page = event.nextPage;
    fetchItems.push({ page: page });
    eventItems.forEach((item) => {
      fetchItems.push({ item: item });
    });
  }

  const response = {
    statusCode: 200,
    body: {
      nextAction,
      fetchItems,
    },
  };
  return response;
};
