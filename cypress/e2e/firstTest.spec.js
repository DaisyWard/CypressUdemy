/// <reference types='cypress' />

// describe('Our first suite', () => {
//   beforeEach('code before every test', () => {

//   })

//   it('first test', () => {

//   })

//   it('second test', () => {

//   })

//   it('third test', () => {

//   })
// })

describe('Test grabbing an element', () => {
  it('grabs the input email element', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // By tag name
    cy.get('input')

    //By id
    cy.get('#inputEmail1')

    //By class name
    cy.get('.input-full-width')

    // By attribute name
    cy.get('[placeholder]')

    //By attribute name and value
    cy.get('[placeholder="Email"]')

    //By class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //By tag name and attribute with value
    cy.get('input[placeholder="Email"]')

    //By two different attributes
    cy.get('[placeholder="Email"][type="email"]')

    //By tag name, attribute with value, id and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    //By the most recommended way by Cypress
    cy.get('[data-cy="inputEmail1"]')
  })

  it('finds the sign in buttons', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')

    cy.contains('[status="warning"]', 'Sign in')

    //Find by going up to parent div and then in parent div
    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    //Find using a sibling element
    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
  })

  it.only('then and wrap methods', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid')
      .find('[for="inputEmail1"]')
      .should('contain', 'Email')

    cy.contains('nb-card', 'Using the Grid')
      .find('[for="inputPassword2"]')
      .should('contain', 'Password')

    cy.contains('nb-card', 'Basic form')
      .find('[for="exampleInputEmail1"]')
      .should('contain', 'Email address')

    cy.contains('nb-card', 'Basic form')
      .find('[for="exampleInputPassword1"]')
      .should('contain', 'Password')


    //jQuery syntax not Cypress
    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(passwordLabelFirst).to.equal(passwordLabelSecond)

        //Convert it back to Cypress
        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
      })
    })
  })
})
