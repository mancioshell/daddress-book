export type Contact = {
  id?: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export type OnInsert = (contact: Contact, cb: any) => void;
export type OnDelete = (id?: number) => void;

