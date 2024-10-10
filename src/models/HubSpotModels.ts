// Model for the properties of a contact
export interface ContactProperties {
    firstname: string;
    lastname: string;
    email: string;
  }
  
  // Model for the full contact
  export interface Contact {
    properties: ContactProperties;
  }
  
  // Model for the response when a contact is created or updated
  export interface HubSpotContactResponse {
    id: string;
    properties: ContactProperties;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
  }
  
  // Model for the response error
  export interface HubSpotErrorResponse {
    status: string;
    message: string;
    correlationId: string;
    category: string;
  }

  export interface DeleteResponse {
    status: number;
    statusText?: string;   
  }
  