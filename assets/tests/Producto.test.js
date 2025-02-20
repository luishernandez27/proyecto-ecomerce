import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
function Producto({ nombre }) {
    return <h1>{nombre}</h1>;
}
test('Debe mostrar el nombre del producto', () => {
    render(<Producto nombre="Laptop" />);
    expect(screen.getByText("Laptop")).toBeInTheDocument();
});
