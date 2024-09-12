import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/login';
import { useRouter } from 'next/router';

// Mock the Next.js useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the fetch function to simulate login API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Login successful' }),
  })
);

describe('Login Page', () => {
  it('should authenticate user and redirect to dashboard on successful login', async () => {
    // Mock router
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    // Render the login page
    render(<Login />);

    // Simulate entering username and password
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the fetch call to resolve and verify redirection
    await screen.findByText('Login successful');
    expect(pushMock).toHaveBeenCalledWith('/dashboard');
  });

  it('should display error on invalid login credentials', async () => {
    // Override fetch to simulate a failed login attempt
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      })
    );

    // Render the login page
    render(<Login />);

    // Simulate entering wrong username and password
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'wrongUser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongPassword' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the error message to appear
    const errorMessage = await screen.findByText('Invalid credentials');
    expect(errorMessage).toBeInTheDocument();
  });
});
