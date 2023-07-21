import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './styles.module.css'
import { useState } from 'react';
import { baseAPI } from '../../services/api';

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Modal({ setOpen }: ModalProps) {
  const [names, setNames] = useState('')

  const handleSubmitForm = async () => {
    const arrayOfNames = names.replace(/ /g, '').split(',')
    await baseAPI.post('/users/process', { names: arrayOfNames })
    setNames('')
    setOpen(false)
  }

  return (
    <Dialog.Portal >
      <Dialog.Overlay className={styles.dialog_overlay} />
      <Dialog.Content className={styles.dialog_content}>
        <Dialog.Title className={styles.dialog_title}>Usuários para processar</Dialog.Title>
        <Dialog.Description className={styles.dialog_description}>
          Você pode adicionar vários usuários separando os logins por , (vírgula)
          Ex: pedro, joão, maria
        </Dialog.Description>
        <form onSubmit={handleSubmitForm}>
          <fieldset className={styles.fieldset}>
            <label className={styles.label} htmlFor="name">Nome</label>
            <input
              id="name"
              className={styles.input}
              value={names}
              onChange={(event) => setNames(event.target.value)}
            />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <button type='submit' className={styles.button}>Salvar</button>
          </div>
        </form>
        <Dialog.Close asChild>
          <button className={styles.icon_button} aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default Modal