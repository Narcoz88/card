describe('Sapper template app', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/')
	});

	it('first input', () => {
		cy.get('.first-input').click().type('123');
		cy.get('.first-form').submit();
		cy.get('ol > li > .wrap-item > .title').contains(123);
		cy.get('.first-input').click().type('456');
		cy.get('.first-form').submit();
		cy.get('ol > li > .wrap-item > .title').contains(456);
		cy.get('.first-input').click().type('789');
		cy.get('.first-form').submit();
		cy.get('ol > li > .wrap-item > .title').contains(789);

		cy.get('ol > li:first > .wrap-item > .delete').click();
		cy.get('ol > li:first > .wrap-item > .delete').click();
		cy.get('ol > li').should('have.length', 1);
		cy.get('ol > li > .wrap-item > .redact').click();
		cy.get('ol > li > .wrap-item > .form-two > input').click().type('666');
		cy.get('ol > li > .wrap-item > .form-two').submit();
		cy.get('ol > li > .wrap-item > .title').contains(666);
	});

	it('first input', () => {
		cy.get('.first-input').click().type('123');
		cy.get('.first-form').submit();
		cy.get('ol > li > .wrap-item > .title').contains(123);
		cy.get('.first-input').click().type('456');
		cy.get('.first-form').submit();
		cy.get('ol > li > .wrap-item > .title').contains(456);
		cy.get('.first-input').click().type('789');
		cy.get('.first-form').submit();
		cy.get('ol > li > .wrap-item > .title').contains(789);

		cy.get('ol > li:first > .wrap-item > .delete').click();
		cy.get('ol > li:first > .wrap-item > .delete').click();
		cy.get('ol > li:first > .wrap-item > .delete').click();
		cy.get('ol').not('li');
	});

	it('first input', () => {
		cy.get('.first-input').click().type('123');
		cy.get('.first-form').submit();
		cy.get('ol > li > .wrap-item > .title').contains(123);
		cy.get('.first-input').click().type('456');
		cy.get('.first-form').submit();
		cy.get('ol > li > .wrap-item > .title').contains(456);
		cy.get('.first-input').click().type('789');
		cy.get('.first-form').submit();
		cy.get('ol > li > .wrap-item > .title').contains(789);

		cy.get('ol > li:first > .wrap-item > .delete').click();
		cy.get('ol > li:first > .wrap-item > .delete').click();
		cy.get('ol > li:first > .wrap-item > .delete').click();
		cy.get('ol').not('li');
	});

	it('first input', () => {
		cy.get('h1').contains('555');
	});


});