"use strict";
var core;
(function (core) {
    class Contact {
        m_fullName;
        m_phoneNumber;
        m_emailAddress;
        constructor(fullName = "", phoneNumber = "", emailAddress = "") {
            this.m_fullName = fullName;
            this.m_phoneNumber = phoneNumber;
            this.m_emailAddress = emailAddress;
        }
        get FullName() {
            return this.m_fullName;
        }
        get PhoneNumber() {
            return this.m_phoneNumber;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set FullName(fullName) {
            this.m_fullName = fullName;
        }
        set PhoneNumber(phoneNumber) {
            this.m_phoneNumber = phoneNumber;
        }
        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }
        toString() {
            return `Full Name: ${this.FullName}\n Phone Number: ${this.PhoneNumber}\n Email Address: ${this.EmailAddress}`;
        }
        serialize() {
            if (this.FullName !== "" && this.PhoneNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.PhoneNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the properties of the contact object are missing or invalid");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_phoneNumber = propertyArray[1];
            this.m_emailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map