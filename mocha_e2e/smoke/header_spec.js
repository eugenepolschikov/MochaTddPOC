const expect = require('chai').expect;
const world = require('../../po/world');
const EC = protractor.ExpectedConditions;
const CUSTOM_TIMEOUT = 15 * 1000;
const parser = require('../../step_definitions/utils/poParser');
const utils = require('../../step_definitions/utils/utils');
const MemoryObject = require('../../step_definitions/memory/memory');
const outline = require("../../outline/outline");
const HeaderElements = require("../../test_date/header.json");
const driver = require("selenium-webdriver");

describe("HEADER", async () => {

    beforeEach(async () => {
        await browser.manage().deleteAllCookies();
        await browser.get(browser.baseUrl);
    });

    outline(HeaderElements, (elements) => {
        it(`${elements.Element} should be visible in the Header`, async () => {
            await browser.wait(utils.ECHelper(parser.parser(`HomePage > Header > ${elements.Element}`), "visible"), CUSTOM_TIMEOUT, `${elements.Element} is not visible`);
        });

        if (elements.DropdownItems) {
            it(`verify that user can see dropdown with ${elements.DropdownItems} items when he hover his mouse over ${elements.Element} element in the Header`, async () => {
                await driver.actions({ bridge: true }).move({origin:parser.parser(`HomePage > Header > ${elements.Element}`)}).perform();
                await browser.wait(utils.ECHelper(parser.parser(`HomePage > Header > ${elements.Dropdown}`), "present"), CUSTOM_TIMEOUT, `${elements.Element} is not present`);

                const elements = await parser.parser(`HomePage > Header > ${elements.Dropdown}`).asElementFinders_();
                const arraySize = elements.length;

                return expect(arraySize, `${elements.Dropdown} size (${arraySize}) is different then given count (${elements.DropdownItems})`).to.be.equal(parseInt(`${elements.DropdownItems}`));
            });
        }
    });

    describe("LANGUAGE BOX", () => {

        it("verify that default language in the Language Block is English", async () => {
            await utils.isElementsTextIsEqualTo("HomePage > Header > SelectedLanguage", "English");
        });

        it("verify that there are 3 porposed language when I click on Language Block", async () => {
            await browser.wait(utils.ECHelper(parser.parser(`HomePage > Header > SelectedLanguage`), "clickable"), CUSTOM_TIMEOUT, `SelectedLanguage element is not clickable`);
            await parser.parser("HomePage > Header > SelectedLanguage").click();

            const elements = await parser.parser("HomePage > Header > Languages").asElementFinders_();
            const arraySize = elements.length;

            return expect(arraySize, `"HomePage > Header > Languages" size (${arraySize}) is different then given count (3)`).to.be.equal(3);
        });
    });
});
