import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with page objects', () => {
  beforeEach('open application', () => {
    cy.openHomePage()
  })

  it('verify navigation', () => {
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.smartTablePage()
    navigateTo.toasterPage()
    navigateTo.tooltipPage()
  })

  it('should submit inline and basic form and select tomorrows date in the calendar', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Daisy', 'test@test.com')
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'test')

    navigateTo.datepickerPage()
    onDatepickerPage.selectCommonDatepickerCalendar(1)
    onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)

    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('Daisy', 'Ward')
    onSmartTablePage.updateAgeByFirstName('Daisy', 27)
    onSmartTablePage.deleteRowByIndex(1)
  })
})