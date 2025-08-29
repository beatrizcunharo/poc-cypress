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
    const data = {
      firstName: 'Beatriz',
      lastName: 'Cunha',
      email: 'bia@gmail.com',
      text: 'Text.text.text'
    }

    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário - revisado', () => {
    cy.get('#phone-checkbox').check().should('be.checked')
    cy.get('#phone').should('be.empty')
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.error').should('be.visible')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload').selectFile('@sampleFile').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulário - clock', () => {
    cy.clock()

    const textArea = Cypress._.repeat('Quero ajuda,', 10)

    cy.get('#firstName').type('Beatriz').should('have.value', 'Beatriz')
    cy.get('#lastName').type('Cunha').should('have.value', 'Cunha')
    cy.get('#email').type('bia@gmail.com').should('have.value', 'bia@gmail.com')
    cy.get('#open-text-area').type(textArea, { delay: 20 })
    cy.get('button').click()
    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success').should('not.be.visible')
      .invoke('show')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error').should('not.be.visible')
      .invoke('show')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando .invoke()', () => {
    cy.get('#open-text-area').invoke('val', 'Texto qualquer')
      .should('have.value', 'Texto qualquer')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest').its('statusText').should('be.equal', 'OK')
    cy.get('@getRequest').its('body').should('include', 'CAC TAT')
  })
})