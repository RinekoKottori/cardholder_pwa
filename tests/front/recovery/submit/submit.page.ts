import { BasePage } from "../../_shared/base.page";
export enum ESubmitPageLocators {
    TITLE = "[class='password-recovery-submit-header']",
    NEW_PASSWORD_INPUT = "[id='new-password']",
    CONFIRM_PASSWORD_INPUT = "[id='confirm-new-password']",
    CODE_INPUT = "[data-testid='recovery-code']",
    CONFIRM_BUTTON = "[data-testid='submit-button']",
    CANCEL_BUTTON = "[data-testid='cancel-button']",
}

export class SubmitPage extends BasePage {
    readonly path = "/password-recovery/submit";

    override async open() {
        await this.page.goto(this.url);
    }

    get title() {
        return this.page.locator(ESubmitPageLocators.TITLE);
    }

    get newPasswordInput() {
        return this.page.locator(ESubmitPageLocators.NEW_PASSWORD_INPUT);
    }

    get confirmPasswordInput() {
        return this.page.locator(ESubmitPageLocators.CONFIRM_PASSWORD_INPUT);
    }

    get codeInput() {
        return this.page.locator(ESubmitPageLocators.CODE_INPUT);
    }

    get confirmButton() {
        return this.page.locator(ESubmitPageLocators.CONFIRM_BUTTON);
    }

    get cancelButton() {
        return this.page.locator(ESubmitPageLocators.CANCEL_BUTTON);
    }

    async submitNewPassword(password: string, code: string) {
        await this.newPasswordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.codeInput.fill(code);
        await this.confirmButton.click();
    };
}
