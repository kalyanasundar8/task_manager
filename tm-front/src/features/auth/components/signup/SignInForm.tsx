import { Button, Form, Input } from 'antd';

const SignInForm = () => {
    return (
        <div className='bg-gray-100 w-screen h-screen flex items-center justify-center'>
            <div className='bg-white w-full max-w-md'>
                <h1>Signup</h1>
                <Form
                    name='basic'
                    layout='vertical'
                    initialValues={{ remember: true }}
                    autoComplete='off'
                >
                    <Form.Item
                        // label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default SignInForm