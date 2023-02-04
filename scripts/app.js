"use strict";


(function (){
    /**
     * Instantiates a contact and stores in localStorage
     * @param fullName
     * @param phoneNumber
     * @param emailAddress
     * @constructor
     */
    function AddContact(fullName, phoneNumber, emailAddress){
        let contact = new core.Contact(fullName.value, phoneNumber.value, emailAddress.value);
        if(contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function DisplayHomePage(){
        console.log("Home Page");
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function(){
            location.href = "about.html"
        });

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");

        /*
        MainParagraph.textContent = "This is the Main Paragraph!";
        MainContent.appendChild(MainParagraph);
        */
        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph`;
        MainParagraph.textContent = SecondString;
        MainContent.appendChild(MainParagraph);

        let DocumentBody = document.getElementsByTagName("body")[0];
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph class="mt-3">This is my article paragraph</p>`;
        Article.setAttribute("class","container");
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);
    }





    function DisplayProductsPage(){
        console.log("Products Page");
    }

    function DisplayServicesPage(){
        console.log("Services Page");
    }

    function DisplayAboutUsPage(){
        console.log("About us Page");
    }

    function DisplayContactPage(){
        console.log("Contact Us Page");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckBox");

        sendButton.addEventListener("click", function(event){

            if (subscribeCheckbox.checked){
                AddContact(fullName.value, phoneNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListPage(){
        console.log("Contact List Page");
        

        if(localStorage.length >0){
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for(const key of keys){
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
                location.href = "edit.html#add" + $(this).val();

            });
            $("button.delete").on("click", function(){
                if(confirm("Delete contact, are you sure?")){
                    localStorage.removeItem($(this).val())
                }
                location.href = "contact-list.html"
            })
        }

    }

    function DisplayEditPage(){
        console.log("Edit Contact Page");
        let page = location.hash.substring(1);
        switch (page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"</i> Add`);
                $("editButton").on("click", (event) => {
                    event.preventDefault();
                    AddContact(fullName.value, phoneNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });
                $("#cancelButton").on("click", ()=>{
                    location.href = "contact-list.html";
                })
                break;
            default:{ //edit-case
                //get contact info from localStorage
                let contact = new core.Contact ();
                contact.deserialize(localStorage.getItem(page));
                // display the contact info in the edit form
                $("#fullName").val(contact.FullName);
                $("#phoneNumber").val(contact.PhoneNumber);
                $("#emailAddress").val(contact.EmailAddress);

                //when editButton is pressed- update the contact
                $("#editButton").on("click", (event) =>{
                    event.preventDefault();
                    //get changes
                    contact.FullName = $("#fullName").val();
                    contact.PhoneNumber = $("#phoneNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    //replace item in local storage
                    localStorage.setItem(page, contact.serialize());
                    //return to contact-list
                    location.href = "contact-list.html";
                });


            }
                break;
        }
    }

    function Start()
    {
        console.log("App Started!")
        switch (document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
        }
    }
    window.addEventListener("load", Start)

})();