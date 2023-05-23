'use client';
import LoginPage from './Login';
import React, { useState } from 'react';
import RegisterPage from './Register';
import Button from '../UI/Button';
import { faL } from '@fortawesome/free-solid-svg-icons';

interface Props {}

const Auth: React.FC<Props> = () => {
  const [registerLogin, setRegisterLogin] = useState<boolean>(true);
  return (
    <div className='auth'>
      <div className='holder' id='holder'>
        <div className='flex'>
          <div className='w-[50%] login'>
            <LoginPage />
          </div>
          <div className='w-[50%] register'>
            <RegisterPage />
          </div>
        </div>
        <div className='overlay-holder'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => {
                  document
                    .getElementById('holder')
                    ?.classList.remove('right-panel-active');
                }}
                className='ghost'
                id='signIn'
              >
                Sign In
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                onClick={() => {
                  document
                    .getElementById('holder')
                    ?.classList.add('right-panel-active');
                }}
                className='ghost'
                id='signUp'
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
