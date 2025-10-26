import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './shared/layout/AppLayout';
import MainPage from './features/breeds/containers/MainPage';
import DetailsPage from './features/breeds/containers/DetailsPage';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/breeds/:id" element={<DetailsPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
