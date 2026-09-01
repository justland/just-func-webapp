import { composeStories } from '@storybook/react-vite'
import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import * as ButtonStories from './stories/Button.stories'
import * as HeaderStories from './stories/Header.stories'
import * as PageStories from './stories/Page.stories'

// Replaces @storybook/addon-storyshots, which was removed in storybook 8.
// `composeStories` is the documented replacement: it applies the same
// decorators, args and parameters storybook applies in the browser.
const suites = {
  'Example/Button': composeStories(ButtonStories),
  'Example/Header': composeStories(HeaderStories),
  'Example/Page': composeStories(PageStories)
}

describe.each(Object.entries(suites))('%s', (_title, stories) => {
  test.each(Object.entries(stories))('%s', (_name, Story) => {
    const { container } = render(<Story />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
