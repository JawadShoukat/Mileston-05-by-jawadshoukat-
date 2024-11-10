// LISTING ELEMENT
document.getElementById('resumeForm')?.addEventListener ('submit', function(event){
    event.preventDefault();

    // Get reference to form elements using their IDs

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    //TYPE ASSERTION
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;


  const usernameElement = document.getElementById("username") as HTMLInputElement;
   
    if ( profilePictureInput &&  nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement){

     usernameElement

        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

        


    const username = usernameElement.value;
    const uniquePath = `resume/${username.replace(/\s+/g, '_')}_cv.html`
  
//  PICTURE ELEMENTS
const profilePictureFile = profilePictureInput.files?.[0]
const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : ''; 

  
    //CREATE THE RESUME OUTPUT
    const resumeOutput = `
    <h2>Resume</h2>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}  

    <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span></p>
    <p><strong>Email:</strong> <span id="edit-email" class="editable"> ${email} </span> </p>
    <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>

      <h3>Education</h3>
      <p>${education}</p>
      <h3>Experience</h3>
      <p>${experience}</p>
      <h3>Skills</h3>
      <p>${skills}</p>
    `;


       //Display the resume in the output container
             const resumeOutputElement = document.getElementById('resumeOutput')
      if (resumeOutputElement){
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.classList.remove("hidden");

        //Create container for buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);
      

        //Add Downlode PDF buutton
        const downlodeButton = document.createElement("button");
        downlodeButton.textContent = "Downlode as PDF";
        downlodeButton.addEventListener("click", () => {
          window.print(); // Open the print dialog, allowing the user to the save as PDF
        });
        buttonsContainer.appendChild(downlodeButton);

        //Add shareable link button
        const shareableLinkButton = document.createElement("button");
        shareableLinkButton.textContent = "Copy Shareable Link";
        shareableLinkButton.addEventListener("click", async () =>{
          try{

            // Create a unique shareable link (simulate it in this case)
            const shareableLink = `https://yourdomain.com/resume/${name.replace(
              /\s+/g,
              "_"
            )}_cv.html`;
            // Use clipboard API to copy the shareable link
            await navigator.clipboard.writeText(shareableLink);
            alert("shareable link copied to clipboard!");
          } catch (err) {
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link to clipboard. please try again");
          }
      });
        buttonsContainer.appendChild(shareableLinkButton)

      } else{
        console.error("Resume output container not found");
      }

    } else{
        console.error('Form elements are missing');
    }
});


function makeEditable(){
  const editableElements = document.querySelectorAll('.editable')
  editableElements.forEach(element =>{
    element.addEventListener('click' , function(){
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "" ;
      

      //REPLACE CONTENT
      if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
        const input = document.createElement('input')
        input.type = 'text'
        input.value = currentValue
        input.classList.add('editing-input')

        input.addEventListener('blur', function (){
          currentElement.textContent = input.value;
          currentElement.style.display = 'inline'
          input.remove()
         })
         
        currentElement.style.display = 'none'
        currentElement.parentNode?.insertBefore(input, currentElement)
        input.focus()

      }


       })
  })
}