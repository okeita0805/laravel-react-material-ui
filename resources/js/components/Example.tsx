import { Button } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

const Example = () => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">Example Component</div>
          <Button variant="contained" color="primary">
            Contained
          </Button>
          <div className="card-body">I'm an example component!</div>
        </div>
      </div>
    </div>
  </div>
);

if (document.getElementById('app')) {
  ReactDOM.render(<Example />, document.getElementById('app'));
}
