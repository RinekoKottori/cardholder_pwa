import { BasePage } from "../_shared/base.page";
export enum ERecoveryPageLocators {
  TITLE = "[class='password-recovery-request-header']",
  USER_EMAIL_INPUT = "[id='user_email']",
  SUBMIT_BUTTON = "[id='submit']",
  REJECT_BUTTON = "[id='reject']",
}

/* path: /register */

export class RecoveryPage extends BasePage {
  readonly path = "/password-recovery/request";

  override async open() {
    await this.page.goto(this.url);
  }

  get title() {
    return this.page.locator(ERecoveryPageLocators.TITLE);
  }

  get emailInput() {
    return this.page.locator(ERecoveryPageLocators.USER_EMAIL_INPUT);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }
}
