import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVerifyEmailMutation } from '../../store/api/api.slice';
import EmailVerificationView from './EmailVerificationView';

const EmailVerificationContainer = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [verifyEmail, { data, isLoading, isSuccess, isError, error }] = useVerifyEmailMutation();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (token && !verified) {
            verifyEmail({ token })
                .unwrap()
                .then(() => setVerified(true))
                .catch((err) => console.error(err));
        }
    }, [token, verifyEmail, verified]);

    return (
        <EmailVerificationView
            token={token}
            isLoading={isLoading}
            isSuccess={isSuccess}
            verified={verified}
            error={error}
            data={data}
        />
    );
};

export default EmailVerificationContainer;
