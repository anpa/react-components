/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { render } from 'garden-test-utils';
import { StyledCol } from './StyledCol';

describe('StyledCol', () => {
  it('renders default styling', () => {
    const { container } = render(<StyledCol />);

    expect(container.firstChild).toHaveClass('col');
  });

  describe('Sizing', () => {
    it('renders size if provided', () => {
      const { container } = render(<StyledCol size="4" />);

      expect(container.firstChild).toHaveClass('col-4');
    });

    it('renders xs if provided', () => {
      const { container } = render(<StyledCol xs="6" />);

      expect(container.firstChild).toHaveClass('col-xs-6');
    });

    it('renders sm if provided', () => {
      const { container } = render(<StyledCol sm />);

      expect(container.firstChild).toHaveClass('col-sm');
    });

    it('renders md if provided', () => {
      const { container } = render(<StyledCol md="6" />);

      expect(container.firstChild).toHaveClass('col-md-6');
    });

    it('renders lg if provided', () => {
      const { container } = render(<StyledCol lg="6" />);

      expect(container.firstChild).toHaveClass('col-lg-6');
    });

    it('renders xl if provided', () => {
      const { container } = render(<StyledCol xl="6" />);

      expect(container.firstChild).toHaveClass('col-xl-6');
    });
  });

  describe('Offsets', () => {
    it('renders offsetXs if provided', () => {
      const { container } = render(<StyledCol offsetXs="6" />);

      expect(container.firstChild).toHaveClass('offset-xs-6');
    });

    it('renders offsetSm if provided', () => {
      const { container } = render(<StyledCol offsetSm="6" />);

      expect(container.firstChild).toHaveClass('offset-sm-6');
    });

    it('renders offsetMd if provided', () => {
      const { container } = render(<StyledCol offsetMd="6" />);

      expect(container.firstChild).toHaveClass('offset-md-6');
    });

    it('renders offsetLg if provided', () => {
      const { container } = render(<StyledCol offsetLg="6" />);

      expect(container.firstChild).toHaveClass('offset-lg-6');
    });

    it('renders offsetXl if provided', () => {
      const { container } = render(<StyledCol offsetXl="6" />);

      expect(container.firstChild).toHaveClass('offset-xl-6');
    });
  });

  describe('Align Self', () => {
    it('renders start self alignment if provided', () => {
      const { container } = render(<StyledCol alignSelf="start" />);

      expect(container.firstChild).toHaveClass('align-self-start');
    });

    it('renders center self alignment if provided', () => {
      const { container } = render(<StyledCol alignSelf="center" />);

      expect(container.firstChild).toHaveClass('align-self-center');
    });

    it('renders end self alignment if provided', () => {
      const { container } = render(<StyledCol alignSelf="end" />);

      expect(container.firstChild).toHaveClass('align-self-end');
    });
  });

  describe('Justify Content', () => {
    it('renders start justify content if provided', () => {
      const { container } = render(<StyledCol justifyContent="start" />);

      expect(container.firstChild).toHaveClass('justify-content-start');
    });

    it('renders center justify content if provided', () => {
      const { container } = render(<StyledCol justifyContent="center" />);

      expect(container.firstChild).toHaveClass('justify-content-center');
    });

    it('renders end justify content if provided', () => {
      const { container } = render(<StyledCol justifyContent="end" />);

      expect(container.firstChild).toHaveClass('justify-content-end');
    });

    it('renders around justify content if provided', () => {
      const { container } = render(<StyledCol justifyContent="around" />);

      expect(container.firstChild).toHaveClass('justify-content-around');
    });

    it('renders between justify content if provided', () => {
      const { container } = render(<StyledCol justifyContent="between" />);

      expect(container.firstChild).toHaveClass('justify-content-between');
    });
  });

  describe('Order', () => {
    it('renders pseudo order if provided', () => {
      const { container } = render(<StyledCol order="first" />);

      expect(container.firstChild).toHaveClass('order-first');
    });

    it('renders string based order if provided', () => {
      const { container } = render(<StyledCol order="md-12" />);

      expect(container.firstChild).toHaveClass('order-md-12');
    });
  });
});