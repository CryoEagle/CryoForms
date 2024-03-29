# CryoForms

*__1.1.8-alpha__ bug fixes, more functions, better wiki will come later*

Thank you for choosing **CryoForms**. This document will help you to start using **CryoForms**. Please note that **CryoForms** is still in alpha phase, so this document may be updated in future version-ups, in project there are lot's of components missing, this release is just for testing, choosing right start with developing core of project.

## 🌟 Effective Usage

You should use it in projects and places where you want real-time validating user inputs, this means user, or administrator have better feelings when using your application, we want give developer ability to complete modify our components outside of core, so he could completely manage behaviors of components like colors, appearance when typing not valid input.

![alt text](https://i.imgur.com/nocEXDu.gif "Example")

## 📦 Install

```
npm install cryoforms
```

You can find **CryoForms** on **GitHub** right here https://github.com/CryoEagle/CryoForms

## 🔨 Usage

```jsx
import { CryoForm, CryoInput, CryoButton, cryoUseForm } from 'cryoforms';

const Index = () => {
    const [form] = cryoUseForm();
    
    const success = (x) => {
        console.log(x);
        form.clearInputs();
    }
    
    const failed = (message){
        console.log(message);
    }
    
    return (
        <CryoForm successFunc={success} failedFunc={failed} form={form}>
            <CryoInput 
                autoComplete={"off"}
                name="username"
                label="Username" 
                inputProps={{className: "input-test"}}
                rules={[
                    {required: true, errorMessage: "Please enter username"},
                    {minLength: 5, errorMessage: 'username should have at least 5 characters'}]} 
            />
            <CryoInput 
                autoComplete={"off"}
                name="email"
                label="Email" 
                description="We don't share your password"
                rules={[
                    {required: true, errorMessage: "Please enter email"},
                    {type: 'email', errorMessage: 'Enter valid email please'}]} 
            />
            <CryoInput 
                autoComplete={"off"}
                name="password"
                label="Password" 
                rules={[
                    {required: true, errorMessage: "Please enter password"},
                ]} 
            />
            <CryoInput 
                autoComplete={"off"}
                name="number"
                label="Number" 
                rules={[
                    {required: true, errorMessage: "Please enter number"},
                    {type: 'number', errorMessage: 'Enter valid number please'}]} 
            />
            <CryoButton block={true}>Login</CryoButton>
        </CryoForm>
    );
}
```

# 📚 Wiki

Check our wiki for more information https://github.com/CryoEagle/CryoForms/wiki