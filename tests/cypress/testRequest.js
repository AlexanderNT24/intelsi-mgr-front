describe('Request Page', () => {
    it('should perform the actions described in Selenium script', () => {
      cy.visit('http://176.126.87.42:3000/request');
      
      cy.viewport(981, 812);
  
      // Click on "Salir"
      cy.get('a:contains("Salir")').click();
  
      // Log in
      cy.get('#email').type('supervisor@intelsi.com');
      cy.get('#password').type('123');
      cy.get('button:contains("Ingresar")').click();
  
      // Navigate to "Registrar Pedidos"
      cy.get('a:contains("Registrar Pedidos")').click();
  
      // Set date values
      cy.get('[id^=:rb:]').type('2023-11-15');
      cy.get('[id^=:rd:]').type('2023-11-15');
  
      // Set request status
      cy.get('#request-status').click();
      cy.get('.MuiMenuItem-root:nth-child(2)').click();
  
      // Set quantity
      cy.get('[id^=:rf:]').type('12');
  
      // Set combo box value
      cy.get('#combo-box-demo').click();
      cy.get('#combo-box-demo-option-5').click();
  
      // Hover and click on a button
      cy.get('.MuiButton-contained').trigger('mouseover').click();
  
  
    });
  });
  