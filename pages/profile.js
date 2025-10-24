// pages/profile.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProfileComponent from '../components/profile';

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      let userDetails = localStorage.getItem('userDetails');
console.log(userDetails,"------userDetails")
      // Check if userDetails exists and is not null
      if (userDetails) {
        try {
          userDetails = JSON.parse(userDetails); // Parse if it exists
          setUser(userDetails); // Set user details if parsing is successful
        } catch (error) {
          console.error('Error parsing user details:', error);
          router.push('/login'); // Redirect to login if there is an error
        }
      } else {
        // If no userDetails found in localStorage, redirect to login
        router.push('/login');
      }

      // If token is missing, also redirect to login
      if (!token) {
        router.push('/login');
      }
    }
  }, [router]);

  if (user === null) {
    return <div>Loading...</div>; // Return loading state while fetching user data
  }

  return <ProfileComponent user={user} />;
};

export default Profile;
