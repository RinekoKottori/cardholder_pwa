import { BasePage } from "../_shared/base.page";
export enum EAuthLocators {
  TITLE = "[class^='auth-form'] > [h1]",
  USER_NAME_INPUT = "[id='login_username']",
  USER_PASSWORD_INPUT = "[id='password']",
  SUBMIT_BUTTON = "[type='submit']",
  REGISTER_LINK = "[data-testId='register-link']",
  RECOVERY_PASSWORD_LINK = "[data-testId='password-recovery-link']",
  AUTH_ERROR = "[class='mat-snack-bar-container-live-2']",
}

/* path: /auth */

export class AuthPage extends BasePage {
  readonly path = "/auth";

  override async open() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await this.page.locator(EAuthLocators.USER_NAME_INPUT).fill(username);
    await this.page.locator(EAuthLocators.USER_PASSWORD_INPUT).fill(password);
    await this.page.locator(EAuthLocators.SUBMIT_BUTTON).click();
  }

  get loginButton() {
    return this.page.locator(EAuthLocators.SUBMIT_BUTTON);
  }

  get registerLink() {
    return this.page.locator(EAuthLocators.REGISTER_LINK);
  }

  get passwordRecoveryLink() {
    return this.page.locator(EAuthLocators.RECOVERY_PASSWORD_LINK);
  }

  get title() {
    return this.page.locator(EAuthLocators.TITLE);
  }

  get authError() {
    return this.page.locator(EAuthLocators.AUTH_ERROR);
  }
}
