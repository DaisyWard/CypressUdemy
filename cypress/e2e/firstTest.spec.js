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
    function selectDayFromCurrent(day = 1) {
      let date = new Date()
      date.setDate(date.getDate() + day)
      let futureDay = date.getDate()
      let futureMonth = date.toLocaleString('default', {month: 'short'})
      let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttr => {
        if (!dateAttr.includes(futureMonth)) {
          cy.get('[data-name="chevron-right"]').click()
          selectDayFromCurrent(day)
        } else {
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }
      })

      return dateAssert
    }

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click()

        let dateAssert = selectDayFromCurrent(1)

        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
      })
  })

  it('tests radio buttons', () => {
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

  it('tests checkboxes', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toaster').click()

    cy.get('[type="checkbox"]').eq(1).click({force: true}) //To uncheck checkboxes
    cy.get('[type="checkbox"]').eq(0).check({force: true}) //Only can check, can't uncheck
  })

  it('test lists and dropdowns', () => {
    cy.visit('/')

    //Testing theme colour dropdown
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    //Looping through list elements
    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click()
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim()
        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])

        if (index < 3) cy.wrap(dropdown).click()
      })
    })
  })

  it('tests smart table', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //Editing a value
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25') //Clear before typing new value
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })

    //Adding a new row
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Daisy')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Ward')
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then(columns => {
      cy.wrap(columns).eq(2).should('contain', 'Daisy')
      cy.wrap(columns).eq(3).should('contain', 'Ward')
    })

    //Searching/Filtering a table
    // cy.get('thead [placeholder="Age"]').type('20')
    // cy.wait(500) //Wait for table to update
    // cy.get('tbody tr').each(tableRow => {
    //   cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
    // })

    //Searching/Filtering a table with array
    const age = [20, 30, 40, 200]
    cy.wrap(age).each(age => {
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500) //Wait for table to update
      cy.get('tbody tr').each(tableRow => {
        if(age === 200) {
          cy.wrap(tableRow).should('contain', 'No data found')//Test sad path
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        }
      })
    })
  })

  it('tests tooltips', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
  })

  it.only('tests dialog boxes', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    //cy.on('window:confirm', () => false) //If you don't want to confirm
  })
})
