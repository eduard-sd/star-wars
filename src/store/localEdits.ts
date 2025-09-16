import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Person } from '../types/swapi'

export type PersonPatch = Partial<
    Pick<
        Person,
        | 'name'
        | 'height'
        | 'mass'
        | 'hair_color'
        | 'skin_color'
        | 'eye_color'
        | 'birth_year'
        | 'gender'
    >
>

type DraftState = {
    drafts: Record<string, PersonPatch>
    setDraft: (id: string, patch: PersonPatch) => void
    clearDraft: (id: string) => void
}

type SavedState = {
    saved: Record<string, PersonPatch>
    saveEdits: (id: string, patch: PersonPatch) => void
    clearSaved: (id: string) => void
}


const STORE_NAME = 'swapi-saved-edits';

export const useDraftEdits = create<DraftState>()((set) => ({
    drafts: {},
    setDraft: (id, patch) =>
        set((s) => ({
            drafts: { ...s.drafts, [id]: { ...s.drafts[id], ...patch } },
        })),
    clearDraft: (id) =>
        set((s) => {
            const { [id]: _, ...rest } = s.drafts
            return { drafts: rest }
        }),
}))

export const useSavedEdits = create<SavedState>()(
    persist(
        (set) => ({
            saved: {},
            saveEdits: (id, patch) =>
                set((s) => ({
                    saved: { ...s.saved, [id]: { ...s.saved[id], ...patch } },
                })),
            clearSaved: (id) =>
                set((s) => {
                    const { [id]: _, ...rest } = s.saved
                    return { saved: rest }
                }),
        }),
        { name: STORE_NAME }
    )
)


export function applyEdits(
    person: Person,
    draft?: PersonPatch,
    saved?: PersonPatch
): Person {
    return { ...person, ...saved, ...draft }
}
