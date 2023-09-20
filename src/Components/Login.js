import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingInterval, setLoadingInterval] = useState(null);
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (email === 'user@123' && password === '123') {
  //     // Simulate a successful login
  //     const userData = { email, name: 'Aman' };

  //     // Save user data to local storage
  //     localStorage.setItem('user', JSON.stringify(userData));

  //     // Save user data to session storage
  //     sessionStorage.setItem('user', JSON.stringify(userData));

  //     // Set session timeout to 10 minutes (in milliseconds)
  //     const sessionTimeout = 10 * 60 * 1000;
  //     setTimeout(() => {
  //       // Clear session storage after timeout
  //       sessionStorage.removeItem('user');
  //     }, sessionTimeout);

  //     // You can redirect the user to another page after successful login
  //     // For example: window.location.href = '/dashboard';

  //     //alert('Login successful');
  //     navigate('/user/dashboard')
  //     window.history.replaceState(null, '', '/user/dashboard');
  //   } else {
  //     // Handle invalid login
  //     alert('Invalid credentials');
  //   }

  //   // Here you would make an API call to perform the actual login
  //   // You can use libraries like Axios or the native fetch API

  //   // Example pseudo-code:
  //   // const response = await fetch('your-login-api-url', {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   //   body: JSON.stringify({ email, password }),
  //   // });

  //   // const data = await response.json();
  //   // Handle the API response accordingly (e.g., show error message or redirect)

  //   // For now, you can log the email and password for testing purposes

  //   console.log('Email:', email);
  //   console.log('Password:', password);
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const uri = 'https://busy-lime-bream-sock.cyclic.app/userauth/login'
      //const uri = 'http://localhost:8000/userauth/login'
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('email', email);

        /* Save session records  */
        await sendSessionData();

        // Show loading state using interval
        setLoadingInterval(setInterval(() => {
          setIsLoading(prevLoading => !prevLoading); // Toggle loading state
        }, 500)); // Adjust the interval time as needed

        setTimeout(() => {
          clearInterval(loadingInterval); // Clear the loading interval
          navigate('/user/dashboard');
          window.history.replaceState(null, '', '/user/dashboard');
        }, 1000);
      }
      else {
        setIsLoading(false);
        const userNotFound = response.statusText;
        if (userNotFound === 404) {
          alert("User Not Found")
        }
        console.error('Login error:', response.statusText);
        // Handle login error here and show appropriate message to the user
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
      // Handle login error here and show appropriate message to the user
    }
  }


  /* Session Manage */
  async function sendSessionData() {
    const token = localStorage.getItem('accessToken');
    try {
      // Fetch the user's IP address from ipify
      const ipifyResponse = await fetch('https://api.ipify.org?format=json');
      if (ipifyResponse.ok) {
        const { ip } = await ipifyResponse.json();
        //const sessionApiUrl = 'http://localhost:8000/session';
        const sessionApiUrl = 'https://busy-lime-bream-sock.cyclic.app/session';
        const response = await fetch(sessionApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            ip
          }),
        });
        if (response.ok) {
          // Session data saved successfully
        } else {
          console.error('Error sending session data:', response.statusText);
        }
      } else {
        console.error('Error fetching IP address:', ipifyResponse.statusText);
      }


    } catch (error) {
      console.error('Error sending session data:', error);
    }
  }

  useEffect(() => {
    // Clear the 'accessToken' in localStorage on page load
    localStorage.removeItem('accessToken');
    if (!localStorage.getItem('accessToken')) {
      navigate('/user/login'); // Redirect to login page if not logged in
    } else {
      setIsLoading(true);
      navigate('/user/dashboard'); // Redirect to dashboard if logged in
    }
  }, []);


  return (


    <section class="bg-gray-50 dark:bg-gray-900">

      {isLoading ? (<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to User Panel
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""

                  value={email}
                  onChange={handleEmailChange} />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                  value={password}
                  onChange={handlePasswordChange} />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                {/* <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
              </div>

              <button class=" w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-sm" onClick={handleLogin}>Sign In</button>

              {/* <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p> */}
            </form>
          </div>
        </div>
      </div>) : (
        <center className='bg-gray-50 dark:bg-gray-900'>
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Loading />
          </div>

        </center>
      )}

    </section>

  )
}

export default Login