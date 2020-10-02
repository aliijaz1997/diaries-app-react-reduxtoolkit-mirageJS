import React, {FC, useState} from 'react'
import { useForm } from "react-hook-form";
import { user } from "../../Interfaces/user.interface";
import * as Yup from 'yup';
import { tosavetoken, toallowauthentication } from "../../ReduxStore/authslice";
import { setuser } from "../../ReduxStore/userslice";
import { Responsefromauthdomain } from "../../Mirage-Server/userRoutes";
import { useDispatch } from 'react-redux';
import http from '../../Mirage-Server/Axios/axios-api';
// Yup will validate the properties and in case of any wrong thing it will display
// the message required method in form.

const schema = Yup.object().shape({
    username : Yup.string().required('No, username? Click sign up').max(20, 'username should be within 20 characters'),
    password : Yup.string().required('Password should be strong'),
    email : Yup.string().email('Please provide valid email adress e.g xyz@jdhl.com')
});
const Auth : FC = () => {
    const [islogin, setIslogin] = useState(true);
    const [loading , setLoading] = useState(false);
    const dispatch = useDispatch(); // Here I have used simply dispatch to not make it complex
    const { handleSubmit, register, errors } = useForm<user>({
        validationSchema : schema
    });
    const Submit = (data: user) => {
       const path = islogin? '/auth/login' : '/auth/signup';
      //  console.log(data);
       
       http.post<user, Responsefromauthdomain>(path, data).then((response)=>{
           console.log(response);
          if (response) {
            const { user, generatedtokenforuser } = response;
            dispatch(tosavetoken(generatedtokenforuser));
            dispatch(setuser(user));
            dispatch(toallowauthentication(true));
          }
           
       }).catch((error) => {
           console.log(error);
          
           
       }).finally(() => {
           setLoading(false)
       })
    }
    return (
        <div>
           <div className="auth">
      <div className="card">
        <form onSubmit={handleSubmit(Submit)}>
          <div className="inputWrapper">
            <input ref={register} name="username" placeholder="Username" />
            {errors && errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="inputWrapper">
            <input
              ref={register}
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors && errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          {!islogin && (
            <div className="inputWrapper">
              <input
                ref={register}
                name="email"
                placeholder="Email (optional)"
              />
              {errors && errors.email && (
                <p className="error">{errors.email.message}</p>
              )}
            </div>
          )}
          <div className="inputWrapper">
            <button type="submit" disabled={loading}>
              {islogin ? 'Login' : 'Create account'}
            </button>
          </div>
          <p
            onClick={() => setIslogin(!islogin)}
            style={{ cursor: 'pointer', opacity: 0.7 }}
          >
            {islogin ? 'No account? Create one' : 'Already have an account?'}
          </p>
        </form>
      </div>
    </div>
        </div>
    )
}

export default Auth;