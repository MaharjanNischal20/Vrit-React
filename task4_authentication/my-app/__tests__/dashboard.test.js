import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/dashboard';
import { useRouter } from 'next/router';

// Mock the Next.js useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Dashboard Page', () => {
  it('should redirect to login if user is not authenticated', () => {
    // Mock router
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    // Render the Dashboard component without an authenticated user
    render(<Dashboard user={null} />);

    // Assert that the router push method was called with '/login'
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  it('should display the dashboard if the user is authenticated', () => {
    // Mock router without any redirection
    useRouter.mockReturnValue({ push: jest.fn() });

    // Render the Dashboard component with a mock authenticated user
    const mockUser = { username: 'testUser' };
    render(<Dashboard user={mockUser} />);

    // Assert that the user's name is displayed
    expect(screen.getByText(/Welcome, testUser/i)).toBeInTheDocument();
  });
});
