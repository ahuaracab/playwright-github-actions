//import { test, expect } from "@playwright/test";

// import { BoardPage } from "./pages/board";
// import { GetStartedPage } from "./pages/get-started";
// import { MyBoardsPage } from "./pages/my-boards";

import { test, expect } from "./fixtures/trello-test";

// test.beforeAll(async ({ request }) => {
//   // Clear the database
//   await request.post("http://localhost:3000/api/reset");
// });

test.describe("Trello-like board", () => {
  let boardName: string;
  const listName = "TODO";

  test.beforeEach(async ({ request, myBoardsPage }) => {
    const randomNumber = Math.trunc(Math.random() * 1000000);
    boardName = "Chores " + `${randomNumber}`;

    await request.post("http://localhost:3000/api/boards", {
      data: { name: boardName },
    });
    //await request.post("http://localhost:3000/api/reset");
    await myBoardsPage.load();
    await myBoardsPage.openBoard(boardName);
  });

  test("should display the new board", async ({ boardPage }) => {
    await boardPage.expectNewBoardLoaded(boardName);
  });

  test("should create the first list in a board", async ({ boardPage }) => {
    await boardPage.addList(listName);
    await expect(boardPage.listName).toHaveValue(listName);
  });

  test("should create a list with multiple cards", async ({ boardPage }) => {
    await boardPage.addList(listName);
    await boardPage.addCardToList(0, "Buy groceries");
    await boardPage.addCardToList(0, "Mow the lawn");
    await boardPage.addCardToList(0, "Walk the dog");
    await expect(boardPage.cardTexts).toHaveText([
      "Buy groceries",
      "Mow the lawn",
      "Walk the dog",
    ]);
  });

  test("should navigate home from a board", async ({
    boardPage,
    myBoardsPage,
  }) => {
    await boardPage.goHome();
    await myBoardsPage.expectLoaded(boardName);
  });
});
// test("Create a new board with a list and cards", async ({ page }) => {
// test("Create a new board with a list and cards", async ({
//   getStartedPage,
//   boardPage,
//   myBoardsPage,
// }) => {
//   // Load the app
//   await getStartedPage.load();

//   // Create a new board
//   await getStartedPage.createFirstBoard("Chores");
//   await boardPage.expectNewBoardLoaded("Chores");

//   // Create a new list
//   await boardPage.addList("TODO");
//   await expect(boardPage.listName).toHaveValue("TODO");

//   // Add cards to the list
//   await boardPage.addCardToList(0, "Buy groceries");
//   await boardPage.addCardToList(0, "Mow the lawn");
//   await boardPage.addCardToList(0, "Walk the dog");
//   await expect(boardPage.cardTexts).toHaveText([
//     "Buy groceries",
//     "Mow the lawn",
//     "Walk the dog",
//   ]);

//   // Navigate to the home page
//   await boardPage.goHome();
//   await myBoardsPage.expectLoaded(["Chores"]);
// });
