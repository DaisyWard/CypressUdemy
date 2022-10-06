export class DatepickerPage {
  selectCommonDatepickerCalendar(dayFromToday) {
    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click()

        let dateAssert = selectDayFromCurrent(dayFromToday)

        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
      })
  }

  selectDatepickerWithRangeFromToday(firstDay, lastDay) {
    cy.contains('nb-card', 'Datepicker With Range')
      .find('input')
      .then(input => {
        cy.wrap(input).click()

        let dateAssertFirst = selectDayFromCurrent(firstDay)
        let dateAssertLast = selectDayFromCurrent(lastDay)
        const finalDate = dateAssertFirst + ' - ' + dateAssertLast

        cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
        cy.wrap(input).should('have.value', finalDate)
      })
  }
}

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
      cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
    }
  })

  return dateAssert
}

export const onDatepickerPage = new DatepickerPage()