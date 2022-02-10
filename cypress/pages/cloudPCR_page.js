cy.faker = require('faker');

export const getPatientInfo = () => {
    return {
        patientLastName: cy.faker.name.lastName(),
        address: cy.faker.address.streetAddress(),
        city: cy.faker.address.city(),
        zip: cy.faker.address.zipCode(),
        municipalityCode: cy.faker.random.number(),
        countryCode: cy.faker.random.number(),
    };
};

class PCRPage {
    static visitLoginPage() {
        cy.visit('/Account/Login');
    }

    static turnOnServer() {
        cy.server()
        cy.route('POST', '/api/services/app/pcrV2/SavePCR?deviceId*').as("syncWait")
        cy.route('POST', '/api/services/app/pcr/CheckOut').as("checkOut")
        cy.route('POST', '/api/services/app/pcr/CheckIn').as("checkIn")
        cy.route('POST', '/api/services/app/qaDataV2/GetMyPcrs').as("MyPcrsPage")
    }

    static fillInField(arg1, arg2) {
        cy.get(arg1).clear().type(arg2);
    }

    static clickOnButton(arg) {
        cy.get(arg).click();
    }

    static fillOutDispositionField() {
        cy.get('[name*="eDisposition"]').then(($el, index, $list) => {
            cy.wrap($el).find('option').eq(1).then(($opt) => {
                cy.wrap($el).select($opt.text())
            })
        })
    }

    static fillRequiredSelectFields() {
        cy.get('i[class="fa fa-question-circle"]').parent().siblings('select[required-field]').each(($el) => {
            cy.wrap($el).invoke('attr', 'name').then(($attr) => {
                if (!$attr.toString().includes('eDisposition') && $el.is(':visible')) {
                    cy.wrap($el).find('option').eq(2).then(($opt) => {
                        cy.wrap($el).select($opt.text(), {force: true})
                    })
                }
            })

        })
    }

    static fillOutTimesFields() {
        cy.get('[class="input-group-addon"] i').each(($el) => {
            if ($el.is(':visible')) {
                cy.wrap($el).click()
            }
        })
    }

    static addNewCrew() {
        cy.get('[href="#crew"]').click()
        cy.get('#CrewSelect').then(($el) => {
            cy.wrap($el).find('option').eq(2).then(($opt) => {
                cy.wrap($el).select($opt.text(), {force: true})
            })
        })
        cy.get('[id=crew] .modal-footer .btn-default').contains('Save').click();
    }

    static clickOnExclamationIcon() {
        cy.get('.top-menu [class="fa fa-exclamation-circle"]').click()
    }

    static clickOnError() {
        cy.get('.form-error').then(($elem => {
            for (let i = 0; i < $elem.length; i++) {
                cy.get('.form-error').eq(i).click({force: true})
                cy.get('[class="router-link-active"]').last()
                    .invoke('attr', 'href').then(($href) => {
                    cy.url().should('contain', $href.toString())
                })
            }
        }))
    }

    static clickOnTab(arg) {
        cy.get(`[id*=${arg}] .fa-user`).last().click()
    }

    static typeLastName(name) {
        cy.get('label').contains('Last Name').siblings('input').clear().type(name)
    }

    static fillInRequiredFields() {
        cy.get('i[class="fa fa-question-circle"]').parent().siblings('select[required-field]').each(($el) => {
            cy.wrap($el).invoke('attr', 'name').then(($attr) => {
                if (!$attr.toString().includes('eDisposition') && $el.is(':visible')) {
                    cy.wrap($el).find('option').eq(2).then(($opt) => {
                        cy.wrap($el).select($opt.text(), {force: true})
                    })
                }
            })
        })
        cy.get('[class="fa fa-refresh refresh"]').click()
    }

    static fillAllErrorsFromList() {
        cy.get('.form-error').then(($elem => {
            for (let i = 0; i < $elem.length; i++) {
                cy.get('.form-error').eq(0).click({force: true})
                cy.get('[class*=field-search] select').then(($el) => {
                    cy.wrap($el).find('option').eq(1).then(($opt) => {
                        cy.wrap($el).select($opt.text(), {force: true})
                        cy.get('[class="fa fa-refresh refresh"]').click()
                    })
                })
            }
        }))
    }

    static impressionFields() {
        cy.get('.form-error').eq(0).click()
        cy.get('#section-Impression .form-body div.form-object').not('[style="display: none;"]')
            .find('select').each(($el) => {
            cy.wrap($el).find('option').eq(1).then(($opt) => {
                cy.wrap($el).select($opt.text(), {force: true})
            })
        })
        cy.get('[class="fa fa-refresh refresh"]').click()
    }

    static clickOnUploadButton() {
        cy.get('.fa-cloud-upload').click();
    }

    static clickOnBackButton() {
        cy.get('#undefined .fa-reply').click()
    }

    static clickCheckIntoCloud(arg) {
        cy.get(`[data-bb-handler="${arg}"]`).click();
    }

    static clickOnIncidentNumber(arg) {
        cy.get('table tbody tr #lastName').contains(arg)
            .parentsUntil('tbody').find('#incidentNumber').click()
    }

    static changeSceneAddress() {
        cy.get('#sceneAddressTextArea textarea').click()
        cy.get('[originalngmodel*="state"]').select('AL')
    }

    static navigateToIncidentTab() {
        cy.get('.dropdown-menu #tab-Incident').click({force: true})
    }

    static waitForSync() {
        cy.wait('@syncWait')
    }

    static waitForCheckOut() {
        cy.wait('@checkOut')
    }

    static waitForCheckIn() {
        cy.wait('@checkIn')
    }

    static waitForMyPcrsPage() {
        cy.wait('@MyPcrsPage')
    }
}

export default PCRPage
