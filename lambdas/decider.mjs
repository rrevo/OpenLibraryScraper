export const handler = async (event) => {
  // TODO use for downloading items/books
  var eventItems = event;

  // Map state sends an array to the Decider. Currently the 0th element
  // is the page for continuation.
  if (Array.isArray(event)) {
    event = event[0];
  }

  var page = -1;
  var nextAction = "UNKNOWN";

  // Terminal condition for pages.
  if (event.nextPage == 0) {
    nextAction = "COMPLETE";
  } else if (!isNaN(event.nextPage)) {
    nextAction = "FETCH";
    page = event.nextPage;
  }

  const response = {
    statusCode: 200,
    body: {
      nextAction,
      fetchItems: [{ page: page }],
    },
  };
  return response;
};
