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

  it('then and wrap methods', () => {
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

  it('invoke commands', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')
    })

    //3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address')
    })

    //Check checkbox is clicked
    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      //.should('contain', 'checked')
      .then(classValue => {
        expect(classValue).to.contain('checked')
      })
  })

  it('asserts property', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    //Clicking on date picker
    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Oct 17, 2022')
      })
  })

  it.only('tests radio buttons', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid')
    .find('[type="radio"]')
    .then(radioButtons => {
      cy.wrap(radioButtons)
        .first()
        .check({force: true}) //Element is visibily hidden - custom checkbox
        .should('be.checked')


    cy.wrap(radioButtons)
      .eq(1) //Find second radio button
      .check({force: true})

    cy.wrap(radioButtons)
      .first()
      .should('not.be.checked')

    cy.wrap(radioButtons)
      .eq(2)
      .should('be.disabled')
    })
  })
})
