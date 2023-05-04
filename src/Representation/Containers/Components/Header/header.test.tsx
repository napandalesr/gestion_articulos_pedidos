import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './index';
import { BrowserRouter } from 'react-router-dom';

describe("Renderizado del componente header", () => {
  test('Renderizar el navbar', () => {
    render(<BrowserRouter><Header/></BrowserRouter>);
    const navMenu = screen.getByText(/menú/i);
    expect(navMenu).toBeInTheDocument();
    const navInicio = screen.getByText(/inicio/i);
    expect(navInicio).toBeInTheDocument();
    const navArticulos = screen.getByText(/artículos/i);
    expect(navArticulos).toBeInTheDocument();
    const navPedidos = screen.getByText(/pedidos/i);
    expect(navPedidos).toBeInTheDocument();
  });
});
