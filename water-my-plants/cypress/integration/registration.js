// valid form entries
const validEntries = {
  username: "plantuser",
  email: "plantuser@waterme.com",
  phone: "5555555555",
  password: "=1|A|Tree",
  verifyPassword: "=1|A|Tree"
};
Object.freeze(validEntries);

// fills all the forms with valid data
function fillExcept (variantEntries) {
  const entries = Object.assign({}, validEntries, variantEntries);
  cy.visit('registration');
  if (entries.username)
    cy.get("#username-field").type(entries.username);
  if (entries.email)
    cy.get("#email-field").type(entries.email);
  if (entries.phone)
    cy.get("#phone-number-field").type(entries.phone);
  if (entries.password)
    cy.get("#password-field").type(entries.password);
  if (entries.verifyPassword)
    cy.get("#verify-password-field").type(entries.verifyPassword);

  return cy.get("#submit-form-button");
}

describe('Test validation', () => {
  it('Valid entry can be submitted', () => {
    fillExcept().should("be.enabled");
  });
  it('Missing username stops submission', () => {
    fillExcept({username: ""}).should("be.disabled");
  });
});
