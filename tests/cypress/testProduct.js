describe('Product CRUD Operations', () => {
    it('should perform CRUD operations on products', () => {
      // Visit the website or application
      cy.visit('/');
  
      // Set window size
      cy.viewport(1200, 800);
  
      // Close any unwanted elements
      cy.get('.close-button').click();
  
      // Navigate to the page to register products
      cy.contains('Ir a la página de inicio').click();
      cy.contains('Registrar Productos').click();
  
      // Register a new product
      cy.get('#productName').type('M004');
      cy.get('#productQuantity').type('12');
      cy.get('#productWeight').type('65.0234375');
      cy.get('#productMaterial').type('Oro falso');
      cy.get('#productMine').type('Mina B');
  
      // Save the product
      cy.contains('Guardar').click();
  
      // Edit the product
      cy.contains('M004').click();
      cy.get('#productWeight').clear().type('65.5');
      cy.contains('Guardar cambios').click();
  
      // Delete the product
      cy.contains('M004').siblings('.delete-button').click();
      cy.contains('Aceptar').click();
    });
  });
  