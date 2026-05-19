import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-full max-w-md flex flex-col p-5'>
                <h1 className='text-xl font-bold mb-5'>Create your account</h1>
                <Form
                    name='basic'
                    layout='vertical'
                    initialValues={{ remember: true }}
                    autoComplete='off'
                >
                    <div className='flex flex-col'>
                        <Form.Item
                            label="Username"
                            name="username"
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
                        <Form.Item
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
                        <Form.Item
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
                    <Button type='primary' className='w-full mt-2' style={{
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