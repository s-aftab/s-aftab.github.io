"use strict";
var core;
(function (core) {
    class User {
        m_displayName;
        m_emailAddress;
        m_username;
        m_password;
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }
        get DisplayName() {
            return this.m_displayName;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        get Username() {
            return this.m_username;
        }
        get Password() {
            return this.m_password;
        }
        set DisplayName(displayName) {
            this.m_displayName = displayName;
        }
        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }
        set Username(username) {
            this.m_username = username;
        }
        set Password(password) {
            this.m_password = password;
        }
        toString() {
            return `DisplayName: ${this.DisplayName}\n Email Address: ${this.EmailAddress} \n Username: ${this.Username}`;
        }
        toJSON() {
            return {
                "DisplayName": this.m_displayName,
                "EmailAddress": this.m_emailAddress,
                "Username": this.m_username
            };
        }
        fromJSON(data) {
            this.m_displayName = data.DisplayName;
            this.m_emailAddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }
        serialize() {
            if (this.DisplayName !== "" && this.Username !== "" && this.EmailAddress !== "" && this.m_password !== "") {
                return `${this.DisplayName}, ${this.EmailAddress},${this.Username}, ${this.Password}`;
            }
            console.error("One or more of the properties of the contact object are missing or inavlid");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.m_displayName = propertyArray[0];
            this.m_emailAddress = propertyArray[1];
            this.m_username = propertyArray[2];
            this.m_password = propertyArray[3];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map