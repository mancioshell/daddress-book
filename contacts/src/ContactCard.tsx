import React from "react";
import "./App.css";

import { Contact, OnDelete } from "./types";

type Param = {
  contact: Contact;
  onDelete: OnDelete;
  index: number;
};

function ContactCard({ contact, onDelete, index }: Param) {
  return (
    <div className="p-4 lg:w-1/3">
      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
        <img
          className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
          src={`https://avatars.dicebear.com/api/adventurer/${contact.name}.${contact.surname}.svg`}
          alt="robohash"
        ></img>

        <div className="flex-grow sm:pl-8">
          <h2 className="text-xl text-gray-700 font-bold">
            {contact.name} {contact.surname}
          </h2>
          <h3 className="text-base text-gray-400 font-normal">
            <b>Phone: </b>
            {contact.phone}
          </h3>

          <span className="inline-flex">
            <a href={`mailto:${contact.email}`} className="text-gray-500">
              <i className="fas fa-envelope"></i> {contact.email}
            </a>
          </span>

          <div className="flex-grow">
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(index);
              }}
              className="mt-5 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
