//In order for this test to pass you must create a user in the db with the following:
// A name
// An email of testaccount@example.com
// A password of 123456

describe("the style survey user flow", () => {
  it('should create a user', () => {
    cy.visit('http://localhost:3000/user/login')
  })

  it('should log in as that user', () => {
    cy.get('input').eq(0)
      .type('testaccount@example.com')
    cy.get('input').eq(1)
      .type('123456')

    cy.get('button').eq(1)
      .click();
  })

  it('should choose a crate', () => {
    cy.wait(2000)
    cy.get('button').eq(0)
      .click()

    cy.get('button').eq(4)
      .click()

    cy.get('button').eq(0)
      .click()

    cy.get('button').eq(4)
      .click()

    cy.get('button').eq(0)
      .click()

    cy.get('button').eq(4)
      .click()

    cy.get('button').eq(0)
      .click()

    cy.get('button').eq(4)
      .click()

    cy.get('button').eq(0)
      .click()

    cy.get('button').eq(4)
      .click()

    cy.get('h4')
      .contains('Your style is prom and colonial')

    // cy.find('button').eq()
    //   .click()

    // cy.get('button')
    //   .click()
    //
    // cy.find('button')
    //   .contains('Submit')
    //   .click()
    //
    // cy.get('button')
    //   .click()
    //
    // cy.find('button')
    //   .contains('Submit')
    //   .click()
    //
    // cy.get('button')
    //   .click()
    //
    // cy.find('button')
    //   .contains('Submit')
    //   .click()
    //
    // cy.get('button')
    //   .click()
    //
    // cy.find('button')
    //   .contains('Submit')
    //   .click()

    })
})
