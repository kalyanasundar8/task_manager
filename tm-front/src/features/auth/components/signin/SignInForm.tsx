import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignIn, type SignInPayload } from '../../services/auth.service';
import Toast from '../../hooks/Toast';

const SignInForm = () => {
    const [message, setMessage] = useState<{ title: string, description: string }>({
        title: '',
        description: ''
    });
    const [showToast, setShowToast] = useState(false);

    const onFinish = async (values: SignInPayload) => {
        try {
            const response = await SignIn(values);
            if (response.success === false) {
                setShowToast(true);
            }
            setMessage({
                ...message,
                title: response.message,
                description: "Something went wrong!"
            })
        } catch (error) { }
    }

    const onFinishFailed = (erroInfo: any) => {
        console.log('Failed: ', erroInfo)
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-full max-w-md flex flex-col p-5'>
                <Toast message={message.title} status='error' isOpen={showToast} onClose={() => setShowToast(false)} />
                <h1 className='text-xl font-bold mb-5'>Sign In to TM</h1>
                <Form
                    name='basic'
                    layout='vertical'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <div className='flex flex-col'>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please enter you email!" }]}
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
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please enter your password!" }]}
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
                    }}>Sign in</Button>
                </Form>
                <div className='flex items-center space-x-2 justify-center mt-4'>
                    <p className='text-sm'>I don't have an account?</p>
                    <Link to="/signup" className='text-sm font-bold'>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignInForm