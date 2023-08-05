import { test as base } from "@playwright/test";

import { BoardPage } from "./../pages/board";
import { GetStartedPage } from "./../pages/get-started";
import { MyBoardsPage } from "./../pages/my-boards";

type TrelloFixtures = {
  boardPage: BoardPage;
  getStartedPage: GetStartedPage;
  myBoardsPage: MyBoardsPage;
};

export const test = base.extend<TrelloFixtures>({
  boardPage: async ({ page }, use) => {
    await use(new BoardPage(page));
  },
  getStartedPage: async ({ page }, use) => {
    await use(new GetStartedPage(page));
  },
  myBoardsPage: async ({ page, browserName }, use) => {
    await use(new MyBoardsPage(page));
  },
});

export { expect } from "@playwright/test";
