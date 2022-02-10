import {Given, And, When, Then} from "cypress-cucumber-preprocessor/steps";
import PCRPage, {getPatientInfo} from "../../../pages/cloudPCR_page";
import {errorsModal, openedCloudPCRPage, uploadButton, validationMessage} from "../../../pages/cloudPCR_result_page";

const email_field = '[name=usernameOrEmailAddress]'
const password_field = '[name=password]'
const login_filed = '[type=submit]'
const continue_button = '#startDemoDiv .btn-success'
const add_new_PCR_button = '#NewPcrButton'
const address_field = '[geocomplete_id="street-address"]'
const city_field = '#control-sceneAddress_city'
const state_field = '[originalngmodel*="state"]'
const zipCode_field = '[originalngmodel*="zip"]'
const municipalityCode_field = '[originalngmodel*="municipalityCode"]'
const countryCode_field = '[originalngmodel*="countyCode"]'
const close_button = '[id=sceneAddress].in .modal-footer .btn-default'

const info = getPatientInfo()

Given(/^I am in CloudPCR login page$/, () => {
    PCRPage.visitLoginPage()
    PCRPage.turnOnServer()
    cy.intercept('POST','/api/services/app/install/GetIntegrations').as('continue')
});

Given(/^I am logged in CloudPCR page$/, function () {
    PCRPage.fillInField(email_field, 'tolihex968@cctyoo.com')
    PCRPage.fillInField(password_field, 'ilovecloudpcr!')
    PCRPage.clickOnButton(login_filed)
    cy.reload()
    cy.wait(120000)
    cy.reload()
    cy.wait(20000)
    PCRPage.clickOnButton(continue_button);
});

And(/^Assert that CloudPCR page is opened$/, function () {
    openedCloudPCRPage.expect().toShowOpenedPage()
    PCRPage.waitForMyPcrsPage()
});

And(/^I click on "([^"]*)" button$/, function () {
    PCRPage.clickOnButton(add_new_PCR_button)
});

And(/^I fill out all required fields$/, function () {
    PCRPage.fillOutDispositionField()
    PCRPage.addNewCrew()
    PCRPage.fillRequiredSelectFields()
    PCRPage.fillOutTimesFields()
});

And(/^I click the red “ ! “ icon at the top$/, function () {
    PCRPage.clickOnExclamationIcon()
});

And(/^Assert that Errors modal is displayed$/, function () {
    errorsModal.expect().toShowErrorsModal()
});

And(/^I click each error to navigate to the missing field page$/, function () {
    PCRPage.clickOnError()
});

And(/^I fill in last name field from "([^"]*)" tab$/, function (arg) {
    PCRPage.clickOnTab(arg)
    PCRPage.typeLastName(info.patientLastName)
});

And(/^I fill out all required fields on the Errors modal$/, function () {
    PCRPage.fillAllErrorsFromList()
    PCRPage.impressionFields()
    PCRPage.navigateToIncidentTab()
    PCRPage.waitForSync()
});

Then(/^Assert that the red upload icon turns green$/, function () {
    uploadButton.expect().toShowGreenIcon()
});

And(/^I click the green upload icon$/, function () {
    PCRPage.clickOnUploadButton()
    validationMessage.expect().toShowMessage('All changes saved.')
});

And(/^I click the back button$/, function () {
    PCRPage.clickOnBackButton()
});

And(/^I click "([^"]*)"$/, function (arg) {
    PCRPage.clickCheckIntoCloud(arg)
});

And(/^I click on the Incident Number that correlates with the Patient Last name$/, function () {
    PCRPage.waitForCheckIn()
    PCRPage.waitForMyPcrsPage()
    PCRPage.clickOnIncidentNumber(info.patientLastName);
    PCRPage.waitForCheckOut()
});

When(/^I change the “Scene Address” on the Incident tab$/, function () {
    PCRPage.changeSceneAddress()
    PCRPage.fillInField(address_field,info.address)
    PCRPage.fillInField(city_field,info.city)
    PCRPage.fillInField(zipCode_field,info.zip)
    PCRPage.fillInField(municipalityCode_field,info.municipalityCode)
    PCRPage.fillInField(countryCode_field,info.countryCode)
    PCRPage.clickOnButton(close_button)
});

And(/^I navigate to "([^"]*)" tab$/, function (arg) {
    PCRPage.clickOnTab(arg)
    PCRPage.waitForSync()
});
