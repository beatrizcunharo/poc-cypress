Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Beatriz').should('have.value', 'Beatriz')
    cy.get('#lastName').type('Cunha').should('have.value', 'Cunha')
    cy.get('#email').type('bia@gmail.com').should('have.value', 'bia@gmail.com')
    cy.get('#open-text-area').type('Teste').should('have.value', 'Teste')
    cy.get('button').click()
})
