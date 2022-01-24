import React from "react";
import "./App.css";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";

import Web3 from "web3";
import { CONTACT_ABI, CONTACT_ADDRESS } from "./config";

import { Contact, OnInsert, OnDelete } from "./types";

function App() {
  const [contract, setContract] = useState<any>();
  const [web3, setWeb3] = useState<any>();
  const [account, setAccount] = useState<string|undefined>();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

      setWeb3(web3);

      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const contract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setContract(contract);
    }

    load();
  }, []);

  useEffect(() => {
    async function load() {
      if (account) {
        let contacts = await contract?.methods.getContacts(account).call();
        if(contacts) setContacts(contacts);        
      }
    }

    load();
  }, [account, contract]);

  const onInsert: OnInsert = async (contact, cb) => {
    await contract?.methods
      .createContact(
        contact.name,
        contact.surname,
        contact.phone,
        contact.email,
        account
      )
      .send({
        from: account,
      });

    let nextId = contacts.length;
    setContacts((contacts: any) => [...contacts, { ...contact, id: nextId }]);
    cb();
  };

  const onDelete: OnDelete = async (id?: number) => {
    await contract?.methods.removeContact(id, account).send({
      from: account,
    });
    setContacts(contacts.filter((_, index) => index !== id));
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-2 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-6xl font-medium title-font mb-4 text-gray-900 tracking-widest">
            Contacts{" "}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Your account is: {account}
          </p>
        </div>

        <ContactForm onInsert={onInsert}></ContactForm>

        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Contact List
              </h1>
            </div>

            <div className="flex flex-wrap -m-4">
              {contacts.map((contact: Contact, index) => (
                <ContactCard
                  key={index}
                  contact={contact}
                  index={index}
                  onDelete={onDelete}
                ></ContactCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default App;
