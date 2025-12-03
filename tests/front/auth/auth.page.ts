import { BasePage } from "../_shared/base.page";
export enum EAuthLocators {
  USER_NAME_INPUT = "[ng-reflect-id='login_username']",
  USER_PASSWORD_INPUT = "[ng-reflect-id='password']",
  SUBMIT_BUTTON = "[type='submit']",
  OPTINAL_BUTTONS = "[type='button']",
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

  get noAccountLink() {
    return page
      .locator(EAuthLocators.OPTINAL_BUTTONS)
      .getByText("Еще нет аккаунта?");
  }

  get passwordRecoveryLink() {
    return page
      .locator(EAuthLocators.OPTINAL_BUTTONS)
      .getByText("Восстановить пароль");
  }
}
