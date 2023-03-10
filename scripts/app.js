"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function () {
    function AddContact(fullName, phoneNumber, emailAddress) {
        let contact = new core.Contact(fullName, phoneNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function AjaxRequest(method, url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (typeof callback === "function") {
                    callback(xhr.responseText);
                }
                else {
                    console.error("Error: callback is not a valid function.");
                }
            }
        });
        xhr.open(method, url);
        xhr.send();
    }
    function LoadHeader() {
        $.get("/views/components/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstLetter(router.ActiveLink);
            $(`li > a:contains(${document.title})`).addClass("active");
            CheckLogin();
        });
    }
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function LoadFooter() {
        $.get("/views/components/footer.html", function (html_data) {
            $("footer").html(html_data);
            $(`li > a:contains(${document.title})`).addClass("active");
            CheckLogin();
        });
    }
    function LoadContent() {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallBack();
        $.get('./views/content/${page_name}.html', function (html_data) {
            $("main").html(html_data);
            callback();
        });
    }
    function DisplayHomePage() {
        console.log("Home Page");
        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html";
        });
        $("main").append(`<p id="MainParagraph" class="mt-3"> This is the main paragraph</p>`);
        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`);
    }
    function DisplayProductsPage() {
        console.log("Products Page");
    }
    function DisplayServicesPage() {
        console.log("Services Page");
    }
    function DisplayAboutUsPage() {
        console.log("About us Page");
    }
    function validateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea");
        $(input_field_id).on("blur", function () {
            let fullNameText = $(this).val();
            if (!regular_expression.test(fullNameText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        validateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid first and last name (ex: Matt Murdock)");
        validateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid phone contact number.");
        validateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");
    }
    function DisplayContactPage() {
        console.log("Contact Us Page");
        ContactFormValidation();
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckBox");
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].phoneNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if (contact.serialize()) {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact List Page");
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center>"${index}</th>
                     <td>${contact.FullName}</td>
                     <td>${contact.PhoneNumber}</td>
                     <td>${contact.EmailAddress}</td>
                     <td class="text-center">
                         <button value="${key}" class="btn btn-primary btn-sm edit">
                            <i class="fas fa-edit fa-sm"></i>Edit</button>
                     </td>
                      <td class="text-center">
                        <button value="${key}" class="btn btn-danger btn-sm delete">
                            <i class="fas fa-trash-alt fa-sm"></i>Delete</button>
                     </td>
                     
                     </tr>`;
                index++;
            }
            contactList.innerHTML = data;
            $("#addButton").on("click", () => {
                location.href = "edit.html#add";
            });
            $("button.delete").on("click", function () {
                if (confirm("Delete contact, are you sure?")) {
                    localStorage.removeItem($(this).val());
                }
                location.href = "contact-list.html";
            });
        }
    }
    function DisplayEditPage() {
        console.log("Edit Contact Page");
        ContactFormValidation();
        let page = location.hash.substring(1);
        switch (page) {
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"</i> Add`);
                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    let fullName = document.forms[0].fullName.value;
                    let contactNumber = document.forms[0].phoneNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });
                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;
            default:
                {
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    $("#fullName").val(contact.FullName);
                    $("#phoneNumber").val(contact.PhoneNumber);
                    $("#emailAddress").val(contact.EmailAddress);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        contact.FullName = $("#fullName").val();
                        contact.PhoneNumber = $("#phoneNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();
                        localStorage.setItem(page, contact.serialize());
                        location.href = "contact-list.html";
                    });
                }
                break;
        }
    }
    function DisplayLoginPage() {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.User();
            $.get("./data/user.json", function (data) {
                for (const u of data.user) {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    if (username === u.Username && password === u.Password) {
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger")
                        .text("Error: Invalid Credentials!");
                }
            });
            $("#cancelButton").on("click", function () {
                document.forms[0].reset();
                location.href = "index.html";
            });
        });
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>`);
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            location.href = "login.html";
        });
    }
    function DisplayRegisterPage() {
        console.log("Register Page");
    }
    function Display404Page() {
        console.log("404 Page");
    }
    function ActiveLinkCallBack() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutUsPage;
            case "services": return DisplayServicesPage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "products": return DisplayProductsPage;
            case "register": return DisplayRegisterPage;
            case "login": return DisplayLoginPage;
            case "edit": return DisplayEditPage;
            case "404": return Display404Page;
            default:
                console.error("ERROR: callback does not exist" + router.ActiveLink);
                return new Function;
        }
    }
    function Start() {
        console.log("App Started!");
        LoadHeader();
        LoadContent();
        LoadContent();
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map