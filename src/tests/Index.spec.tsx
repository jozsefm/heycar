import { render, screen } from '@testing-library/react'
import { makeStore } from 'app/store'
import Index from 'pages/index'
import { Provider } from 'react-redux'
// import { RemoteSongsResponse } from 'services/songs/userService'
import { ThemeProvider } from 'styled-components'
import { theme } from 'theme'
import { RequestStatuses } from 'types/RequestStatus'

jest.mock('../services/gatewayService', () => ({
  fetchGateways: () => {
    return new Promise<any>((resolve) =>
      setTimeout(
        () =>
          resolve({
            gateways: [{}],
            status: RequestStatuses.SUCCESS,
          }),
        100,
      ),
    )
  },
}))

jest.mock('../services/projectService', () => ({
  fetchProjects: () => {
    return new Promise<any>((resolve) =>
      setTimeout(
        () =>
          resolve({
            projects: [{}],
            status: RequestStatuses.SUCCESS,
          }),
        100,
      ),
    )
  },
}))

jest.mock('../services/userService', () => ({
  fetchUsers: () => {
    return new Promise<any>((resolve) =>
      setTimeout(
        () =>
          resolve({
            users: [{}],
            status: RequestStatuses.SUCCESS,
          }),
        100,
      ),
    )
  },
}))

describe('<Index />', () => {
  it('renders the whole app', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Index />
        </ThemeProvider>
      </Provider>,
    )

    expect(screen.getByText('No reports')).toBeInTheDocument()
  })
})
