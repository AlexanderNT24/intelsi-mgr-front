describe('User Creation Test', () => {
    it('should create a new user', () => {
      // Visit the specified URL
      cy.visit('http://176.126.87.42:3000/home');
  
      // Set window size
      cy.viewport(981, 812);
  
      // Click on "Registrar Usuarios"
      cy.contains('Registrar Usuarios').click();
  
      // Type the first name
      cy.get('#:r1:').type('eddin');
  
      // Type the last name
      cy.get('#:r3:').type('salazar');
  
      // Type the username
      cy.get('#:r5:').type('oblitas');
  
      // Click on the email input three times (not sure why it's clicked multiple times in the Selenium script)
      cy.get('#:r7:').click().click().click();
  
      // Type the email
      cy.get('#:r7:').type('eddin1@intelsi.com');
  
      // Type the password
      cy.get('#:r9:').type('123');
  
      // Select the role as Supervisor
      cy.get('.MuiSelect-select').click();
      cy.contains('Supervisor').click();
  
      // Click on the body (not sure why it's clicked in the Selenium script)
      cy.get('body').click();
  
      // Click on the Supervisor role again (not sure why it's clicked in the Selenium script)
      cy.contains('Supervisor').click();
  
      // Hover over the button
      cy.get('.MuiButton-contained').trigger('mouseover');
  
      // Click the button to submit the form
      cy.get('.MuiButton-contained').click();
    });
  });
  