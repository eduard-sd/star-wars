import type { Person, PagedResponse } from '../types/swapi'

const BASE = 'https://swapi.py4e.com/api'

export async function fetchPeople(params: {
  page?: number
  search?: string
}): Promise<PagedResponse<Person>> {
  const u = new URL(BASE + '/people/')

  if (params.page) u.searchParams.set('page', String(params.page))
  if (params.search) u.searchParams.set('search', params.search)

  const res = await fetch(u)

  if (!res.ok) throw new Error('Failed to fetch people')

  return res.json()
}

export async function fetchPerson(id: string): Promise<Person> {
  const res = await fetch(`${BASE}/people/${id}/`)

  if (!res.ok) throw new Error('Not found')

  return res.json()
}

export function getIdFromUrl(url: string): string | undefined {
  const m = url.match(/people\/(\d+)\/?$/)

  return m ? m[1] : undefined
}
