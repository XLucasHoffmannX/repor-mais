import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  AuthView,
  CreateProductView,
  HomeView,
  TrashView,
  WithdrawHistoryView
} from '@/resources/views';

import { AuthMiddleware } from '../middlewares';

import { routes } from './router.constant';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.inital}
          element={<AuthView />}
        />

        <Route
          path={routes.login}
          element={<AuthView context='login' />}
        />

        <Route
          path={routes.register}
          element={<AuthView context='register' />}
        />

        <Route
          key='private-routes'
          element={<AuthMiddleware />}
        >
          <Route
            path={routes.app}
            element={<HomeView />}
          />

          <Route
            path={routes.create_product}
            element={<CreateProductView context='create' />}
          />

          <Route
            path={`${routes.edit_product}/:id`}
            element={<CreateProductView context='edit' />}
          />

          <Route
            path={routes.history}
            element={<WithdrawHistoryView />}
          />

          <Route
            path={routes.trash}
            element={<TrashView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
