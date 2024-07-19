import { render, screen } from '@testing-library/react-native'
import { Accordion, AccordionProps } from '@/app/components'

const mockedUsername = 'Test username'
const mockedRepoTitle = 'Test repo title'
const mockedRepoDescription = 'Test repo description'
const mockedRepoStars = 5

const mockedItem: AccordionProps['item'] = {
  id: '1',
  username: mockedUsername,
  imageUrl: '',
  repos: [
    {
      id: 'r1',
      title: mockedRepoTitle,
      description: mockedRepoDescription,
      stars: mockedRepoStars,
    },
  ],
}

describe('Accordion', () => {
  it('renders username correctly', () => {
    render(<Accordion item={mockedItem} />)
    const username = screen.getByText(mockedUsername)

    expect(username).toBeOnTheScreen()
  })

  it('renders image correctly', () => {
    render(<Accordion item={mockedItem} />)
    const image = screen.getByTestId('accordion-image')

    expect(image).toBeOnTheScreen()
  })

  it('renders chevron correctly', () => {
    render(<Accordion item={mockedItem} />)
    const chevron = screen.getByTestId('accordion-chevron')

    expect(chevron).toBeOnTheScreen()
  })

  it('not renders chevron if repos has 0 elements', () => {
    render(<Accordion item={{ ...mockedItem, repos: [] }} />)
    const chevron = screen.queryByTestId('accordion-chevron')

    expect(chevron).not.toBeOnTheScreen()
  })

  it('renders repo item title', () => {
    render(<Accordion item={mockedItem} />)
    const title = screen.getByTestId('accordion-repo-title-r1')

    expect(title.children[0]).toBe(mockedRepoTitle)
  })

  it('renders repo item description', () => {
    render(<Accordion item={mockedItem} />)
    const description = screen.getByTestId('accordion-repo-description-r1')

    expect(description.children[0]).toBe(mockedRepoDescription)
  })

  it('renders repo item stars', () => {
    render(<Accordion item={mockedItem} />)
    const stars = screen.getByTestId('accordion-repo-stars-r1')

    expect(stars.children[0]).toBe(mockedRepoStars.toString())
  })
})
