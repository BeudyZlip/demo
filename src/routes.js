import React from 'react';
import { Route } from 'react-router'
import {
  Home,
} from './app/Pages'

export default () => (
  <div className="body">
    <Route exact path="/" component={Home} />
  </div>
)
