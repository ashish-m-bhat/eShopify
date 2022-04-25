import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AuthForm from '../Components/Auth/AuthForm'

export default function AuthPage() {
  return (
    <div>
      <Route path="/auth/:anything">
        <Redirect to="/auth" />
      </Route>
      <AuthForm />
    </div>
  )
}
