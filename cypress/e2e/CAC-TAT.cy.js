describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const textArea = Cypress._.repeat('Quero ajuda,', 10)
    cy.get('#firstName').type('Beatriz').should('have.value', 'Beatriz')
    cy.get('#lastName').type('Cunha').should('have.value', 'Cunha')
    cy.get('#email').type('bia@gmail.com').should('have.value', 'bia@gmail.com')
    cy.get('#open-text-area').type(textArea, { delay: 20 })
    cy.get('button').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Beatriz').should('have.value', 'Beatriz')
    cy.get('#lastName').type('Cunha').should('have.value', 'Cunha')
    cy.get('#email').type('bia.com').should('have.value', 'bia.com')
    cy.get('#open-text-area').type('Teste').should('have.value', 'Teste')
    cy.get('button').click()
    cy.get('.error').should('be.visible')
  })

  it('validação do campo de telefone para permitir apenas números', () => {
    cy.get('#phone').type('24999210147').should('have.value', '24999210147').invoke('val').should('match', /^\d+$/)
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Beatriz').should('have.value', 'Beatriz')
    cy.get('#lastName').type('Cunha').should('have.value', 'Cunha')
    cy.get('#email').type('bia@gmail.com').should('have.value', 'bia@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').should('be.empty')
    cy.get('button').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Beatriz').should('have.value', 'Beatriz').clear().should('be.empty')
    cy.get('#lastName').type('Cunha').should('have.value', 'Cunha').clear().should('be.empty')
    cy.get('#email').type('bia@gmail.com').should('have.value', 'bia@gmail.com').clear().should('be.empty')
    cy.get('#phone').type('24999210147').should('have.value', '24999210147').clear().should('be.empty')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
})