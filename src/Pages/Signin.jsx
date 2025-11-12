import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signin = () => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { createUser, signInWithGoogle, updateUser, user, setUser } = use(AuthContext);

    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const terms = event.target.terms.checked;
        const name = event.target.name.value;
        const photo = event.target.photo.value;


        const passwordPattern = /^.{6,}$/;
        const hasUpper = /[A-Z]/;
        const hasLower = /[a-z]/;
        if (!passwordPattern.test(password)) {
            console.log("password didn't match.")
            setError('Password must be at least 6 characters.')
            return;
        }
        else if (!hasUpper.test(password)) {
            console.log("password didn't match.")
            setError('Password must have an uppercase letter.')
            return;
        }
         else if (!hasLower.test(password)) {
            console.log("password didn't match.")
            setError('Password must have a lowercase letter.')
            return;
        }

        
         // reset error & succes
        setError('');
        setSuccess(false);

         if(!terms){
            setError('Please accept our terms & conditions.');
            return;
        }


         createUser(email, password)
            .then(result => {
                // console.log('after creation of a new user', result.user)
                // notify();
                updateUser({displayName: name, photoURL: photo})
                .then(() =>{
                 setUser({...user,displayName: name, photoURL: photo})
                })
                .catch((error) =>{
                    console.log(error);
                    setUser(user);
                })
                
                setSuccess(true);
                event.target.reset();
                navigate(location.state || '/');
            })
            .catch(error => {
                console.log('error happend', error.message)
                setError(error.message);
            })
    }

    const handleGoogleSignIn = (event) => {
        event.preventDefault();
        signInWithGoogle()
        .then(result => {
                // console.log(result.user);
                //notify();
                navigate(location.state || '/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleTogglePassword = (event) =>{
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
         <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold animate__animated animate__bounceInDown">SignUp now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl animate__animated animate__bounceInUp">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" className="input" name='name' placeholder="Name" />
                                <label className="label">Photo-URL</label>
                                <input type="text" className="input" name='photo' placeholder="Photo-URL" />
                                <label className="label">Email</label>
                                <input type="email" className="input" name='email' placeholder="Email" />
                                <label className="label">Password</label>
                                <div className='relative'>
                                    <input type={showPassword ? 'text' : 'password'}
                                        className="input"
                                        name='password' placeholder="Password" />
                                    <button
                                        onClick={handleTogglePassword}
                                        className="btn btn-xs absolute top-2 right-5">
                                            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                        </button>
                                </div>
                                 <div className="">
                                    <label className="label">
                                        <input type="checkbox" name='terms' className="checkbox" />
                                       Accept Our Terms & Conditions
                                    </label>
                                </div>
                                {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                                <button className="btn btn-neutral mt-4">SignUp</button>
                                  <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>
                            </fieldset>
                            <p>Already have an account? Please <Link to='/login' className='text-blue-500 hover:text-blue-800'>login</Link></p>
                            {
                                success && <p className='text-green-500'>Account Created Successfully!</p>
                            }
                            {
                                error && <p className='text-red-500'>{error}</p>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;