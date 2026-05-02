import { BasePage } from "../_shared/base.page";
export enum ERegistrationLocators {
  TITLE = "[class='register-component-header']",
  USER_NAME_INPUT = "[id='login_username']",
  USER_EMAIL_INPUT = "[id='user_email']",
  USER_PASSWORD_INPUT = "[id='password']",
  USER_CONFIRM_PASSWORD_INPUT = "[id='confirm-password']",
  REGISTER_BUTTON = "[data-testId='regisetry-button']",
  EXIST_ACCOUNT_LINK = "[data-testId='already-have-account-link']",
  ERROR_MASSAGE_DUBLICATE = ".mat-snack-error .mdc-snackbar__label",
}

export class RegistrationPage extends BasePage {
  readonly path = "/register";

  override async open() {
    await this.page.goto(this.url);
  }

  get title() {
    return this.page.locator(ERegistrationLocators.TITLE);
  }

  get emailInput() {
    return this.page.locator(ERegistrationLocators.USER_EMAIL_INPUT);
  }

  get userNameInput() {
    return this.page.locator(ERegistrationLocators.USER_NAME_INPUT);
  }

  get passwordInput() {
    return this.page.locator(ERegistrationLocators.USER_PASSWORD_INPUT);
  }

  get confirmPasswordInput() {
    return this.page.locator(ERegistrationLocators.USER_CONFIRM_PASSWORD_INPUT);
  }

  get registerButton() {
    return this.page.locator(ERegistrationLocators.REGISTER_BUTTON);
  }

  get existAccountLink() {
    return this.page.locator(ERegistrationLocators.EXIST_ACCOUNT_LINK);
  }

  get errorMassageDublicate() {
    return this.page.locator(ERegistrationLocators.ERROR_MASSAGE_DUBLICATE);
  }

  async register(username: string, email: string, password: string,  passwordConfirm: string) {
    await this.emailInput.fill(email);
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(passwordConfirm);
    await this.registerButton.click();
  }
}
