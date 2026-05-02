import { BasePage } from "../_shared/base.page";
export enum ECardsLocators {
  TITLE = "",
}

export class CardsPage extends BasePage {
  readonly path = "/cards";

  override async open() {
    await this.page.goto(this.url);
  }
}
