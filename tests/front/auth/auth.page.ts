import { BasePage } from "../_shared/base.page";
export enum EAuthLocators {
  TITLE = "[class^='auth-form'] > [h1]",
  USER_NAME_INPUT = "[id='login_username']",
  USER_PASSWORD_INPUT = "[id='password']",
  SUBMIT_BUTTON = "[type='submit']",
  OPTINAL_BUTTONS = "[type='button']",
  LOGIN_SUCCESS = "[]",
  AUTH_ERROR = "[class='mat-snack-bar-container-live-2']",
}

/* path: /auth */

export class AuthPage extends BasePage {
  readonly path = "/auth";

  override async open() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await page.locator(EAuthLocators.USER_NAME_INPUT).fill(username);
    await page.locator(EAuthLocators.USER_PASSWORD_INPUT).fill(password);
    await page.locator(EAuthLocators.SUBMIT_BUTTON).click();
  }

  get loginButton() {
    return page.locator(EAuthLocators.SUBMIT_BUTTON);
  }

  get registerLink() {
    return page
      .locator(EAuthLocators.OPTINAL_BUTTONS)
      .getByText("Еще нет аккаунта?");
  }

  get passwordRecoveryLink() {
    return page
      .locator(EAuthLocators.OPTINAL_BUTTONS)
      .getByText("Восстановить пароль");
  }

  get title() {
    return page.locator(EAuthLocators.TITLE);
  }

  get loginSuccess() {
    return page.locator(EAuthLocators.LOGIN_SUCCESS);

  }

  get authError() {
    return page.locator(EAuthLocators.AUTH_ERROR);
  }
}
