export const openedCloudPCRPage = class openedCloudPCRPage {
    static expect() {
        return {
            toShowOpenedPage: () => {
                cy.url().should('not.contain', 'Login')
                    .should('contain', 'MyPcrs');
                cy.get('.logo-default').should('be.exist');
            }
        }
    }
};

export const errorsModal = class errorsModal {
    static expect() {
        return {
            toShowErrorsModal: () => {
                cy.get('#formErrorList').should('be.visible');
            }
        }
    }
};

export const uploadButton = class uploadButton {
    static expect() {
        return {
            toShowGreenIcon: () => {
                cy.get('.fa-cloud-upload').invoke('attr', 'style').should('contains', 'green')
            }
        }
    }
};

export const validationMessage = class validationMessage {
    static expect() {
        return {
            toShowMessage: (message) => {
                cy.get('.toast-message').should('be.exist')
                    .should('contain', message)
            }
        }
    }
};

export const errorsList = class errorsList {
    static expect() {
        return {
            notToShowErrors: () => {

            }
        }
    }
};