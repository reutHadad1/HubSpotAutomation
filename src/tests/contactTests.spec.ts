import { HubSpotContactService } from '../services/HubSpotContactService';
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.HUBSPOT_API_KEY;

test.describe('HubSpot Contact Tests', () => {
  let contactService: HubSpotContactService;
  let contactId: string;

  test.beforeAll(() => {
    if (!apiKey) {
      throw new Error('API key is required to run tests');
    }
    contactService = new HubSpotContactService(apiKey);
  });

  test('Create a new contact', async () => {
    const newContact = {
      properties: {
        firstname: 'Reut',
        lastname: 'Hadad',
        email: 'reutbenl@gmail.com',
      },
    };

    const response = await contactService.createContact(newContact);
    
    // Assertions to verify the created contact
    expect(response).toBeDefined();
    if (response) {
      expect(response.properties.firstname).toBe(newContact.properties.firstname);
      expect(response.properties.lastname).toBe(newContact.properties.lastname);
      expect(response.properties.email).toBe(newContact.properties.email);
      contactId = response.id;
    }
  });

  test('Update an existing contact', async () => {
    const updatedProperties = {
      firstname: 'Anat',
    };

    const response = await contactService.updateContact(contactId, updatedProperties);
    
    // Assertions to verify the updated contact
    expect(response).toBeDefined();
    if (response) {
      expect(response.properties.firstname).toBe(updatedProperties.firstname);
    }
  });

  test.afterAll(async () => {
    // Clean up by deleting the created contact
    const response = await contactService.deleteContact(contactId);
    if (response) {
      expect(response.status).toBe(204);
    } else {
      throw new Error('Failed to delete contact');
    }
  });
});
