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
})
