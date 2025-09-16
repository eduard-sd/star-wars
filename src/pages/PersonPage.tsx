import type { FC, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPerson } from '../api/swapi'
import {
  useDraftEdits,
  useSavedEdits,
  applyEdits,
  type PersonPatch,
} from '../store/localEdits'
import {
  Stack,
  TextField,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import type { Person } from '../types/swapi'

const isDifferent = (data: Person, saved?: PersonPatch): boolean => {
  if (!saved) return false

  return Object.entries(saved).some(([k, v]) => (data as any)[k] !== v)
}

const PersonPage: FC = () => {
  const { id = '' } = useParams<{ id: string }>()
  const { data, isPending, isError } = useQuery<Person>({
    queryKey: ['person', id],
    queryFn: () => fetchPerson(id),
  })

  const draft = useDraftEdits((s) => s.drafts[id])
  const setDraft = useDraftEdits((s) => s.setDraft)
  const clearDraft = useDraftEdits((s) => s.clearDraft)

  const saveEdits = useSavedEdits((s) => s.saveEdits)
  const clearSaved = useSavedEdits((s) => s.clearSaved)
  const saved = useSavedEdits((s) => s.saved[id])

  if (isPending)
    return (
        <Stack alignItems="center" py={6}>
          <CircularProgress />
        </Stack>
    )
  if (isError || !data)
    return <Typography color="error">Character not found.</Typography>

  const merged: Person = applyEdits(data, draft, saved)

  const onChange =
      (key: keyof PersonPatch) => (e: ChangeEvent<HTMLInputElement>) =>
          setDraft(id, { [key]: e.target.value })

  const hasSavedDiff = isDifferent(data, saved)

  return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {merged.name}
        </Typography>
        <Stack gap={2}>
          {(
              [
                { key: 'name', label: 'Name' },
                { key: 'height', label: 'Height' },
                { key: 'mass', label: 'Mass' },
                { key: 'hair_color', label: 'Hair color' },
                { key: 'skin_color', label: 'Skin color' },
                { key: 'eye_color', label: 'Eye color' },
                { key: 'birth_year', label: 'Birth year' },
                { key: 'gender', label: 'Gender' },
              ] as const
          ).map(({ key, label }) => (
              <TextField
                  key={key}
                  label={label}
                  value={merged[key] ?? ''}
                  onChange={onChange(key)}
              />
          ))}
          <Stack direction="row" gap={2}>
            <Button
                variant="contained"
                onClick={() => {
                  if (draft) {
                    saveEdits(id, draft)
                    clearDraft(id)
                    alert('Saved to localStorage ✓')
                  }
                }}
            >
              Save locally
            </Button>
            {draft && (
                <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => clearDraft(id)}
                >
                  Reset draft
                </Button>
            )}
            {hasSavedDiff && (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => clearSaved(id)}
                >
                  Reset changes
                </Button>
            )}
          </Stack>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Draft = temporary (lost on reload).
            Saved = persists in localStorage until Reset changes.
          </Typography>
        </Stack>
      </Paper>
  )
}

export default PersonPage
