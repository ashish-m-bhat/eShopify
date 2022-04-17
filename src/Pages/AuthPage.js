import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'

export default function AuthPage() {
  return (
    <div>
      Login form goes here
      <Route path="/auth/:anything">
        <Redirect to="/auth" />
      </Route>
    </div>
  )
}
