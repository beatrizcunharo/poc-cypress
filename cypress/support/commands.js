Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Lorena',
    lastName: 'Lima',
    email: 'lorena@gmail.com',
    text: 'sou lorena'
}) => {
    cy.get('#firstName').type(data.firstName).should('have.value', data.firstName)
    cy.get('#lastName').type(data.lastName).should('have.value', data.lastName)
    cy.get('#email').type(data.email).should('have.value', data.email)
    cy.get('#open-text-area').type(data.text).should('have.value', data.text)
    cy.contains('button', 'Enviar').click()
})
