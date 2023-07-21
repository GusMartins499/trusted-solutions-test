import styles from './app.module.css'
import * as Dialog from '@radix-ui/react-dialog'
import Modal from './components/Modal'
import { FormEvent, useEffect, useState } from 'react';
import { readyOnlyAPI } from './services/api';

function App() {
  const [users, setUsers] = useState<GithubProfileUser[]>([]);
  const [filter, setFilter] = useState('login');
  const [userNameOrID, setUserNameOrId] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await readyOnlyAPI.get<GithubProfileUser[]>('/users')
    setUsers(response.data)
  }

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault()

    if (userNameOrID.trim() === '') {
      return getUsers()
    }

    const path = filter === 'login' ? `/users?login=${userNameOrID}` : `/users/${userNameOrID}`
    const response = await readyOnlyAPI.get<GithubProfileUser>(path)
    setUsers([response.data])
  }

  return (
    <main className={styles.main_container}>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button id='btn_add_user' className={styles.btn_add_user}>Adicionar usuário</button>
          </Dialog.Trigger>
          <Modal setOpen={setOpen} />
        </Dialog.Root>
        <select
          id='filter'
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value='id'>ID</option>
          <option value='login'>LOGIN</option>
        </select>
        <input
          id='input_form'
          placeholder="Enter with the login or id of an user"
          value={userNameOrID}
          onChange={(event) => setUserNameOrId(event.target.value)}
        />
        <button id='btn_submit' type="submit">Search</button>
      </form>
      <div className={styles.container_users}>
        <h3>Usuários</h3>
        {users.length > 0 ? (
          <div className={styles.users_wrapper}>
            <pre>{JSON.stringify(users, null, 2)}</pre>
          </div>
        ) : (
          <div className={styles.users_wrapper}>
            <pre>{['Sem dados']}</pre>
          </div>
        )}

      </div>
    </main>
  )
}

export default App
