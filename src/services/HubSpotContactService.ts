import { ApiManager } from '../managers/ApiManager';
import { Contact, DeleteResponse, HubSpotContactResponse } from '../models/HubSpotModels';

export class HubSpotContactService {
  private apiManager: ApiManager;

  constructor(apiKey: string) {
    this.apiManager = new ApiManager();
    const baseUrl = 'https://api.hubapi.com';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
    this.apiManager.setApiRequestContext(baseUrl, headers);
  }

  public async createContact(contact: Contact): Promise<HubSpotContactResponse | null> {
    const endpoint = '/crm/v3/objects/contacts';
    const options = { data: contact };

    try {
      const response = await this.apiManager.postRequest(endpoint, options);
      if (response) {
        console.log('Contact created successfully:', response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Error creating contact:', (error as Error).message || error);
      console.error('Contact data that caused the error:', contact);
    }
    return null; // Return null in case of error
  }
  
  public async updateContact(contactId: string, updatedProperties: Partial<Contact['properties']>): Promise<HubSpotContactResponse | null> {
    const endpoint = `/crm/v3/objects/contacts/${contactId}`;
    const options = { data: { properties: updatedProperties } };

    try {
      const response = await this.apiManager.patchRequest(endpoint, options);
      if (response) {
        console.log('Contact updated successfully:', response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Error updating contact:', (error as Error).message || error);
      console.error('Contact ID:', contactId);
      console.error('Updated properties:', updatedProperties);
    }
    return null; // Return null in case of error
  }

  public async deleteContact(contactId: string): Promise<DeleteResponse | null> {
    const endpoint = `/crm/v3/objects/contacts/${contactId}`;
    console.log(`Deleting contact with ID: ${contactId}`);
 
    try {
      const response = await this.apiManager.deleteRequest(endpoint);
      if (response) {
        console.log('Contact deleted successfully:', response.status);
        return response;
      }
    } catch (error) {
      console.error('Error deleting contact:', (error as Error).message || error);
      console.error('Contact ID:', contactId);
    }
    return null; // Return null in case of error
  }
}
