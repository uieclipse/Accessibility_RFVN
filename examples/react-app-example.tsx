/**
 * Complete React App Example using A11y Toolkit
 * Shows all features: Nav, Forms, Modals, Tabs, Config
 */

import React, { useState } from 'react';
import {
  initializeAccessibility,
  AccessibleNav,
  AccessibleButton,
  AccessibleInput,
  AccessibleModal,
  AccessibleTabs,
  useA11yConfig,
  checkContrast,
} from '@a11y-toolkit/core';

// Initialize at app root
initializeAccessibility({
  wcagLevel: 'AA',
  enableLogging: true,
});

interface User {
  id: string;
  name: string;
  email: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Users', href: '/users' },
    { label: 'Settings', href: '/settings' },
  ];

  const handleAddUser = () => {
    const newErrors: Record<string, string> = {};

    if (!newUser.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!newUser.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setUsers([
        ...users,
        {
          id: Math.random().toString(),
          ...newUser,
        },
      ]);
      setNewUser({ name: '', email: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Navigation */}
      <Header navItems={navItems} />

      {/* Main Content */}
      <main id="main-content" style={{ padding: '2rem' }}>
        <h1>User Management Dashboard</h1>

        {/* Tabs */}
        <AccessibleTabs
          tabs={[
            {
              id: 'list',
              label: 'Users List',
              content: <UsersList users={users} />,
            },
            {
              id: 'stats',
              label: 'Statistics',
              content: <UserStats count={users.length} />,
            },
            {
              id: 'settings',
              label: 'Settings',
              content: <AccessibilitySettings />,
            },
          ]}
          defaultTabId="list"
        />

        {/* Add User Button */}
        <div style={{ marginTop: '2rem' }}>
          <AccessibleButton
            label="Add New User"
            onClick={() => setIsModalOpen(true)}
            ariaLabel="Add new user to the list"
          />
        </div>
      </main>

      {/* Modal Dialog */}
      <AccessibleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New User"
        ariaLabel="User registration form"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}
        >
          <AccessibleInput
            label="Full Name"
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            error={errors.name}
            required
          />

          <div style={{ marginTop: '1rem' }}>
            <AccessibleInput
              label="Email Address"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              error={errors.email}
              helperText="example@company.com"
              required
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <AccessibleButton label="Add User" type="submit" />
            <AccessibleButton
              label="Cancel"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </form>
      </AccessibleModal>

      {/* Footer */}
      <footer style={{ padding: '2rem', borderTop: '1px solid #e5e7eb' }}>
        <p>© 2024 Accessible User Management. Built with A11y Toolkit.</p>
      </footer>
    </div>
  );
}

function Header({ navItems }: { navItems: any[] }) {
  return (
    <header
      style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '1rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>
          My Accessible App
        </h1>
        <AccessibleNav
          items={navItems}
          ariaLabel="Main navigation"
          skipLinkId="main-content"
        />
      </div>
    </header>
  );
}

function UsersList({ users }: { users: User[] }) {
  return (
    <div>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '1rem',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                style={{
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                <td style={{ padding: '0.75rem' }}>{user.name}</td>
                <td style={{ padding: '0.75rem' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function UserStats({ count }: { count: number }) {
  return (
    <div>
      <h2>Statistics</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        <div style={{ padding: '1rem', backgroundColor: '#f3f4f6' }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>{count}</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#f3f4f6' }}>
          <h3>Active</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>{count}</p>
        </div>
      </div>
    </div>
  );
}

function AccessibilitySettings() {
  const { wcagLevel, setWCAGLevel } = useA11yConfig();
  const contrastResult = checkContrast('#333333', '#FFFFFF');

  return (
    <div>
      <h2>Accessibility Settings</h2>

      <fieldset style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #e5e7eb' }}>
        <legend style={{ fontWeight: 'bold' }}>WCAG Compliance Level</legend>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          <input
            type="radio"
            name="wcag"
            value="A"
            checked={wcagLevel === 'A'}
            onChange={(e) => setWCAGLevel(e.target.value as any)}
          />
          {' Level A (Minimum)'}
        </label>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          <input
            type="radio"
            name="wcag"
            value="AA"
            checked={wcagLevel === 'AA'}
            onChange={(e) => setWCAGLevel(e.target.value as any)}
          />
          {' Level AA (Recommended) ⭐'}
        </label>

        <label style={{ display: 'block' }}>
          <input
            type="radio"
            name="wcag"
            value="AAA"
            checked={wcagLevel === 'AAA'}
            onChange={(e) => setWCAGLevel(e.target.value as any)}
          />
          {' Level AAA (Enhanced)'}
        </label>
      </fieldset>

      <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0f9ff' }}>
        <h3>Color Contrast Check</h3>
        <p>Text vs Background: {contrastResult.ratio}:1</p>
        <ul>
          <li>✓ WCAG AA: {contrastResult.AA ? 'Pass' : 'Fail'}</li>
          <li>✓ WCAG AAA: {contrastResult.AAA ? 'Pass' : 'Fail'}</li>
        </ul>
      </div>
    </div>
  );
}
