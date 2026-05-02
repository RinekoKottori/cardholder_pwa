import { BasePage } from "../_shared/base.page";
export enum ERecoveryPageLocators {
  TITLE = "[class='password-recovery-request-header']",
  USER_EMAIL_INPUT = "[id='user_email']",
  SUBMIT_BUTTON = "[data-testid='password-recovery-request-button']",
  REJECT_BUTTON = "[data-testid='password-recovery-cancel-link']",
  GOT_CODE_BUTTON = "[routerLink='/password-recovery/submit']",
}

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

  get gotCodeButton() {
    return this.page.locator(ERecoveryPageLocators.GOT_CODE_BUTTON);
  }

  get submitButton() {
    return this.page.locator(ERecoveryPageLocators.SUBMIT_BUTTON);
  }

  get rejectButton() {
    return this.page.locator(ERecoveryPageLocators.REJECT_BUTTON);
  }

  async recoverPassword(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  };
}
