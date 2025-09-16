import { describe, it, expect, beforeEach } from 'vitest'
import { useSavedEdits, applyEdits } from '../store/localEdits'
import type { Person } from '../types/swapi'

describe('useSavedEdits store', () => {
    beforeEach(() => {
        useSavedEdits.setState({ saved: {} })
    })

    it('applyEdits merges person with saved and draft edits', () => {
        const person: Person = {
            name: 'Luke',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: '',
            films: [],
            species: [],
            vehicles: [],
            starships: [],
            created: '',
            edited: '',
            url: '',
        }

        const saved = { name: 'Vader' }
        const draft = { name: 'Leia' }

        const result = applyEdits(person, draft, saved)
        expect(result.name).toBe('Leia')
    })

    it('clearSaved removes person edits by id', () => {
        const store = useSavedEdits.getState()

        store.saveEdits('1', { name: 'Leia' })
        expect(useSavedEdits.getState().saved['1']).toEqual({ name: 'Leia' })

        store.clearSaved('1')
        expect(useSavedEdits.getState().saved['1']).toBeUndefined()
    })
})
