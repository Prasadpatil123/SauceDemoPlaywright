import {test, expect} from '@playwright/test';
import logger from '../utils/logger.js';

class BasePage {
    constructor(page) {
        this.page = page;
        console.log('BasePage constructor called');
    }

    async navigateUrl(url){
        await this.page.goto(url);
    }

    async clickElement(locator) {
        await locator.click();
    }

    async typeText(locator, text) {
        await locator.fill(text);
    }

    async getText(locator) {
        return await locator.textContent();
    }

    async waitforloadstate() {
        await this.locator.textContent();
    }

    async waitForElement(locator) {
        await locator.waitFor({ state: 'visible' });
    }

}