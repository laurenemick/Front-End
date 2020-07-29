// valid form entries
const validEntries = {
  username: "plantuser",
  email: "plantuser@waterme.com",
  phone: "5555555555",
  password: "!1+A+Tree",
  verifyPassword: "!1+A+Tree"
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

describe('Test valid submission', () => {
  it('Valid entry can be submitted', () => {
    fillExcept().should("be.enabled");
  });
});

describe('Test password submission', () => {
  it("To weak password stops submission", () => {
    fillExcept({password: "!1+A+Tre", verifyPassword: "!1+A+Tre"})
      .should("be.disabled");
  });
  it("No password stops submission", () => {
    fillExcept({password: "", verifyPassword: ""}).should("be.disabled");
  });
  it("Unmatched passwords stop submission", () => {
    fillExcept({verifyPassword: "!1+A+Tree+Grows+in+Brooklyn+2!"})
      .should("be.disabled");
  });
});

describe('Test username field submission', () => {
  it('Missing username stops submission', () => {
    fillExcept({username: ""}).should("be.disabled");
  });
  it('Invalid characters in username stop submission', () => {
    fillExcept({username: "plant&user"}).should("be.disabled");
  });
  it('Spaces in username stop submission', () => {
    fillExcept({username: "plant user"}).should("be.disabled");
  });
});

describe('Test email field submission', () => {
  it('Missing address stops submission', () => {
    fillExcept({email: ""}).should("be.disabled");
  });
  it('No domain in address stops submission', () => {
    fillExcept({email: "plantuser"}).should("be.disabled");
  });
  it('Missing domain name stops submission', () => {
    fillExcept({email: "plantuser@"}).should("be.disabled");
  });
  it('No top level domain stops submission', () => {
    fillExcept({email: "plantuser@waterme"}).should("be.disabled");
  });
  it('No lower level domain stops submission', () => {
    fillExcept({email: "plantuser@.com"}).should("be.disabled");
  });
});

describe('Test phone number field submission', () => {
  it("Missing phone number stops submission", () => {
    fillExcept({phone: ""}).should("be.disabled");
  });
  it("To short phone number stops submission", () => {
    fillExcept({phone: "555555555"}).should("be.disabled");
  });
});
