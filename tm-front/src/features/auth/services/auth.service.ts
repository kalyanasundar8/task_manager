export interface SignUpPayload {
    userName: string;
    email: string;
    password: string;
}

export interface SignInPayload {
    email: string;
    password: string;
}

export const SignUp = async (payload: SignUpPayload) => {
    try {
        const response = await fetch("http://localhost:4000/api/auth/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        return response.json();
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const SignIn = async (payload: SignInPayload) => {
    try {
        const response = await fetch("http://localhost:4000/api/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return response.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}