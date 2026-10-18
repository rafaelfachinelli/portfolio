import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      // GitHub-flavored Markdown: tables in the docs pages.
      options: {
        mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } },
      },
    },
    // Accessibility checks (axe) on every story, in the "Accessibility" panel.
    '@storybook/addon-a11y',
  ],
  // Tailwind 4 generates the classes of the components (@datum/ui).
  viteFinal: config => ({
    ...config,
    plugins: [...(config.plugins ?? []), tailwindcss()],
  }),
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
  },
}

export default config
