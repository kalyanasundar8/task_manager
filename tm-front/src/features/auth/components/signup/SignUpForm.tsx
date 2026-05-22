import { Button, Form, Input, notification } from 'antd';
import { Link } from 'react-router-dom';
import type { NotificationType } from './types';
import { SignUp, type SignUpPayload } from '../../services/auth.service';
import { useState } from 'react';
import { X } from 'lucide-react';

const SignUpForm = () => {
    // const [api, contextHolder] = notification.useNotification();
    const [message, setMessage] = useState<{ title: string, description: string }>({
        title: '',
        description: ''
    });
    const [showToast, setShowToast] = useState(false);

    // const showNotification = (type: NotificationType) => {
    //     api[type]({
    //         title: message.title,
    //         description: message.description
    //     })
    // }

    const onFinish = async (values: SignUpPayload) => {
        const response = await SignUp(values);
        if (response.success === false) {
            setShowToast(true);
        }
        console.log(response.message);
        setMessage({
            ...message,
            title: response.message,
            description: "Something went wrong!"
        })
    }


    const onFinishFailed = (erroInfo: any) => {
        console.log('Failed: ', erroInfo)
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            {/* {contextHolder} */}
            <div className='w-full max-w-md flex flex-col p-5'>
                {showToast === true ? (
                    <div className='flex items-center justify-between bg-red-100 p-3 mb-3'>
                        <p className='text-sm font-normal text-red-500'>{message.title}</p>
                        <X size={12} onClick={() => setShowToast(false)} />
                    </div>
                ) : ""}
                <h1 className='text-xl font-bold mb-5'>Create your account</h1>
                <Form
                    name='basic'
                    layout='vertical'
                    initialValues={{ remember: true }}
                    autoComplete='off'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div className='flex flex-col'>
                        <Form.Item<SignUpPayload>
                            label="Username"
                            name="userName"
                            rules={[{ required: true, message: "Please input your username!" }]}
                        >
                            <Input className='w-full' style={{
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                paddingLeft: "12px",
                                paddingRight: "12px"
                            }} placeholder='Username' />
                        </Form.Item>
                    </div>
                    <div className='flex flex-col'>
                        <Form.Item<SignUpPayload>
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input className='w-full' style={{
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                paddingLeft: "12px",
                                paddingRight: "12px"
                            }} placeholder='Email' />
                        </Form.Item>
                    </div>
                    <div className='flex flex-col'>
                        <Form.Item<SignUpPayload>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input className='w-full' style={{
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                paddingLeft: "12px",
                                paddingRight: "12px"
                            }} placeholder='Password' />
                        </Form.Item>
                    </div>
                    <Button htmlType='submit' type='primary' className='w-full mt-2' style={{
                        padding: "8px 12px",
                        height: "auto"
                    }}>Create account</Button>
                </Form>
                <div className='flex items-center space-x-2 justify-center mt-4'>
                    <p className='text-sm'>I have an account?</p>
                    <Link to="/signin" className='text-sm font-bold'>Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm