import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PersonPage from '../pages/PersonPage'

vi.mock('../api/swapi', () => ({
    fetchPerson: async () => ({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/',
    }),
}))

function renderWithProviders(path = '/person/1') {
    const client = new QueryClient()
    return render(
        <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/person/:id" element={<PersonPage />} />
                </Routes>
            </MemoryRouter>
        </QueryClientProvider>
    )
}

test('renders person detail and allows editing name', async () => {
    renderWithProviders()

    expect(await screen.findByLabelText(/Name/i)).toBeInTheDocument()

    const input = screen.getByLabelText(/Name/i) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Master Luke' } })

    expect(input.value).toBe('Master Luke')
})
