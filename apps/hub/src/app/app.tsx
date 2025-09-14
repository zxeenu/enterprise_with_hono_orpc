import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { orpc } from '../lib/client';
import NxWelcome from './nx-welcome';

export function App() {
  const ballQuery = useQuery(
    orpc.ball.queryOptions({
      input: {
        name: 'bobbig',
      },
    })
  );

  return (
    <div>
      {ballQuery.status === 'success' ? (
        <Fragment>
          <pre>{JSON.stringify(ballQuery.data, null, 2)}</pre>
        </Fragment>
      ) : (
        <Fragment>Loading</Fragment>
      )}

      <NxWelcome title="@enterprise/hub" />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
