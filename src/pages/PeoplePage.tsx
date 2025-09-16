import { useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPeople, getIdFromUrl } from '../api/swapi'
import {
  TextField,
  Pagination,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Stack,
  CircularProgress,
  Grid,
} from '@mui/material'
import { Link } from 'react-router-dom'

import type { PagedResponse, Person } from '../types/swapi'
import {getRoutePerson} from "../routes/routes";

const PeoplePage: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')

  const { data, isPending, isError } = useQuery<PagedResponse<Person>>({
    queryKey: ['people', { page, search }],
    queryFn: () => fetchPeople({ page, search }),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  })

  const countPages = data ? Math.ceil(data.count / 10) : 0

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearch(e.target.value)
  }

  return (
    <Stack gap={2}>
      <TextField
        label="Search characters"
        value={search}
        onChange={handleSearch}
        placeholder="Luke, Vader, ..."
      />

      {isPending && (
        <Stack alignItems="center" py={6}>
          <CircularProgress />
        </Stack>
      )}
      {isError && (
        <Typography color="error">Failed to load. Try again.</Typography>
      )}

      <Grid container spacing={2}>
        {data?.results.map((p: Person) => {
          const id = getIdFromUrl(p.url)!

          return (
            <Grid key={p.url} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card variant="outlined">
                <CardActionArea component={Link} to={getRoutePerson(id)}>
                  <CardContent>
                    <Typography variant="h6">{p.name}</Typography>
                    <Typography variant="body2">Gender: {p.gender}</Typography>
                    <Typography variant="body2">
                      Birth: {p.birth_year}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {countPages > 1 && (
        <Stack alignItems="center" py={2}>
          <Pagination
            page={page}
            onChange={(_, v) => setPage(v)}
            count={countPages}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </Stack>
  )
}

export default PeoplePage
