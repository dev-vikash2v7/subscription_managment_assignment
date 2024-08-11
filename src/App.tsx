import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, CssBaseline } from '@mui/material';
import AddSubscription from './components/AddSubscription';
import ExtendSubscription from './components/ExtendSubscription';
import EndSubscription from './components/EndSubscription';
import RevenueReport from './components/RevenueReport';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
          }}
        >
          <List>
            <ListItem button component="a" href="/">
              <ListItemText primary="Add Subscription" />
            </ListItem>
            <ListItem button component="a" href="/extend">
              <ListItemText primary="Extend Subscription" />
            </ListItem>
            <ListItem button component="a" href="/end">
              <ListItemText primary="End Subscription" />
            </ListItem>
            <ListItem button component="a" href="/revenue">
              <ListItemText primary="Revenue Report" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<AddSubscription />} />
            <Route path="/extend" element={<ExtendSubscription />} />
            <Route path="/end" element={<EndSubscription />} />
            <Route path="/revenue" element={<RevenueReport />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
