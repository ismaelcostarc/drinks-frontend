import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue';
import BaseButton from './BaseButton.vue';

describe('BaseButton.vue', () => {
  it('renders default button correctly', () => {
    const { container } = render(BaseButton);
    const button = container.querySelector('.base-button');

    expect(button?.className).toContain('medium');
    expect(button?.className).toContain('default');
    expect(button?.attributes).not.toHaveProperty('disabled');
  });

  it('renders different sizes correctly', () => {
    const { container } = render(BaseButton, {
      props: {
        size: 'small',
      },
    });
    const button = container.querySelector('.base-button');

    expect(button?.className).toContain('small');
  });

  it('renders different types correctly', () => {
    const { container } = render(BaseButton, {
      props: {
        type: 'success',
      },
    });
    const button = container.querySelector('.base-button');

    expect(button?.className).toContain('success');
  });

  it('renders as disabled correctly', () => {
    const { container } = render(BaseButton, {
      props: {
        disabled: true,
      },
    });
    const button = container.querySelector('.base-button');

    expect(button?.attributes).toHaveProperty('disabled');
  });

  it('renders as full-width correctly', () => {
    const { container } = render(BaseButton, {
      props: {
        full: true,
      },
    });
    const button = container.querySelector('.base-button');

    expect(button?.className).toContain('full');
  });

  it('emits click event when clicked', async () => {
    const { emitted, getByRole } = render(BaseButton);
    const button = await fireEvent.click(getByRole('button'));

    expect(emitted().click).toBeTruthy();
  });
});
