import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import BaseInputPassword from './BaseInputPassword.vue'

describe('BaseInputPassword.vue', () => {
  it('renders correctly with props and interact with input', async () => {
    const modelValue = 'password123'
    const label = 'Senha'
    const placeholder = 'Insira sua senha'

    const { getByPlaceholderText } = render(BaseInputPassword, {
      props: { modelValue, label, placeholder },
    })

    const input: HTMLInputElement = getByPlaceholderText(placeholder)
    expect(input.value).toBe(modelValue);

    await fireEvent.update(input, 'newPassword123');
    expect(input.value).toBe('newPassword123');
  });

  it('switch visibility of password on checkbox click', async () => {
    const modelValue = 'password123';
    const label = 'Senha';
    const placeholder = 'Insira sua senha';

    const { getByLabelText } = render(BaseInputPassword, {
      props: { modelValue, label, placeholder },
    });

    const checkbox = getByLabelText('Mostrar senha');
    expect(checkbox).toBeTruthy(); // Verifica se a checkbox está presente

    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeTruthy();

    await fireEvent.click(checkbox)

    const textInput = document.querySelector('input[type="text"]')
    expect(textInput).toBeTruthy()
  })

  it('renders label and indication of required field correctly', () => {
    const modelValue = ''
    const label = 'Senha'
    const placeholder = 'Insira sua senha'
    const required = true

    const { getByText } = render(BaseInputPassword, {
      props: { modelValue, label, placeholder, required },
    })

    const labelElement = getByText(label)
    const requiredIndicator = getByText('*')

    expect(labelElement).toBeTruthy()
    expect(requiredIndicator).toBeTruthy()
  })
})
