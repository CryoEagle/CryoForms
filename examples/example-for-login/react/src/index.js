import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CryoForm, CryoInput, CryoButton, cryoUseForm } from 'cryoforms';

const Index = () => {
    const [form] = cryoUseForm();

    const success = (x) => {
        toast.success("ok");
        console.log(x);
        form.clearInputs();
    }

    const failed = (mess) => {
        toast.error(mess);
    }

    return (
        <div>
            <ToastContainer />
            <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)'}}>
                <CryoForm successFunc={success} failedFunc={failed} form={form}>
                    <CryoInput autoComplete={"off"} name="username" label="Username" rules={[{required: true, errorMessage: "Please enter username"}, {minLength: 5, errorMessage: 'username should have at least 5 characters'}]} />
                    <CryoInput autoComplete={"off"} name="email" label="Email" description="We don't share your password" rules={[{required: true, errorMessage: "Please enter email"}, {type: 'email', errorMessage: 'Enter valid email please'}]} />
                    <CryoInput autoComplete={"off"} name="password" label="Password" type="password" rules={[{required: true, errorMessage: "Please enter password"}]} />
                    <CryoButton block={true}>Login</CryoButton>
                </CryoForm>
            </div>
        </div>
    )
}

ReactDOM.render(<Index />, document.getElementById("root"));