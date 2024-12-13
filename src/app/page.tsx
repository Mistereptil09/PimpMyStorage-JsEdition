'use client';

import React from 'react';
import TableShow from '../components/TableShow';
import HomeView from '@/components/index_page/HomeView';

const App: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Show index Page</h1>
        <HomeView />
      </div>
      <div>
        <h1>Data Table Category</h1>
        <TableShow apiLink="/api/categories" />
      </div>
      <div>
        <h1>Data Table Product</h1>
        <TableShow apiLink="/api/products" />
      </div>
    </div>

  );
};

export default App;