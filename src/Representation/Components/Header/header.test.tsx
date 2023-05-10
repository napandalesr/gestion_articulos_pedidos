import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../Redux/store';

describe("Renderizado del componente header", () => {
  test('Renderizar el navbar', () => {
    render(<Provider store={store}><BrowserRouter><Header/></BrowserRouter></Provider>);
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
