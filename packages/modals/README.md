# @zendeskgarden/react-modals [![npm version](https://img.shields.io/npm/v/@zendeskgarden/react-modals.svg?style=flat-square)](https://www.npmjs.com/package/@zendeskgarden/react-modals)

This package includes components relating to modals in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/react-modals

# Peer Dependencies - Also Required
npm install react react-dom prop-types styled-components @zendeskgarden/react-theming
```

## Usage

```jsx static
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Modal, Header, Body, Footer, FooterItem, Close } from '@zendeskgarden/react-modals';
import { Button } from '@zendeskgarden/react-buttons';

/**
 * Place a `ThemeProvider` at the root of your React application
 */
<ThemeProvider>
  <Modal onClose={() => alert('modal closing')}>
    <Header>Example Header</Header>
    <Body>Some content</Body>
    <Footer>
      <FooterItem>
        <Button basic>Cancel</Button>
      </FooterItem>
      <FooterItem>
        <Button primary>Confirm</Button>
      </FooterItem>
    </Footer>
    <Close aria-label="Close modal" />
  </Modal>
</ThemeProvider>;
```
