import { fireEvent, render, screen } from '@testing-library/react';
import NavSection from '@/components/signUp/NavSection';
import { act } from 'react-dom/test-utils';
import App from '@/pages/App';
import { app, root } from '..';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

describe('SignUpPage Test', () => {
  test('memberLink Test', () => {
    render(
      <MemoryRouter initialEntries={['/signup/member']}>
        <NavSection />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link', { name: '개인회원' });
    expect(linkElement.classList.contains('active')).toBeTruthy();
  });

  test('ownerLink Test', () => {
    render(
      <MemoryRouter initialEntries={['/signup/owner']}>
        <NavSection />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link', { name: '사업자회원' });
    expect(linkElement.classList.contains('active')).toBeTruthy();
  });

  test('ownerLink active test', () => {
    render(
      <MemoryRouter initialEntries={['/signup/member']}>
        <NavSection />
      </MemoryRouter>,
    );

    const ownerLinkElement = screen.getByRole('link', { name: '사업자회원' });
    fireEvent.click(ownerLinkElement);
    expect(ownerLinkElement.classList.contains('active')).toBeTruthy();
  });
});
