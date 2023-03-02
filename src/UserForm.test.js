// Most important parts of user form

// show two inputs and one button
// entering a name and email then submitting the form causes the "onUserAdd' callbacl to be called

//three main parts to writing any test arerender, manipulate, and assertion

// in render
//tests are generated in node.js environment "Fake browser environmet" created by reactjs dom

//access elements by using screen object
//functions utilizing queries that get data getAllByRole, getByRole 
//there are about 48 functions 

//ARIA Role
//Aria roles clarify the purpose of an HTML element
// traditionally used bu screen readers -softwared to help people understand the content on the screen
// many HTML elements have an inplicit or authomatically assigned role
// elements can ve assigned manually assigned a role. Even trained engineers do this incorrectly 

// Examples of Aria roles in relation to hml ElementInternals

// heading ---> h1 h2 h3 h4 h5 h6
// list ==> ul li
// button --> button
// link --> a
// textbox--> input, type='text'


//expect is provided by jest library on global level
//matcher to make sure something exists, or matches what we are looking to accomplish
//matchers coming from jest will have a ".to" as starting poing
// .toHaveLength(), toEqual(), toContain etc
//another one is coming from rect testing library and the y will be in toBeInTheDocument, toBeEnabmes, toHaveClass

//user allows us to utilize user events like clicking and writing user.click(), user.keyboard('dhfkjh) user.keyboard('{Enter}')

import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

//give the test a description of what you are testing
test("A form shows two inputs and a button", () => {
  //render the component isolated all by itself
  render(<UserForm />);

  //manipulte the component or find and element in it

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // assertion- make sure the component is doing what we expect it to do
  //utalize matchers to ensure the test in passed/ failed 
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});


test('it calls onUserAdd when the form is submitted', ()=>{
    //NOT THE BEST IMPLEMENTATION
    const argList = []
    const callback = (...args)=>{
        argList.push(args)

    }
    //render my component
    render(<UserForm onUserAdd={callback} />)

    //find two inputs
    const [nameInput, emailInput] = screen.getAllByRole('textbox')

    //simulate typing in a name
    user.click(nameInput)
    user.keyboard('jane')
    //simulate typing in an email

    user.click(emailInput)
    user.keyboard('jane@gmail.com')

    //find the button
    const button = screen.getByRole('button')

    //simulate clicking the button 
    user.click(button)

    //assertion to make sure "onUserAdd" gets called with email and username
    expect(argList).toHaveLength(1)
    expect(argList[0][0]).toEqual({name:'jane', email:'jane@gmail.com'})


})